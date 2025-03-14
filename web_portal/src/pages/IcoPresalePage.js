import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  Progress,
  Divider,
  useToast,
  Image,
  Badge,
  Flex,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue
} from '@chakra-ui/react';

const IcoPresalePage = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('ETH');
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // ICO details based on our token economics
  const icoDetails = {
    totalSupply: '10,000,000,000 SYN',
    icoAllocation: '500,000,000 SYN (5%)',
    currentPrice: '$0.018',
    minPurchase: '500 SYN',
    maxPurchase: '1,000,000 SYN',
    raised: '12,500,000',
    goal: '25,000,000',
    startDate: 'March 15, 2025',
    endDate: 'April 15, 2025',
    tiers: [
      { name: 'Private Round', price: '$0.008', allocation: '200,000,000 SYN', status: 'Completed' },
      { name: 'Seed Round', price: '$0.012', allocation: '150,000,000 SYN', status: 'Completed' },
      { name: 'Public Pre-sale', price: '$0.018', allocation: '150,000,000 SYN', status: 'Active' }
    ]
  };

  // Calculate equivalent SYN tokens based on payment amount
  const calculateTokens = (amount) => {
    const priceInUSD = 0.018; // Current price tier
    
    // Simplified conversion rates (in production would use real-time rates)
    const conversionRates = {
      ETH: 3000, // 1 ETH = $3000
      BTC: 60000, // 1 BTC = $60000
      USDT: 1,
      USDC: 1
    };
    
    if (!amount || isNaN(amount)) return 0;
    
    const usdValue = amount * conversionRates[paymentMethod];
    return Math.floor(usdValue / priceInUSD);
  };

  const handlePurchase = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount to purchase',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const tokens = calculateTokens(amount);
    
    if (tokens < 500) {
      toast({
        title: 'Below minimum purchase',
        description: 'Minimum purchase is 500 SYN tokens',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (tokens > 1000000) {
      toast({
        title: 'Exceeds maximum purchase',
        description: 'Maximum purchase is 1,000,000 SYN tokens per wallet',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // In a real implementation, this would connect to wallet and process the transaction
    toast({
      title: 'Purchase initiated',
      description: `You are purchasing ${tokens.toLocaleString()} SYN tokens for ${amount} ${paymentMethod}`,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  // Calculate progress percentage
  const progressPercentage = (parseFloat(icoDetails.raised.replace(/,/g, '')) / 
                             parseFloat(icoDetails.goal.replace(/,/g, ''))) * 100;

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Hero Section */}
        <Box 
          p={8} 
          borderRadius="lg" 
          bgGradient="linear(to-r, synergy.700, synergy.500)"
          color="white"
          textAlign="center"
        >
          <Heading as="h1" size="2xl" mb={4}>
            Synergy Network ICO Pre-sale
          </Heading>
          <Text fontSize="xl" maxW="3xl" mx="auto">
            Join the future of collaborative blockchain technology with Proof of Synergy consensus and Post-Quantum Cryptography
          </Text>
          <Button 
            mt={6} 
            size="lg" 
            colorScheme="white" 
            variant="outline" 
            _hover={{ bg: 'whiteAlpha.200' }}
            onClick={() => document.getElementById('purchase-section').scrollIntoView({ behavior: 'smooth' })}
          >
            Participate Now
          </Button>
        </Box>

        {/* ICO Statistics */}
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
          <GridItem>
            <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="full">
              <CardHeader pb={0}>
                <Heading size="md">Token Details</Heading>
              </CardHeader>
              <CardBody>
                <Stat>
                  <StatLabel>Total Supply</StatLabel>
                  <StatNumber>{icoDetails.totalSupply}</StatNumber>
                  <StatHelpText>ICO Allocation: {icoDetails.icoAllocation}</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          
          <GridItem>
            <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="full">
              <CardHeader pb={0}>
                <Heading size="md">Current Price</Heading>
              </CardHeader>
              <CardBody>
                <Stat>
                  <StatLabel>Public Pre-sale</StatLabel>
                  <StatNumber>{icoDetails.currentPrice}</StatNumber>
                  <StatHelpText>Min: {icoDetails.minPurchase} | Max: {icoDetails.maxPurchase}</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
          
          <GridItem>
            <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="full">
              <CardHeader pb={0}>
                <Heading size="md">ICO Timeline</Heading>
              </CardHeader>
              <CardBody>
                <Stat>
                  <StatLabel>Pre-sale Period</StatLabel>
                  <StatNumber>
                    <Badge colorScheme="green" fontSize="0.8em" p={1}>
                      Active
                    </Badge>
                  </StatNumber>
                  <StatHelpText>{icoDetails.startDate} - {icoDetails.endDate}</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        {/* Fundraising Progress */}
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
          <CardHeader>
            <Heading size="md">Fundraising Progress</Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Progress 
                value={progressPercentage} 
                size="lg" 
                colorScheme="synergy" 
                borderRadius="md"
              />
              <Flex justify="space-between">
                <Text>${icoDetails.raised} raised</Text>
                <Text>Goal: ${icoDetails.goal}</Text>
              </Flex>
              <Text color="gray.500" fontSize="sm">
                {progressPercentage.toFixed(2)}% of goal reached
              </Text>
            </VStack>
          </CardBody>
        </Card>

        {/* Price Tiers */}
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
          <CardHeader>
            <Heading size="md">Price Tiers</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
              {icoDetails.tiers.map((tier, index) => (
                <GridItem key={index}>
                  <VStack 
                    p={4} 
                    borderWidth="1px" 
                    borderRadius="md" 
                    borderColor={borderColor}
                    align="stretch"
                    spacing={3}
                  >
                    <Heading size="sm">{tier.name}</Heading>
                    <Text fontSize="2xl" fontWeight="bold">{tier.price}</Text>
                    <Text>Allocation: {tier.allocation}</Text>
                    <Badge 
                      alignSelf="flex-start" 
                      colorScheme={tier.status === 'Active' ? 'green' : 'gray'}
                    >
                      {tier.status}
                    </Badge>
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          </CardBody>
        </Card>

        {/* Purchase Section */}
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" id="purchase-section">
          <CardHeader>
            <Heading size="md">Purchase SYN Tokens</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={8}>
              <GridItem>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Text mb={2}>Payment Method</Text>
                    <Select 
                      value={paymentMethod} 
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="USDT">Tether (USDT)</option>
                      <option value="USDC">USD Coin (USDC)</option>
                    </Select>
                  </Box>
                  
                  <Box>
                    <Text mb={2}>Amount</Text>
                    <Input 
                      placeholder={`Enter amount in ${paymentMethod}`} 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)}
                      type="number"
                    />
                  </Box>
                  
                  <Divider />
                  
                  <Box>
                    <Text mb={2}>You will receive</Text>
                    <HStack>
                      <Text fontSize="2xl" fontWeight="bold">
                        {calculateTokens(amount).toLocaleString()}
                      </Text>
                      <Text>SYN Tokens</Text>
                    </HStack>
                  </Box>
                  
                  <Button 
                    colorScheme="synergy" 
                    size="lg" 
                    onClick={handlePurchase}
                    isDisabled={!amount || isNaN(amount) || amount <= 0}
                  >
                    Purchase Tokens
                  </Button>
                </VStack>
              </GridItem>
              
              <GridItem>
                <VStack 
                  spacing={4} 
                  p={6} 
                  bg="gray.50" 
                  borderRadius="md" 
                  height="100%"
                  justify="center"
                  align="flex-start"
                >
                  <Heading size="md">Important Information</Heading>
                  <Text>• KYC is required for purchases above 10,000 SYN</Text>
                  <Text>• Tokens will be distributed after the ICO ends</Text>
                  <Text>• Payment methods: ETH, BTC, USDT, USDC</Text>
                  <Text>• Minimum purchase: 500 SYN</Text>
                  <Text>• Maximum purchase: 1,000,000 SYN per wallet</Text>
                  <Text>• Current price: $0.018 per SYN</Text>
                  
                  <Divider />
                  
                  <Text fontSize="sm" color="gray.600">
                    By participating in the ICO, you agree to the terms and conditions of the Synergy Network token sale.
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default IcoPresalePage;
