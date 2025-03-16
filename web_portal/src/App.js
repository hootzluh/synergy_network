import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/LoadingScreen';
// Pages
import HomePage from './pages/HomePage';
import IcoPresalePage from './pages/IcoPresalePage';
import ExplorerPage from './pages/ExplorerPage';
import WalletPage from './pages/WalletPage';
import DashboardPage from './pages/DashboardPage';
import DocsPage from './pages/DocsPage';
import SettingsPage from './pages/SettingsPage';
import GasStationPage from './pages/GasStationPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for blockchain initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
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
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/gas-station" element={<GasStationPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default App;
