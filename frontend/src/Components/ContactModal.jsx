import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';

function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    city: '',
    area: '',
    workspaceType: '',
    desks: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: 'success', message: '' });
  const [desksCount, setDesksCount] = useState(form.desks || 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { fullName, companyName, email, phone } = form;
    if (!fullName || !companyName || !email || !phone) {
      setSnack({ open: true, severity: 'error', message: 'Please fill required fields (name, company, email, phone)' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, desks: desksCount }),
      });
      const data = await res.json();
      if (res.ok) {
        setSnack({ open: true, severity: 'success', message: 'Submitted successfully' });
        onClose();
        setForm({ fullName: '', companyName: '', email: '', phone: '', city: '', area: '', workspaceType: '', desks: 1 });
        setDesksCount(1);
      } else {
        setSnack({ open: true, severity: 'error', message: data.error || 'Submission failed' });
      }
    } catch (err) {
      console.error(err);
      setSnack({ open: true, severity: 'error', message: 'Submission failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { minHeight: '72vh' } }}>
      <DialogTitle>
        Got questions? We've got answers.
      </DialogTitle>
      <DialogContent sx={{ pt: 0 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Get in touch with us for more information on any of the products or services we offer
        </Typography>
        <Box component="form">
             <Grid item xs={12} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Full name*"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 }, '& .MuiInputBase-input': { py: 2, fontSize: '1rem' } }}
              />
            </Grid>
          <Grid container spacing={2}>
           
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company name*"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 }, '& .MuiInputBase-input': { py: 2, fontSize: '1rem' } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Work e-mail address*"
                name="email"
                value={form.email}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 }, '& .MuiInputBase-input': { py: 2, fontSize: '1rem' } }}
              />
            </Grid>

            <div className="row">

              <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Area"
                name="area"
                value={form.area}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 }, '& .MuiInputBase-input': { py: 2, fontSize: '1rem' } }}
              />
            </Grid>
            
            
             
</div >
<Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone number*"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 }, '& .MuiInputBase-input': { py: 2, fontSize: '1rem' } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 }, '& .MuiInputBase-input': { py: 2, fontSize: '1rem' } }}
              />
            </Grid>
            

            {/* <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="workspace-type-label">Workspace type</InputLabel>
                <Select
                  labelId="workspace-type-label"
                  label="Workspace type"
                  name="workspaceType"
                  value={form.workspaceType}
                  displayEmpty
                  renderValue={(selected) => (selected ? selected : '')}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 }, '& .MuiSelect-select': { py: 2, fontSize: '1rem' } }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="private">Private Office</MenuItem>
                  <MenuItem value="coworking">Coworking</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} md={12}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  label="Desks required*"
                  name="desks"
                  value={desksCount}
                  onChange={(e) => setDesksCount(Math.max(1, Number(e.target.value || 1)))}
                  inputProps={{ min: 1 }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 }, '& .MuiInputBase-input': { py: 2, fontSize: '1rem' } }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                  <IconButton size="small" onClick={() => setDesksCount((c) => c + 1)} sx={{ width: 44, height: 44, border: '1px solid rgba(0,0,0,0.12)', borderRadius: 1 }}>
                    +
                  </IconButton>
                  <IconButton size="small" onClick={() => setDesksCount((c) => Math.max(1, c - 1))} sx={{ width: 44, height: 44, border: '1px solid rgba(0,0,0,0.12)', borderRadius: 1, mt: 1 }}>
                    −
                  </IconButton>
                </Box>
              </Stack>
            </Grid>
            
          </Grid>
 <Grid item xs={12} md={6}>
                
                <FormControl className="width-100" fullWidth>
                  <InputLabel id="workspace-type-label">Workspace type</InputLabel>
                  <Select
                    labelId="workspace-type-label"
                    label="Workspace type"
                    name="workspaceType"
                    value={form.workspaceType}
                    displayEmpty
                    renderValue={(selected) => (selected ? selected : '')}
                    onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 }, '& .MuiSelect-select': { py: 2, fontSize: '1rem' } }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="private">Private Office</MenuItem>
                    <MenuItem value="coworking">Coworking</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          Submit
        </Button>
      </DialogActions>
      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
        <Alert onClose={() => setSnack((s) => ({ ...s, open: false }))} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default ContactModal;
