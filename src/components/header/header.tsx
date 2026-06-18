'use client';

import { cloneElement, FC, ReactElement, MouseEvent, useState } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageToggle from '@/components/languageToggle/languageToggle';
import Box from '@mui/material/Box';
import AuthControl from '@components/authControl/authControl.tsx';
import { ROUTES } from '@/utils/constants/routes.ts';

function Scroll({ children }: { children: ReactElement }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      height: trigger ? '48px' : '64px',
      backgroundColor: trigger ? '#4F378B' : '#381E72',
      color: trigger ? '#EADDFF' : '',
      transition: 'background-color, height 0.3s',
      '& .MuiToolbar-root': {
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: trigger ? '48px' : '64px',
      },
      '.MuiSwitch-track': {
        backgroundColor: trigger ? '#EADDFF' : '#D0BCFF',
        opacity: trigger ? 0.9 : 0.38,
      },
      '& .Mui-checked.Mui-checked': {
        color: trigger ? '#EADDFF' : '#D0BCFF',
      },
    },
  });
}

const Header: FC = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Scroll>
        <AppBar color={'secondary'} position="sticky">
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
                  <AuthControl />
                </MenuItem>
              </Menu>
            </Box>
            <Link
              href={ROUTES.HOME_PATH}
              sx={{ display: 'block', width: 32, height: 32 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 100 100"
              >
                <path
                  fillRule="evenodd"
                  d="m50 6.903 37.323 21.549v43.096L50 93.097 12.677 71.548V28.451L50 6.903ZM16.865 30.87v31.656L44.28 15.041 16.864 30.87ZM50 13.51 18.398 68.246h63.205L50 13.509Zm27.415 58.924h-54.83L50 88.261l27.415-15.828Zm5.72-9.908L55.72 15.041 83.136 30.87v31.656Z"
                  clipRule="evenodd"
                />
                <circle cx="50" cy="9.321" r="8.82" />
                <circle cx="85.229" cy="29.66" r="8.82" />
                <circle cx="85.229" cy="70.34" r="8.82" />
                <circle cx="50" cy="90.679" r="8.82" />
                <circle cx="14.766" cy="70.34" r="8.82" />
                <circle cx="14.766" cy="29.66" r="8.82" />
              </svg>
            </Link>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <LanguageToggle
                languages={{
                  firstLanguage: 'headerToggleEnglish',
                  secondLanguage: 'headerToggleRussian',
                }}
              />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <AuthControl />
            </Box>
          </Toolbar>
        </AppBar>
      </Scroll>
    </>
  );
};

export default Header;
