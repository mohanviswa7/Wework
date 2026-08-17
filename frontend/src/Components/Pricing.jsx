import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import HelpIcon from '@mui/icons-material/Help';
import LanguageIcon from '@mui/icons-material/Language';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PrintIcon from '@mui/icons-material/Print';
import StarIcon from '@mui/icons-material/Star';
import WifiIcon from '@mui/icons-material/Wifi';

const plans = [
  {
    name: 'All Access Basic',
    description: 'Everything your workday needs, at great value',
    oldPrice: '₹11,999/month',
    price: '₹9,999',
    features: [
      { icon: BusinessIcon, text: 'Access to 25 centres across India', underlined: true, help: true },
      { icon: LanguageIcon, text: 'Access to 100+ locations worldwide' },
      { icon: MeetingRoomIcon, text: '2 meeting room credits every month' },
      { icon: WifiIcon, text: 'Day-to-day amenities, including high-speed Wi-Fi, unlimited coffee, and more' },
      { icon: PrintIcon, text: '70 monthly printing credits (60 black & white + 10 colour)', wide: true },
    ],
  },
  {
    name: 'All Access Plus',
    description: 'More access, more benefits, and greater flexibility for your workday',
    oldPrice: '₹16,999/month',
    price: '₹13,599',
    featured: true,
    features: [
      { icon: BusinessIcon, text: 'Access to 55+ centres across India', underlined: true, help: true },
      { icon: LanguageIcon, text: 'Access to 450+ locations worldwide' },
      { icon: MeetingRoomIcon, text: '5 meeting room credits every month' },
      { icon: WifiIcon, text: 'Day-to-day amenities, including high-speed Wi-Fi, unlimited coffee, and more' },
      { icon: PrintIcon, text: '140 monthly printing credits (120 black & white + 20 colour)', wide: true },
    ],
  },
];

const scrollToForm = () => {
  document.getElementById('membership-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Pricing = () => (
  <Box component="section" sx={{ backgroundColor: '#fff', py: { xs: 6, md: 9 } }}>
    <Container maxWidth="xl">
      <Typography component="h2" sx={{ color: '#111', fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 200, lineHeight: 1.15, mb: { xs: 4, md: 7 } }}>
        Choose the monthly coworking membership plan that works for you
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 3, md: 4 }, alignItems: 'stretch' }}>
        {plans.map((plan) => (
          <Box key={plan.name}>
            <Box sx={{ position: 'relative', height: '100%', minHeight: { xs: 570, md: 530 }, display: 'flex', flexDirection: 'column', backgroundColor: plan.featured ? '#000' : '#f7f7f7', color: plan.featured ? '#fff' : '#111', border: plan.featured ? 'none' : '1px solid #e1e1e1', borderRadius: '24px', p: { xs: 3, md: 4.5 } }}>
              {plan.featured && <Box sx={{ position: 'absolute', top: 20, right: 20, display: 'grid', placeItems: 'center', width: 36, height: 36, borderRadius: '6px', backgroundColor: '#1d1d1d' }}><StarIcon sx={{ color: '#fff' }} /></Box>}
              <Typography component="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' }, fontWeight: 400, mb: 1 }}>{plan.name}</Typography>
              <Typography sx={{ color: plan.featured ? '#aaa' : '#b4b4b4', fontSize: { xs: '1rem', md: '1.2rem' }, mb: 3.5 }}>{plan.description}</Typography>
              <Grid container columnSpacing={3} rowSpacing={2.5}>
                {plan.features.map(({ icon: Icon, text, underlined, help, wide }) => (
                  <Grid item xs={wide ? 12 : 6} key={text} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Icon sx={{ flexShrink: 0, fontSize: 30, color: plan.featured ? '#fff' : '#68778e' }} />
                    <Typography sx={{ color: plan.featured ? '#eee' : '#8d8d8d', fontSize: { xs: '0.95rem', md: '1.08rem' }, lineHeight: 1.45, textDecoration: underlined ? 'underline' : 'none' }}>
                      {text}{help && <HelpIcon sx={{ ml: 1, fontSize: 20, verticalAlign: 'middle', color: plan.featured ? '#fff' : '#aaa' }} />}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 3, mt: 'auto', pt: 4 }}>
                <Box>
                  <Typography sx={{ color: plan.featured ? '#aaa' : '#aaa', fontSize: '1rem', textDecoration: 'line-through' }}>{plan.oldPrice}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography sx={{ fontSize: { xs: '2.5rem', md: '3rem' }, lineHeight: 1.05 }}>{plan.price}</Typography>
                    <Typography sx={{ color: plan.featured ? '#aaa' : '#aaa', fontSize: '1rem' }}>/month*</Typography>
                  </Box>
                  <Typography sx={{ color: plan.featured ? '#aaa' : '#aaa', fontSize: '0.9rem', mt: 1.5 }}>*The best value with a 9 month commitment. T&amp;C apply</Typography>
                </Box>
                <Button onClick={scrollToForm} variant="outlined" sx={{ flexShrink: 0, minWidth: { xs: 130, md: 190 }, color: '#172cff', borderColor: '#172cff', backgroundColor: '#fff', borderRadius: '5px', textTransform: 'none', fontSize: { xs: '1rem', md: '1.25rem' }, py: 1.6, '&:hover': { backgroundColor: '#f2f4ff', borderColor: '#172cff' } }}>
                  Get in touch
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Pricing;