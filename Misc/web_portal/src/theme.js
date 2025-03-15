import { extendTheme } from '@chakra-ui/react';

// Define the colors for both light and dark mode
const colors = {
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
};

// Create the theme configuration with color mode support
const theme = extendTheme({
  colors,
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#121212' : '#f8fafc',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: (props) => ({
          bg: 'synergy.500',
          color: 'white',
          _hover: {
            bg: 'synergy.600',
          },
        }),
        outline: (props) => ({
          borderColor: 'synergy.500',
          color: props.colorMode === 'dark' ? 'synergy.300' : 'synergy.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'rgba(38, 112, 255, 0.2)' : 'synergy.50',
          },
        }),
      },
    },
    Card: {
      baseStyle: (props) => ({
        container: {
          bg: props.colorMode === 'dark' ? '#1e1e1e' : 'white',
          boxShadow: props.colorMode === 'dark' ? 'none' : 'md',
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
        },
      }),
    },
    Link: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'synergy.300' : 'synergy.500',
        _hover: {
          textDecoration: 'underline',
        },
      }),
    },
    Heading: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      }),
    },
    Input: {
      variants: {
        outline: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? '#2d2d2d' : 'white',
            borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
            _hover: {
              borderColor: props.colorMode === 'dark' ? 'gray.500' : 'gray.300',
            },
            _focus: {
              borderColor: 'synergy.500',
              boxShadow: `0 0 0 1px var(--chakra-colors-synergy-500)`,
            },
          },
        }),
      },
    },
    Menu: {
      baseStyle: (props) => ({
        list: {
          bg: props.colorMode === 'dark' ? '#2d2d2d' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
        },
        item: {
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          },
          _focus: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          },
        },
      }),
    },
  },
});

export default theme;
