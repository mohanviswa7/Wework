import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function Lenopage({ onNavigate }) {
  return (
    <Box sx={{ minHeight: '100vh', py: 10, backgroundColor: '#f8fafc' }}>
      <Box sx={{ maxWidth: 760, mx: 'auto', px: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
          Welcome to Lenovo Page
        </Typography>
        <Typography sx={{ mb: 4, color: '#475569', lineHeight: 1.8 }}>
          You have logged in with a Lenovo company account. This page can be customized with Lenovo-specific content,
          dashboard access, product details, or any internal navigation flow.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Button onClick={() => onNavigate('home')} variant="contained" sx={{ textTransform: 'none', py: 1.5 }}>
            Return Home
          </Button>
          <Button onClick={() => onNavigate('login')} variant="outlined" sx={{ textTransform: 'none', py: 1.5 }}>
            Back to Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Lenopage;
