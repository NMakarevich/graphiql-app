'use client';

import { cloneElement, FC, ReactElement, MouseEvent, useState } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageToggle from '@components/language-toggle/language-toggle.tsx';
import Box from '@mui/material/Box';
import Auth from '@components/auth/auth.tsx';
import Image from 'next/image';

function Scroll({ children }: { children: ReactElement }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      height: trigger ? '48px' : '64px',
      backgroundColor: trigger ? '#4F378B' : '',
      color: trigger ? '#EADDFF' : '',
      transition: 'background-color, height 0.3s',
      '& .MuiToolbar-root': {
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: trigger ? '48px' : '64px',
      },
      '.MuiSwitch-track': {
        backgroundColor: trigger ? '#EADDFF' : '',
        opacity: trigger ? 0.9 : 0.38,
      },
      '& .Mui-checked.Mui-checked': {
        color: trigger ? '#EADDFF' : '#4F378B',
      },
      '& .Mui-checked.Mui-checked + .MuiSwitch-track': {
        backgroundColor: trigger ? '#D0BCFF' : '#381E72',
      },
    },
  });
}

const Header: FC = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isAuth = false;

  const handleMenuOpen = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Scroll>
        <AppBar color={'primary'} position="sticky">
          <Toolbar>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open menu"
                onClick={handleMenuOpen}
                sx={{ mr: 2 }}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Menu
                sx={{
                  '.MuiMenu-paper': {
                    backgroundColor: '#141218',
                  },
                }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  sx={{
                    '.MuiSwitch-track': {
                      backgroundColor: '#EADDFF',
                      opacity: 0.38,
                    },
                  }}
                >
                  <LanguageToggle
                    languages={{
                      firstLanguage: 'EN',
                      secondLanguage: 'RU',
                    }}
                  />
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{ justifyContent: 'center' }}
                >
                  <Auth isAuth={isAuth} />
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Image
                src={'/app-logo.svg'}
                alt={'App logo'}
                width={32}
                height={32}
              />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <LanguageToggle
                languages={{
                  firstLanguage: 'English',
                  secondLanguage: 'Russian',
                }}
              />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Auth isAuth={isAuth} />
            </Box>
          </Toolbar>
        </AppBar>
      </Scroll>
    </>
  );
};

export default Header;
