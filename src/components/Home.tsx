import { NavLink, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { Instagram, Telegram, Menu as MenuIcon } from '@mui/icons-material';
import { LoginState } from '../interfaces';
import { useLocation } from 'react-router';
import '../styles/Navbar.css';

export function Home() {
  const user = useSelector((state: LoginState) => state.login.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const socialLinks = {
    instagram: 'https://instagram.com/ваш_аккаунт',
    telegram: 'https://t.me/dragon_dream',
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setMobileDrawerOpen(open);
  };

  const scrollToSection = async (sectionId: string, hash: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId, hash } });
    } else {
      handleScroll(sectionId, hash);
    }
    handleMenuClose();
    setMobileDrawerOpen(false);
  };

  const handleScroll = (sectionId: string, hash: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', hash);
    }
  };
  const menuItems = [
    { id: 'services-section', label: 'Услуги', hash: '#services' },
    { id: 'reservation-section', label: 'Бронирование', hash: '#reservation' },
    { id: 'about-us-section', label: 'О нас', hash: '#about-us' },
    { id: 'contacts-section', label: 'Контакты', hash: '#contacts' },
  ];

  const mobileMenu = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map(({ id, label, hash }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton onClick={() => scrollToSection(id, hash)}>
              <ListItemText primary={label} sx={{ color: '#e8f5e9' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: '#66bb6a' }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <IconButton
          className="social-icon instagram"
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </IconButton>
        <IconButton
          className="social-icon telegram"
          href={socialLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Telegram />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
        {user ? (
          <Button 
            component={NavLink} 
            to={user.role === 'admin' ? '/admin' : '/profile'} 
            className="button" 
            fullWidth
          >
            {user.role === 'admin' ? 'Панель' : 'Профиль'}
          </Button>
        ) : (
          <Button component={NavLink} to="/login" className="button" fullWidth>
            Войти
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#153b18',
        color: '#e8f5e9',
        height: { xs: '60px', md: '80px' },
        justifyContent: 'center',
        borderBottom: '1px solid #66bb6a',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ position: 'relative' }}>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={mobileDrawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: '#135218',
                },
              }}
            >
              {mobileMenu}
            </Drawer>
          </>
        ) : (
          <Box display="flex" gap={2}>
            <Button
              className="button"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== '/') {
                  navigate('/');
                } else {
                  handleMenuOpen(e);
                }
              }}
              onMouseEnter={(e) => {
                if (location.pathname === '/') {
                  handleMenuOpen(e);
                }
              }}
            >
              Главная
            </Button>
          </Box>
        )}

        <Typography
          className="typographyForName"
          variant="h6"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'Playfair Display, Georgia, serif',
            fontWeight: 700,
            letterSpacing: { xs: 1, md: 2 },
            fontSize: { xs: '1.2rem', md: '1.8rem' },
            color: '#a5d6a7',
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
            cursor: 'default',
            '&:hover': {
              color: '#c8e6c9',
              textShadow: '2px 2px 8px rgba(0,0,0,0.4)',
            },
          }}
        >
          Mustang Valley
        </Typography>

        {!isMobile && (
          <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Box className="social-icons" sx={{ mr: 2 }}>
              <IconButton
                className="social-icon instagram"
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </IconButton>
              <IconButton
                className="social-icon telegram"
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Telegram />
              </IconButton>
            </Box>

            {user ? (
              <Button 
                component={NavLink} 
                to={user.role === 'admin' ? '/admin' : '/profile'} 
                className="button"
              >
                {user.role === 'admin' ? 'Панель' : 'Профиль'}
              </Button>
            ) : (
              <Button component={NavLink} to="/login" className="button">
                Войти
              </Button>
            )}
          </Box>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            onMouseLeave: handleMenuClose,
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          classes={{ paper: 'menu' }}
        >
          {menuItems.map(({ id, label, hash }) => (
            <MenuItem key={id} onClick={() => scrollToSection(id, hash)} className="menuItem">
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}