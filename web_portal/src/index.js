import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { WalletProvider } from './services/walletContext';
import theme from './theme';
import App from './App';

const AppWrapper = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <WalletProvider>
          <App />
        </WalletProvider>
      </Router>
    </ChakraProvider>
  );
};

export default AppWrapper;
