import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fade,
} from '@mui/material';
import heroImage from '../assets/Packbackground.avif';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const freeEmailDomains = [
  '@gmail.com',
  '@googlemail.com',
  '@yahoo.com',
  '@hotmail.com',
  '@outlook.com',
  '@live.com',
  '@aol.com',
  '@icloud.com',
  '@mail.com',
  '@protonmail.com',
];

const validateEmail = (email) => {
  if (!email.trim()) return 'Company e-mail is required';
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return 'Enter a valid e-mail address';
  if (freeEmailDomains.some((domain) => normalized.endsWith(domain))) return 'Use your official company e-mail address';
  return '';
};

const validatePhone = (phone) => {
  if (!phone.trim()) return 'Phone number is required';
  const trimmed = phone.trim();
  if (!/^(?:[6-9]\d{9}|0[6-9]\d{9})$/.test(trimmed)) return 'Enter a valid mobile number starting with 6, 7, 8, or 9';
  return '';
};

const Hero = () => {
  const [formData, setFormData] = useState({ fullName: '', companyName: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankCard, setShowThankCard] = useState(false);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/submissions`);
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data.submissions || []);
        }
      } catch (error) {
        console.error('Unable to load submissions', error);
      }
    };
    loadSubmissions();
  }, []);

  const handleFieldChange = (field) => (event) => {
    const value = field === 'phone' ? event.target.value.replace(/\D/g, '') : event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) nextErrors.companyName = 'Company name is required';
    const phoneError = validatePhone(formData.phone);
    if (phoneError) nextErrors.phone = phoneError;
    const emailError = validateEmail(formData.email);
    if (emailError) nextErrors.email = emailError;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setShowThankCard(true);
        setTimeout(() => setShowThankCard(false), 5500);
        const newSubmission = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
        setSubmissions((prev) => [newSubmission, ...prev]);
        setFormData({ fullName: '', companyName: '', phone: '', email: '' });
      } else {
        console.error('Submit failed', result);
      }
    } catch (error) {
      console.error('Submit error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', py: { xs: 5, md: 8 } }}>
      <Container maxWidth="xl">
        <Box id="membership-form" sx={{ position: 'relative', width: '100%', minHeight: { xs: '520px', md: '720px' }, overflow: 'hidden', borderRadius: 0, boxShadow: '0 40px 90px rgba(15, 23, 42, 0.12)' }}>
          <Box component="img" src={heroImage} alt="Workspace showcase" sx={{ position: 'absolute', inset: 0, width: '78%', height: '85%', ml: '300px', mt: '24px', objectFit: 'cover', objectPosition: 'left center', display: 'block' }} />

          <Box sx={{ position: 'absolute', left: { xs: '4%', md: '6%' }, top: { xs: '8%', md: '10%' }, width: { xs: '92%', md: '48%' }, mr: '400px', backgroundColor: '#fff', borderRadius: 0, border: '1px solid #e2e8f0', boxShadow: '0 40px 90px rgba(15, 23, 42, 0.12)', p: { xs: 3, md: 4 } }}>
            <Typography sx={{ fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, mb: 2, color: '#111', lineHeight: 1.05 }}>
              Start your membership today
            </Typography>
            <Typography sx={{ color: '#475569', fontSize: '0.97rem', lineHeight: 1.75, mb: 3 }}>
              Get a monthly coworking membership, starting at ₹9,999/mo*. Designed for modern teams, founders, and growing brands who want premium workspace with fast networking and seamless operations.
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full name*"
                    value={formData.fullName}
                    onChange={handleFieldChange('fullName')}
                    error={Boolean(errors.fullName)}
                    helperText={errors.fullName}
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company name*"
                    value={formData.companyName}
                    onChange={handleFieldChange('companyName')}
                    error={Boolean(errors.companyName)}
                    helperText={errors.companyName}
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone number*"
                    value={formData.phone}
                    onChange={handleFieldChange('phone')}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                    variant="outlined"
                    inputProps={{ maxLength: 11, inputMode: 'numeric', pattern: '[0-9]*' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ fontWeight: 600, color: '#111' }}>
                          +91
                        </InputAdornment>
                      ),
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company E-mail address*"
                    type="email"
                    value={formData.email}
                    onChange={handleFieldChange('email')}
                    error={Boolean(errors.email)}
                    helperText={errors.email || 'Use your official company e-mail address'}
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isSubmitting}
                sx={{ mt: 1, borderRadius: 0, textTransform: 'none', backgroundColor: '#0b5cff', py: 1.75, fontWeight: 700, fontSize: '0.95rem' }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Box>

            <Typography sx={{ mt: 3, color: '#64748b', fontSize: '0.88rem', lineHeight: 1.8 }}>
              By clicking the button, you agree to our{' '}
              <Box component="span" sx={{ color: '#1d4ed8', fontWeight: 700 }}>Terms of Service</Box>{' '}
              and confirm that you have read and understood our{' '}
              <Box component="span" sx={{ color: '#1d4ed8', fontWeight: 700 }}>Privacy Policy</Box>.
            </Typography>
          </Box>

          <Fade in={showThankCard} timeout={700}>
            <Box
              sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 1400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(15, 23, 42, 0.55)',
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  width: { xs: '100%', sm: '520px' },
                  backgroundColor: '#0b5cff',
                  color: '#fff',
                  borderRadius: 3,
                  p: { xs: 4, md: 6 },
                  boxShadow: '0 32px 120px rgba(11, 92, 255, 0.32)',
                  transform: showThankCard ? 'scale(1)' : 'scale(0.95)',
                  transition: 'transform 0.35s ease, opacity 0.35s ease',
                  opacity: showThankCard ? 1 : 0,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', md: '2rem' }, mb: 2 }}>
                  Thank you for your time!
                </Typography>
                <Typography sx={{ fontSize: '1rem', lineHeight: 1.8, mb: 3 }}>
                  Submission received successfully. We will come back to you soon with an attractive offer.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setShowThankCard(false)}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#0b5cff',
                    borderRadius: 0,
                    textTransform: 'none',
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    '&:hover': { backgroundColor: '#f8f9ff' },
                  }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Fade>

          <Box sx={{
            '@keyframes pulseGlow': {
              '0%': { boxShadow: '0 20px 60px rgba(11, 92, 255, 0.22)' },
              '100%': { boxShadow: '0 24px 80px rgba(11, 92, 255, 0.44)' },
            },
          }} />
        </Box>

       
      </Container>
    </Box>
  );
};

export default Hero;
