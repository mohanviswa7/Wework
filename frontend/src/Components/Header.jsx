import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import weworkLogo from '../assets/wework-india-logo.svg';
import ContactModal from './ContactModal';


function Header({ activeScreen, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState('');

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleGetInTouch = () => {
    setMobileOpen(false);
    setContactOpen(true);
  };
  const handleNavigation = (screen) => {
    onNavigate(screen);

    setMobileOpen(false);
    handleMenuClose();
  };
  const handleMenuOpen = (event, label) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(label);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu('');
  };

  const drawer = (
    <Box sx={{ width: 260, p: 2 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box
          component="img"
          src={weworkLogo}
          alt="WeWork India logo"
          sx={{ height: 72, width: 'auto', display: 'block' }}
        />
      </Box>
     
      <Button
        fullWidth
        variant="contained"
        onClick={handleGetInTouch}
        sx={{ mt: 2, backgroundColor: '#0b5cff', color: '#fff', textTransform: 'none', borderRadius: 2 }}
      >
        Get in touch
      </Button>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: '#fff', color: '#111', borderBottom: '1px solid #e2e8f0' }}>
      <Toolbar sx={{ px: { xs: 2, md: 5 }, py: 0.9, minHeight: 70, justifyContent: { xs: 'space-between', md: 'flex-center' }, gap: { md: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: { md: 0 } }}>
          <Box
            component="img"
            src={weworkLogo}
            alt="WeWork India logo"
            onClick={() => onNavigate('home')}
            sx={{ height: 58, width: 'auto', display: 'block', cursor: 'pointer' }}
          />
        </Box>

        

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.1 }}>
          
          {/* <Button onClick={() => onNavigate('login')} sx={{ color: '#111', textTransform: 'none', fontWeight: 600, fontSize: '0.82rem' }}>
            Log in
          </Button> */}
          <Button
            variant="contained"
            onClick={handleGetInTouch}
            sx={{
              backgroundColor: '#0b5cff',
              color: '#fff',
              borderRadius: '10px',
              textTransform: 'none',
              px: 2.2,
              py: 0.95,
              fontWeight: 700,
              fontSize: '0.85rem',
              '&:hover': { backgroundColor: '#0945c5' },
            }}
          >
            Get in touch
          </Button>
        </Box>

        <IconButton edge="end" aria-label="open menu" onClick={handleDrawerToggle} sx={{ display: { xs: 'flex', md: 'none' }, color: '#111' }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </AppBar>
  );
}

export default Header;
