import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Flex,
  Icon,
  Input,
  FormControl,
  FormLabel,
  Select,
  VStack,
  HStack,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText
} from '@chakra-ui/react';
import { FaWallet, FaPaperPlane, FaHistory, FaQrcode, FaCog, FaKey, FaShieldAlt } from 'react-icons/fa';

export default function WalletPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock wallet data
  const walletData = {
    address: 'sYnQ1zxy8qhj4j59xp5lwkwpd5qws9aygz8pl9m3kmjx3',
    balance: '12,500.75',
    usdValue: '$312,518.75', // Based on $0.025 per SYN
    transactions: [
      { type: 'Received', amount: '500 SYN', from: 'sYnQ8ab...7k2pqrs9', to: 'You', date: '2025-03-12 14:32:15', status: 'Confirmed' },
      { type: 'Sent', amount: '250 SYN', from: 'You', to: 'sYnQ3ef...2j5mnpq4', date: '2025-03-11 09:15:42', status: 'Confirmed' },
      { type: 'Received', amount: '1,000 SYN', from: 'sYnQ9cd...4f7ghij6', to: 'You', date: '2025-03-10 18:23:05', status: 'Confirmed' },
      { type: 'Sent', amount: '125 SYN', from: 'You', to: 'sYnQ5gh...8d1efgh0', date: '2025-03-08 11:05:37', status: 'Confirmed' },
      { type: 'Staking Reward', amount: '45.75 SYN', from: 'Network', to: 'You', date: '2025-03-07 00:00:00', status: 'Confirmed' }
    ]
  };

  const handleConnect = () => {
    // In a real implementation, this would connect to a wallet like MetaMask
    setIsConnected(true);
    toast({
      title: 'Wallet connected',
      description: 'Successfully connected to your Synergy wallet',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSend = () => {
    if (!recipientAddress) {
      toast({
        title: 'Missing recipient',
        description: 'Please enter a recipient address',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount to send',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // In a real implementation, this would send the transaction
    toast({
      title: 'Transaction initiated',
      description: `Sending ${amount} SYN to ${recipientAddress}`,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });

    // Reset form
    setRecipientAddress('');
    setAmount('');
  };

  return (
    <Container maxW="7xl" py={8}>
      <Heading as="h1" mb={8}>Synergy Wallet</Heading>
      
      {!isConnected ? (
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
          <CardBody>
            <VStack spacing={6} py={8}>
              <Icon as={FaWallet} w={20} h={20} color="synergy.500" />
              <Heading size="lg">Connect Your Wallet</Heading>
              <Text textAlign="center" maxW="md">
                Connect your wallet to send and receive SYN tokens, check your balance, and view transaction history.
              </Text>
              <Button 
                leftIcon={<FaKey />}
                colorScheme="synergy" 
                size="lg" 
                onClick={handleConnect}
              >
                Connect Wallet
              </Button>
            </VStack>
          </CardBody>
        </Card>
      ) : (
        <Box>
          {/* Wallet Overview */}
          <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" mb={8}>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Box>
                  <Heading size="md" mb={4}>Wallet Address</Heading>
                  <Flex 
                    p={4} 
                    bg="gray.50" 
                    borderRadius="md" 
                    align="center" 
                    justify="space-between"
                  >
                    <Text fontSize="sm" fontFamily="monospace">
                      {walletData.address}
                    </Text>
                    <HStack>
                      <Button size="sm" leftIcon={<FaQrcode />} variant="ghost">
                        QR
                      </Button>
                      <Button size="sm" variant="ghost">
                        Copy
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
                
                <Box>
                  <Heading size="md" mb={4}>Balance</Heading>
                  <Stat>
                    <StatNumber fontSize="3xl">{walletData.balance} SYN</StatNumber>
                    <StatHelpText>{walletData.usdValue}</StatHelpText>
                  </Stat>
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>
          
          {/* Wallet Tabs */}
          <Tabs colorScheme="synergy" variant="enclosed" isLazy>
            <TabList>
              <Tab><Icon as={FaPaperPlane} mr={2} /> Send</Tab>
              <Tab><Icon as={FaHistory} mr={2} /> Transactions</Tab>
              <Tab><Icon as={FaShieldAlt} mr={2} /> Staking</Tab>
              <Tab><Icon as={FaCog} mr={2} /> Settings</Tab>
            </TabList>
            
            <TabPanels>
              {/* Send Tab */}
              <TabPanel>
                <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                  <CardHeader>
                    <Heading size="md">Send SYN Tokens</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={6} align="stretch">
                      <FormControl isRequired>
                        <FormLabel>Recipient Address</FormLabel>
                        <Input 
                          placeholder="Enter Synergy address (sYnQ...)" 
                          value={recipientAddress}
                          onChange={(e) => setRecipientAddress(e.target.value)}
                        />
                      </FormControl>
                      
                      <FormControl isRequired>
                        <FormLabel>Amount</FormLabel>
                        <Input 
                          placeholder="Enter amount to send" 
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Transaction Speed</FormLabel>
                        <Select defaultValue="standard">
                          <option value="slow">Slow (0.001 SYN fee)</option>
                          <option value="standard">Standard (0.002 SYN fee)</option>
                          <option value="fast">Fast (0.005 SYN fee)</option>
                        </Select>
                      </FormControl>
                      
                      <Divider />
                      
                      <HStack justify="space-between">
                        <Text>Transaction Fee:</Text>
                        <Text>0.002 SYN</Text>
                      </HStack>
                      
                      <HStack justify="space-between">
                        <Text fontWeight="bold">Total Amount:</Text>
                        <Text fontWeight="bold">
                          {amount ? (parseFloat(amount) + 0.002).toFixed(3) : '0.002'} SYN
                        </Text>
                      </HStack>
                      
                      <Button 
                        colorScheme="synergy" 
                        size="lg" 
                        leftIcon={<FaPaperPlane />}
                        onClick={handleSend}
                        isDisabled={!recipientAddress || !amount}
                      >
                        Send Tokens
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </TabPanel>
              
              {/* Transactions Tab */}
              <TabPanel>
                <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                  <CardHeader>
                    <Heading size="md">Transaction History</Heading>
                  </CardHeader>
                  <CardBody>
                    <Box overflowX="auto">
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Type</Th>
                            <Th>Amount</Th>
                            <Th>From</Th>
                            <Th>To</Th>
                            <Th>Date</Th>
                            <Th>Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {walletData.transactions.map((tx, index) => (
                            <Tr key={index}>
                              <Td>
                                <Badge 
                                  colorScheme={
                                    tx.type === 'Received' ? 'green' : 
                                    tx.type === 'Staking Reward' ? 'purple' : 'orange'
                                  }
                                >
                                  {tx.type}
                                </Badge>
                              </Td>
                              <Td>{tx.amount}</Td>
                              <Td>{tx.from}</Td>
                              <Td>{tx.to}</Td>
                              <Td>{tx.date}</Td>
                              <Td>
                                <Badge colorScheme="green">{tx.status}</Badge>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  </CardBody>
                </Card>
              </TabPanel>
              
              {/* Staking Tab */}
              <TabPanel>
                <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                  <CardHeader>
                    <Heading size="md">Staking</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={8} align="stretch">
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                        <Stat>
                          <StatLabel>Total Staked</StatLabel>
                          <StatNumber>5,000 SYN</StatNumber>
                          <StatHelpText>40% of your balance</StatHelpText>
                        </Stat>
                        
                        <Stat>
                          <StatLabel>Estimated Rewards</StatLabel>
                          <StatNumber>45.75 SYN/month</StatNumber>
                          <StatHelpText>11% APY</StatHelpText>
                        </Stat>
                        
                        <Stat>
                          <StatLabel>Next Reward</StatLabel>
                          <StatNumber>~1.5 SYN</StatNumber>
                          <StatHelpText>In 23 hours</StatHelpText>
                        </Stat>
                      </SimpleGrid>
                      
                      <Divider />
                      
                      <Heading size="sm">Stake Additional Tokens</Heading>
                      
                      <HStack>
                        <Input placeholder="Enter amount to stake" />
                        <Button colorScheme="synergy">Stake</Button>
                      </HStack>
                      
                      <Divider />
                      
                      <Heading size="sm">Unstake Tokens</Heading>
                      
                      <HStack>
                        <Input placeholder="Enter amount to unstake" />
                        <Button variant="outline" colorScheme="synergy">Unstake</Button>
                      </HStack>
                      
                      <Text fontSize="sm" color="gray.500">
                        Note: Unstaking has a 7-day cooldown period before tokens are returned to your wallet.
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              </TabPanel>
              
              {/* Settings Tab */}
              <TabPanel>
                <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                  <CardHeader>
                    <Heading size="md">Wallet Settings</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={6} align="stretch">
                      <FormControl>
                        <FormLabel>Default Transaction Speed</FormLabel>
                        <Select defaultValue="standard">
                          <option value="slow">Slow</option>
                          <option value="standard">Standard</option>
                          <option value="fast">Fast</option>
                        </Select>
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Display Currency</FormLabel>
                        <Select defaultValue="usd">
                          <option value="usd">USD</option>
                          <option value="eur">EUR</option>
                          <option value="gbp">GBP</option>
                          <option value="jpy">JPY</option>
                        </Select>
                      </FormControl>
                      
                      <Divider />
                      
                      <Heading size="sm">Security</Heading>
                      
                      <Button leftIcon={<FaKey />} colorScheme="synergy" variant="outline">
                        Export Private Key
                      </Button>
                      
                      <Button leftIcon={<FaShieldAlt />} colorScheme="synergy" variant="outline">
                        Enable 2FA
                      </Button>
                      
                      <Divider />
                      
                      <Button colorScheme="red" variant="outline">
                        Disconnect Wallet
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Container>
  );
}
