import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import heroImage from '../assets/hero-img1.png';

function About() {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        mx: 0,
        px: { xs: 4, md: 10 },
        py: { xs: 8, md: 12 },
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
      }}
    >
      <Box sx={{ maxWidth: 1000, mx: 'auto', bg: 'transparent' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 3, color: '#fff' }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff', fontSize: '1.05rem', mb: 3, lineHeight: 1.8 }}>
        AdblissTech is a technology-led workspace and enterprise services brand focused on creating agile,
        people-first environments for modern teams. We blend smart infrastructure, localized support, and
        tailored digital solutions to help businesses work better from anywhere.
      </Typography>
      <Typography variant="body1" sx={{ color: '#fff', fontSize: '1.05rem', mb: 3, lineHeight: 1.8 }}>
        Our mission is to empower startups, enterprises, and freelancers with flexible access to premium
        spaces, collaborative communities, and enterprise-grade services. From coworking centres across cities
        to end-to-end workplace solutions, AdblissTech helps companies stay productive, connected, and future-ready.
      </Typography>
      <Typography variant="body1" sx={{ color: '#fff', fontSize: '1.05rem', mb: 4, lineHeight: 1.8 }}>
        We believe modern work should be frictionless, inclusive, and built around the needs of teams.
        That means smart design, easy digital onboarding, and dedicated support for every stage of growth.
      </Typography>
     
    </Box>
  </Box>
  );
}

export default About;
