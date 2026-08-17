import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import loginImage from '../assets/Microsites-img1.png';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ companyName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.companyName.trim()) nextErrors.companyName = 'Company name is required';
    if (!formData.email.trim()) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = 'Enter a valid email';
    if (!formData.password.trim()) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const company = formData.companyName.trim().toLowerCase();
    if (company === 'lenovo') onLogin('leno');
    else if (company === 'adbliss') onLogin('home');
    else onLogin('home');
  };

  return (
    <Box sx={{ minHeight: '100vh', px: 2, py: 6, backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 1200, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' }, gap: 3 }}>
        <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 3 }}>
          <Box component="img" src={loginImage} alt="Login illustration" sx={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 420 }} />
        </Paper>

        <Paper elevation={4} sx={{ p: { xs: 4, md: 6 }, borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Login
          </Typography> */}
          <Typography sx={{ color: '#64748b', mb: 4 }}>
            Enter your company credentials to continue.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <TextField
              label="Company name"
              value={formData.companyName}
              onChange={handleChange('companyName')}
              error={Boolean(errors.companyName)}
              helperText={errors.companyName}
              fullWidth
            />
            <TextField
              label="Email address"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1, py: 1.5, textTransform: 'none' }}>
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
