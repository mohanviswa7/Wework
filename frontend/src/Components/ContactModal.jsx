import React, { useEffect, useState } from 'react';
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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

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
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    if (name === 'phone') setPhoneError('');
  };

  const handleSubmit = async () => {
    const { fullName, companyName, email, phone } = form;
    if (!fullName || !companyName || !email || !phone) {
      setSnack({ open: true, severity: 'error', message: 'Please fill required fields (name, company, email, phone)' });
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setPhoneError('Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, desks: desksCount }),
      });
      const data = await res.json();
      if (res.ok) {
        onClose();
        setSubmitted(true);
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

  const handleClose = () => {
    onClose();
    setSubmitted(false);
    setPhoneError('');
    setForm({ fullName: '', companyName: '', email: '', phone: '', city: '', area: '', workspaceType: '', desks: 1 });
    setDesksCount(1);
  };

  useEffect(() => {
    if (!submitted) return undefined;
    const timeoutId = setTimeout(handleClose, 5000);
    return () => clearTimeout(timeoutId);
  }, [submitted]);

  return (
    <>
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { minHeight: '72vh' } }}>
      <DialogTitle>Got questions? We've got answers.</DialogTitle>
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
                error={Boolean(phoneError)}
                helperText={phoneError || 'Enter a 10-digit mobile number'}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }}
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
      <Typography sx={{ px: 3, color: 'text.secondary', fontSize: '0.8rem' }}>
        By submitting this form, you agree to our{' '}
        <Box component="a" href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" sx={{ color: '#0b5cff', fontWeight: 700, textDecoration: 'underline' }}>
          Privacy Policy
        </Box>.
      </Typography>
      <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
      </DialogActions>
      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
        <Alert onClose={() => setSnack((s) => ({ ...s, open: false }))} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Dialog>
    <Dialog
      open={submitted}
      onClose={handleClose}
      transitionDuration={450}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            overflow: 'visible',
            borderRadius: 4,
            textAlign: 'center',
            px: { xs: 2, sm: 3 },
            py: 3,
            animation: 'successPop 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
            '@keyframes successPop': {
              '0%': { opacity: 0, transform: 'translateY(18px) scale(0.9)' },
              '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
            },
          },
        }}
      >
        <DialogContent>
          <Box sx={{ display: 'grid', placeItems: 'center', width: 76, height: 76, mx: 'auto', mb: 2, borderRadius: '50%', color: '#fff', background: 'linear-gradient(135deg, #0b5cff, #24b47e)', boxShadow: '0 12px 30px rgba(11, 92, 255, 0.25)' }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 48 }} />
          </Box>
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: '1.8rem', mb: 1 }}>Thank you!</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '1rem', lineHeight: 1.7 }}>
            Your request has been received. Our team will contact you soon.
          </Typography>
        </DialogContent>
    </Dialog>
    </>
  );
}

export default ContactModal;
