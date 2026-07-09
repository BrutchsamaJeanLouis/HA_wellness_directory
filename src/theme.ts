import { createTheme } from '@mui/material/styles'

/**
 * App-wide theme: a calm, wellness-oriented palette with soft rounded corners
 * and modern component defaults (pill buttons/inputs, glassy app bar).
 */
export const theme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  palette: {
    primary: { main: '#1f8a70', light: '#4fb89c', dark: '#136353', contrastText: '#ffffff' },
    secondary: { main: '#e0915a', contrastText: '#ffffff' },
    background: { default: '#f3f7f5', paper: '#ffffff' },
    text: { primary: '#1e2a28', secondary: '#5c6b68' },
    divider: 'rgba(31, 42, 40, 0.10)',
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(31, 42, 40, 0.08)',
          color: '#1e2a28',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 18 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 999 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 20 },
      },
    },
  },
})
