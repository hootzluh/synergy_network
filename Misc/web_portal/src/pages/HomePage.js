import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Button, useColorMode } from '@chakra-ui/react';

const HomePage = () => {
  const { colorMode } = useColorMode();
  
  return (
    <Container maxW="container.xl" className="content-container">
      <Box className="glass-container" mb={8}>
        <Heading 
          as="h1" 
          size="2xl" 
          mb={6}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Welcome to Synergy Network
        </Heading>
        <Text fontSize="xl" mb={6}>
          The next generation blockchain platform for decentralized applications and digital assets.
        </Text>
        <Button 
          size="lg" 
          className="glass-button glow-effect"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, cyan.500, blue.600)",
          }}
          mr={4}
        >
          Get Started
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="glass-button"
          borderColor={colorMode === 'dark' ? 'synergy.300' : 'synergy.500'}
          color={colorMode === 'dark' ? 'synergy.300' : 'synergy.500'}
        >
          Learn More
        </Button>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={12}>
        <Box className="glass-container glass-card">
          <Heading as="h3" size="lg" mb={4} color={colorMode === 'dark' ? 'cyan.300' : 'cyan.500'}>
            Fast & Scalable
          </Heading>
          <Text>
            Process thousands of transactions per second with minimal fees and instant finality.
          </Text>
        </Box>
        
        <Box className="glass-container glass-card">
          <Heading as="h3" size="lg" mb={4} color={colorMode === 'dark' ? 'blue.300' : 'blue.500'}>
            Secure & Reliable
          </Heading>
          <Text>
            Built on proven consensus mechanisms with enterprise-grade security features.
          </Text>
        </Box>
        
        <Box className="glass-container glass-card">
          <Heading as="h3" size="lg" mb={4} color={colorMode === 'dark' ? 'purple.300' : 'purple.500'}>
            Developer Friendly
          </Heading>
          <Text>
            Comprehensive SDK, documentation, and tools to build your next blockchain application.
          </Text>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
