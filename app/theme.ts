import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4', // فيروزي داكن
      light: '#33c9e7',
      dark: '#008ba3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7c4dff', // بنفسجي عصري
      light: '#b47cff',
      dark: '#3f1dcb',
      contrastText: '#fff',
    },
    background: {
      default: '#181c24',
      paper: '#23283a',
    },
    text: {
      primary: '#e3e8ef',
      secondary: '#b0b8c1',
    },
  },
  typography: {
    fontFamily: [
      'Cairo',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    h1: { letterSpacing: '0.02em', fontWeight: 700 },
    h2: { letterSpacing: '0.02em', fontWeight: 700 },
    h3: { letterSpacing: '0.01em', fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 28px',
          boxShadow: '0 2px 16px 0 rgba(0,188,212,0.10)',
          transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
          '&:hover': {
            background: 'linear-gradient(90deg,#00bcd4 60%,#7c4dff 100%)',
            transform: 'translateY(-2px) scale(1.04)',
            boxShadow: '0 4px 24px 0 rgba(124,77,255,0.18)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)',
          background: 'linear-gradient(135deg,#23283a 80%,#181c24 100%)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          background: '#23283a',
          color: '#e3e8ef',
          boxShadow: '0 1px 8px 0 rgba(0,188,212,0.04)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 16px 0 rgba(124,77,255,0.10)',
          background: 'linear-gradient(120deg,#23283a 80%,#181c24 100%)',
        },
      },
    },
  },
});

export default theme;