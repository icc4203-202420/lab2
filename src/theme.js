import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
    ].join(','), // Definiendo Roboto como la fuente principal
    },
  palette: {
    primary: {
      main: '#569de3',  // Un azul suave, cambia esto por el color que prefieras
    },
    secondary: {
      main: '#2369ad',  // Un verde suave, cambia esto por el color que prefieras
    },
    error: {
      main: '#ff1744',
    },
    background: {
      default: '#fff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#333333',  // Color para texto principal
      secondary: '#555555',  // Color para texto secundario
      link: '#1872cc',  // Puedes agregar esto para links
    },
  },
  components: {
    // Para botones específicos puedes hacer ajustes aquí
    MuiButton: {
      styleOverrides: {
        root: {
          // Aplica estilos adicionales aquí si es necesario
          fontWeight: 'bold',
        },
      },
    },
    // Ajustes para AppBar, por ejemplo, la topbar
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          color: '#ffffff',  // Establece el color de la fuente a blanco
          backgroundColor: '#569de3',  // Cambia esto por el color que desees para la topbar
        },
      },
    },
  },
});

export default theme;
