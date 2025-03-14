import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    synergy: {
      50: '#e6f1ff',
      100: '#c0d7ff',
      200: '#99bdff',
      300: '#73a4ff',
      400: '#4c8aff',
      500: '#2670ff', // Primary blue color
      600: '#1a5cd9',
      700: '#0e48b3',
      800: '#03348c',
      900: '#002066',
    },
    accent: {
      500: '#00d1c7', // Accent teal color
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: '#f8fafc',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'synergy.500',
          color: 'white',
          _hover: {
            bg: 'synergy.600',
          },
        },
        outline: {
          borderColor: 'synergy.500',
          color: 'synergy.500',
          _hover: {
            bg: 'synergy.50',
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
