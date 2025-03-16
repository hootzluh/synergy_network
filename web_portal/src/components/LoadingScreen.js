import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const LoadingScreen = ({ isLoading }) => {
  const [showLoader, setShowLoader] = useState(true);
  const bgColor = useColorModeValue('gray.900', 'gray.900');
  const textColor = useColorModeValue('white', 'white');
  
  useEffect(() => {
    if (!isLoading) {
      // Add a slight delay before hiding the loader for a smoother transition
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (!showLoader) return null;
  
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg={bgColor}
      zIndex="9999"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      animation={`${fadeIn} 0.5s ease-in-out`}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
      >
        {/* Logo with animation */}
        <Box
          position="relative"
          width="150px"
          height="150px"
          mb={6}
        >
          {/* Rotating outer ring */}
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            borderRadius="full"
            border="3px solid"
            borderColor="synergy.500"
            animation={`${rotate} 4s linear infinite`}
          />
          
          {/* Pulsing inner logo */}
          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="80%"
            height="80%"
            justifyContent="center"
            alignItems="center"
            animation={`${pulse} 2s ease-in-out infinite`}
          >
            <Image 
              src="/images/syn.png" 
              alt="Synergy Network" 
              maxW="100%" 
              maxH="100%" 
            />
          </Flex>
        </Box>
        
        {/* Text with gradient */}
        <Text
          fontSize="2xl"
          fontWeight="bold"
          bgGradient="linear(to-r, #1399FF, #0500A3)"
          bgClip="text"
          letterSpacing="wider"
        >
          SYNERGY NETWORK
        </Text>
        
        {/* Loading text */}
        <Text
          mt={4}
          color={textColor}
          fontSize="md"
        >
          Initializing blockchain connection...
        </Text>
      </Flex>
    </Box>
  );
};

export default LoadingScreen;
