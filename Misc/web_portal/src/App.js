import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
// Pages
import HomePage from './pages/HomePage';
import IcoPresalePage from './pages/IcoPresalePage';
import ExplorerPage from './pages/ExplorerPage';
import WalletPage from './pages/WalletPage';
import DashboardPage from './pages/DashboardPage';
import DocsPage from './pages/DocsPage';

function App() {
  return (
    <>
      <div className="parallax-bg"></div>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1" py={4}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ico-presale" element={<IcoPresalePage />} />
            <Route path="/explorer" element={<ExplorerPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/docs" element={<DocsPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default App;
