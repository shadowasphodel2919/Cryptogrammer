import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import './Navbar.css';
import { Outlet } from 'react-router-dom';
import {Link} from 'react-router-dom';

const pages = ['Articles', 'Algorithms'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <AppBar position="sticky" elevation={0} sx={{ 
      backgroundColor: 'rgba(10, 10, 10, 0.7)', 
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0, 255, 65, 0.2)',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CRYPTOGRAMMER
            </Typography>
            <Box sx={{flexGrow:1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem key='Articles' component={Link} to="articles" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ fontFamily: "'Roboto Mono', monospace" }}>Articles</Typography>
                </MenuItem>
                <MenuItem key='Algorithms' component={Link} to="algorithms" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ fontFamily: "'Roboto Mono', monospace" }}>Algorithms</Typography>
                </MenuItem>
                <MenuItem key='Steganography' component={Link} to="steganography" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ fontFamily: "'Roboto Mono', monospace" }}>Steganography</Typography>
                </MenuItem>
              </Menu>
            </Box>

            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CRYPTOGRAMMER
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              <Button
                key='Articles'
                sx={{ my: 2, mx: 1, color: 'white', display: 'block', fontFamily: "'Roboto Mono', monospace", '&:hover': { color: '#00ff41', textShadow: '0 0 8px rgba(0,255,65,0.4)' } }}
                component={Link} to="articles"
              >
                Articles
              </Button>
              <Button
                key='Algorithms'
                sx={{ my: 2, mx: 1, color: 'white', display: 'block', fontFamily: "'Roboto Mono', monospace", '&:hover': { color: '#00ff41', textShadow: '0 0 8px rgba(0,255,65,0.4)' } }}
                component={Link} to="algorithms"
              >
                Algorithms
              </Button>
              <Button
                key='Steganography'
                sx={{ my: 2, mx: 1, color: 'white', display: 'block', fontFamily: "'Roboto Mono', monospace", '&:hover': { color: '#00ff41', textShadow: '0 0 8px rgba(0,255,65,0.4)' } }}
                component={Link} to="steganography"
              >
                Steganography
              </Button>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Outlet />
    </>
  );
};
export default Header;