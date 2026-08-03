import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_USER = process.env.MONGODB_USER || '';
const MONGODB_PASS = process.env.MONGODB_PASS || '';
const MONGODB_HOSTS = process.env.MONGODB_HOSTS || 'ac-pxkbgnu-shard-00-00.asrprew.mongodb.net:27017,ac-pxkbgnu-shard-00-01.asrprew.mongodb.net:27017,ac-pxkbgnu-shard-00-02.asrprew.mongodb.net:27017';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://${MONGODB_USER && MONGODB_PASS ? `${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(MONGODB_PASS)}@` : ''}${MONGODB_HOSTS}/?replicaSet=atlas-qizmrs-shard-0&ssl=true&authSource=admin`;
const DB_NAME = process.env.MONGODB_DB || 'intelvpro';
const COLLECTION_NAME = 'submissions';
const submissionsPath = path.resolve('submissions.json');

app.use(cors({ origin: true, methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.options('*', cors({ origin: true, methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

let useMongo = false;
let collection;

const ensureSubmissionsFile = () => {
  if (!fs.existsSync(submissionsPath)) {
    fs.writeFileSync(submissionsPath, '[]', 'utf-8');
  }
};

const readSubmissions = () => {
  try {
    ensureSubmissionsFile();
    const raw = fs.readFileSync(submissionsPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Unable to read submissions file:', error);
    return [];
  }
};

const writeSubmissions = (submissions) => {
  try {
    fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (error) {
    console.error('Unable to write submissions file:', error);
  }
};

const client = new MongoClient(MONGODB_URI, { connectTimeoutMS: 10000, serverSelectionTimeoutMS: 10000 });

async function initializeDatabase() {
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    collection = db.collection(COLLECTION_NAME);
    await collection.createIndex({ email: 1 });
    useMongo = true;
    console.log(`MongoDB connected to ${MONGODB_URI}/${DB_NAME}`);
  } catch (error) {
    console.warn('MongoDB connection failed, falling back to local JSON storage:', error.message);
    useMongo = false;
  }
}

async function startServer(callback) {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
    if (typeof callback === 'function') callback({ useMongo });
  });
}

app.get('/', (req, res) => {
  res.send('IntelVpro backend is running');
});

app.get('/api/submissions', async (req, res) => {
  try {
    if (useMongo) {
      const submissions = await collection.find().sort({ createdAt: -1 }).toArray();
      return res.json({ submissions });
    }
    const submissions = readSubmissions();
    return res.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ error: 'Unable to fetch submissions' });
  }
});

app.post('/api/register', async (req, res) => {
  const { fullName, companyName, phone, email } = req.body;
  if (!fullName || !companyName || !phone || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newEntry = {
    fullName,
    companyName,
    phone,
    email,
    createdAt: new Date().toISOString(),
  };

  try {
    if (useMongo) {
      const result = await collection.insertOne(newEntry);
      if (!result.acknowledged) throw new Error('Insert failed');
    } else {
      const submissions = readSubmissions();
      submissions.unshift(newEntry);
      writeSubmissions(submissions);
    }
    return res.json({ success: true, submission: newEntry, storage: useMongo ? 'mongodb' : 'local' });
  } catch (error) {
    console.error('Error saving submission:', error);
    return res.status(500).json({ error: 'Unable to save submission' });
  }
});

startServer(({ useMongo }) => {
  console.log(`Server started. MongoDB enabled: ${useMongo}`);
});
