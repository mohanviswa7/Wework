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
import adblissLogo from '../assets/Adblisstech.png';
import ContactModal from './ContactModal';

const navItems = [
  { label: 'About us' },
  {
    label: 'Centres',
    dropdown: true,
    children: ['Bangalore', 'Patna', 'Dubai'],
  },
  { label: 'Workspaces', dropdown: true, menuType: 'workspaces' },
  { label: 'Enterprise Solutions', dropdown: true },
  { label: 'Investor Relations' },
  { label: 'Referrals' },
];

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
          src={adblissLogo}
          alt="Adbliss logo"
          sx={{ height: 140, width: 'auto', display: 'block' }}
        />
      </Box>
      <List>
        {navItems.map((item) => (
          <Box key={item.label}>
            <ListItemButton component="a" href="#" onClick={() => item.label === 'About us' && handleNavigation('about')} sx={{ borderRadius: 1, mb: item.children ? 0 : 1 }}>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }} />
            </ListItemButton>
            {item.children?.map((child) => (
              <ListItemButton
                key={child}
                component="a"
                href="#"
                sx={{ borderRadius: 1, mb: 1, pl: 4, bgcolor: '#f8fafc' }}
              >
                <ListItemText primary={child} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} />
              </ListItemButton>
            ))}
          </Box>
        ))}
      </List>
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
            src={adblissLogo}
            alt="Adbliss logo"
            onClick={() => onNavigate('home')}
            sx={{ height: 100, width: 'auto', display: 'block', cursor: 'pointer' }}
          />
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, flexWrap: 'wrap', minWidth: 0, position: 'relative' }}>
          {navItems.map((item) => (
            <React.Fragment key={item.label}>
              <Button
                href="#"
                onClick={item.label === 'About us' ? () => handleNavigation('about') : item.children ? (event) => handleMenuOpen(event, item.label) : undefined}
                sx={{
                  color: '#111',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  px: 1.3,
                  '&:hover': { backgroundColor: 'transparent', color: '#0b5cff' },
                }}
                endIcon={item.dropdown ? <KeyboardArrowDownIcon sx={{ fontSize: '0.9rem' }} /> : null}
              >
                {item.label}
              </Button>
              {item.dropdown && activeMenu === item.label ? (
                item.menuType === 'workspaces' ? (
                  <Box sx={{ position: 'absolute', top: '100%', left: 0, mt: 1, bgcolor: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 25px 50px rgba(15, 23, 42, 0.08)', p: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, zIndex: 1300, minWidth: 520 }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2 }}>Office spaces</Typography>
                      <Typography sx={{ color: '#475569', mb: 2 }}>Ready-to-move-in or customisable private offices</Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2 }}>Coworking spaces</Typography>
                      <Typography sx={{ color: '#475569', mb: 2 }}>Coworking spaces for the hour, day, or month</Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2 }}>Additional solutions</Typography>
                      <Typography sx={{ color: '#475569' }}>Solutions that go beyond workspaces</Typography>
                    </Box>
                    <Box sx={{ borderLeft: { md: '1px solid #e2e8f0' }, pl: { md: 4 } }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2 }}>Private Offices</Typography>
                      <Typography sx={{ color: '#475569', mb: 2 }}>Fully-equipped, ready to move in or customisable private WeWork offices</Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2 }}>Managed Offices</Typography>
                      <Typography sx={{ color: '#475569' }}>Office spaces sourced, designed, built, and operated for your business</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  >
                    {item.children?.map((child) => (
                      <MenuItem key={child} onClick={handleMenuClose} component="a" href="#">
                        {child}
                      </MenuItem>
                    ))}
                  </Menu>
                )
              ) : null}
            </React.Fragment>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.1 }}>
          
          <Button onClick={() => onNavigate('login')} sx={{ color: '#111', textTransform: 'none', fontWeight: 600, fontSize: '0.82rem' }}>
            Log in
          </Button>
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
