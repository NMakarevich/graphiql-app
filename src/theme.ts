'use client';

import { Montserrat } from 'next/font/google';
import { createTheme } from '@mui/material';

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

export const theme = createTheme({
  palette: {
    primary: {
      main: '#D0BCFF',
    },
    secondary: {
      main: '#CCC2DC',
    },
    error: {
      main: '#F2B8B5',
    },
    background: {
      default: '#141218',
    },
    text: {
      primary: '#E6E0E9',
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576.5,
      md: 768.5,
      lg: 1025,
      xl: 1440.5,
    },
  },
});
