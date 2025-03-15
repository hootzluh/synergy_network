import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Link,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Divider,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { FaBook, FaCode, FaFileAlt, FaServer, FaNetworkWired, FaShieldAlt, FaWallet, FaUsersCog } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';

export default function DocsPage() {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="7xl" py={8}>
      <Heading as="h1" mb={8}>Documentation</Heading>
      
      {/* Introduction */}
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" mb={8}>
        <CardBody>
          <VStack spacing={4} align="start">
            <Heading size="lg">Welcome to Synergy Network</Heading>
            <Text>
              Synergy Network is a next-generation blockchain platform featuring Proof of Synergy consensus and 
              Post-Quantum Cryptography. This documentation will help you understand the network architecture, 
              how to interact with the blockchain, and how to build on the platform.
            </Text>
          </VStack>
        </CardBody>
      </Card>
      
      {/* Documentation Categories */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="100%">
          <CardHeader pb={0}>
            <HStack>
              <Icon as={FaBook} color="synergy.500" boxSize={6} />
              <Heading size="md">Getting Started</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={3}>
              <Link color="synergy.500">Introduction to Synergy Network</Link>
              <Link color="synergy.500">Network Architecture</Link>
              <Link color="synergy.500">Creating a Wallet</Link>
              <Link color="synergy.500">Obtaining SYN Tokens</Link>
              <Link color="synergy.500">Making Your First Transaction</Link>
            </VStack>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="100%">
          <CardHeader pb={0}>
            <HStack>
              <Icon as={FaNetworkWired} color="synergy.500" boxSize={6} />
              <Heading size="md">Core Concepts</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={3}>
              <Link color="synergy.500">Proof of Synergy Consensus</Link>
              <Link color="synergy.500">Validator Clusters</Link>
              <Link color="synergy.500">Synergy Points System</Link>
              <Link color="synergy.500">Post-Quantum Cryptography</Link>
              <Link color="synergy.500">Synergy Naming System (SNS)</Link>
            </VStack>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="100%">
          <CardHeader pb={0}>
            <HStack>
              <Icon as={FaCode} color="synergy.500" boxSize={6} />
              <Heading size="md">Developer Resources</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={3}>
              <Link color="synergy.500">SDK Documentation</Link>
              <Link color="synergy.500">Smart Contract Development</Link>
              <Link color="synergy.500">API Reference</Link>
              <Link color="synergy.500">Testing Framework</Link>
              <Link color="synergy.500">Deployment Tools</Link>
            </VStack>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="100%">
          <CardHeader pb={0}>
            <HStack>
              <Icon as={FaWallet} color="synergy.500" boxSize={6} />
              <Heading size="md">Wallet & Tokens</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={3}>
              <Link color="synergy.500">Wallet User Guide</Link>
              <Link color="synergy.500">Token Economics</Link>
              <Link color="synergy.500">Staking Guide</Link>
              <Link color="synergy.500">Transaction Fees</Link>
              <Link color="synergy.500">Key Management</Link>
            </VStack>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="100%">
          <CardHeader pb={0}>
            <HStack>
              <Icon as={FaServer} color="synergy.500" boxSize={6} />
              <Heading size="md">Node Operation</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={3}>
              <Link color="synergy.500">Running a Full Node</Link>
              <Link color="synergy.500">Becoming a Validator</Link>
              <Link color="synergy.500">Hardware Requirements</Link>
              <Link color="synergy.500">Node Monitoring</Link>
              <Link color="synergy.500">Troubleshooting</Link>
            </VStack>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="100%">
          <CardHeader pb={0}>
            <HStack>
              <Icon as={FaUsersCog} color="synergy.500" boxSize={6} />
              <Heading size="md">Governance</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={3}>
              <Link color="synergy.500">Governance Model</Link>
              <Link color="synergy.500">Proposal System</Link>
              <Link color="synergy.500">Voting Mechanism</Link>
              <Link color="synergy.500">Treasury Management</Link>
              <Link color="synergy.500">Parameter Changes</Link>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      {/* Featured Documentation */}
      <Heading size="lg" mb={4}>Featured Documentation</Heading>
      
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" mb={8}>
        <CardHeader>
          <HStack>
            <Icon as={FaNetworkWired} color="synergy.500" boxSize={6} />
            <Heading size="md">Proof of Synergy Consensus</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack align="start" spacing={4}>
            <Text>
              Proof of Synergy (PoSy) is a novel consensus mechanism that prioritizes collaboration over competition. 
              Unlike traditional Proof of Work or Proof of Stake systems, PoSy forms dynamic validator clusters that 
              work together to process transactions and maintain the network.
            </Text>
            
            <Heading size="sm">Key Components</Heading>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="synergy.500" />
                <Text as="span" fontWeight="bold">Synergy Task Pools:</Text> Centralized pools of tasks dynamically assigned to validators
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="synergy.500" />
                <Text as="span" fontWeight="bold">Synergy Points:</Text> Scoring system that rewards nodes based on contributions
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="synergy.500" />
                <Text as="span" fontWeight="bold">Randomized Validator Clusters:</Text> Dynamic groups of validators collaboratively assigned tasks
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="synergy.500" />
                <Text as="span" fontWeight="bold">Consensus Rules:</Text> PBFT principles used within clusters to finalize tasks
              </ListItem>
            </List>
            
            <Link color="synergy.500" fontWeight="bold">Read the full documentation →</Link>
          </VStack>
        </CardBody>
      </Card>
      
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" mb={8}>
        <CardHeader>
          <HStack>
            <Icon as={FaShieldAlt} color="synergy.500" boxSize={6} />
            <Heading size="md">Post-Quantum Cryptography</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack align="start" spacing={4}>
            <Text>
              Synergy Network implements quantum-resistant cryptographic algorithms to ensure long-term security 
              against potential threats from quantum computers. The network uses Dilithium-3 as its primary signature 
              scheme and Kyber for hybrid encryption where needed.
            </Text>
            
            <Heading size="sm">Implementation Details</Heading>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="synergy.500" />
                <Text as="span" fontWeight="bold">Primary Algorithm:</Text> Dilithium-3 (CRYSTALS PQC Standard)
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="synergy.500" />
                <Text as="span" fontWeight="bold">Alternative:</Text> Kyber (for hybrid encryption key generation)
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="synergy.500" />
                <Text as="span" fontWeight="bold">Hash Functions:</Text> SHA3-256 or BLAKE3 (quantum-resistant)
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="synergy.500" />
                <Text as="span" fontWeight="bold">Address Encoding:</Text> Bech32m with sYnQ or sYnU prefix
              </ListItem>
            </List>
            
            <Link color="synergy.500" fontWeight="bold">Read the full documentation →</Link>
          </VStack>
        </CardBody>
      </Card>
      
      {/* API Reference Preview */}
      <Heading size="lg" mb={4}>API Reference</Heading>
      
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" mb={8}>
        <CardHeader>
          <HStack>
            <Icon as={FaCode} color="synergy.500" boxSize={6} />
            <Heading size="md">JSON-RPC API</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack align="start" spacing={4}>
            <Text>
              Synergy Network provides a comprehensive JSON-RPC API for interacting with the blockchain. 
              Below are some of the most commonly used endpoints:
            </Text>
            
            <Box 
              w="100%" 
              p={4} 
              bg="gray.50" 
              borderRadius="md" 
              fontFamily="monospace" 
              fontSize="sm"
              overflowX="auto"
            >
              <Text fontWeight="bold" mb={2}>// Get current block number</Text>
              <Text>{'{'}</Text>
              <Text ml={4}>"jsonrpc": "2.0",</Text>
              <Text ml={4}>"method": "syn_blockNumber",</Text>
              <Text ml={4}>"params": [],</Text>
              <Text ml={4}>"id": 1</Text>
              <Text>{'}'}</Text>
            </Box>
            
            <Box 
              w="100%" 
              p={4} 
              bg="gray.50" 
              borderRadius="md" 
              fontFamily="monospace" 
              fontSize="sm"
              overflowX="auto"
            >
              <Text fontWeight="bold" mb={2}>// Get balance for address</Text>
              <Text>{'{'}</Text>
              <Text ml={4}>"jsonrpc": "2.0",</Text>
              <Text ml={4}>"method": "syn_getBalance",</Text>
              <Text ml={4}>"params": ["sYnQ1zxy8qhj4j59xp5lwkwpd5qws9aygz8pl9m3kmjx3", "latest"],</Text>
              <Text ml={4}>"id": 1</Text>
              <Text>{'}'}</Text>
            </Box>
            
            <Link color="synergy.500" fontWeight="bold">View full API reference →</Link>
          </VStack>
        </CardBody>
      </Card>
      
      {/* Documentation Resources */}
      <Heading size="lg" mb={4}>Additional Resources</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="100%">
          <CardBody>
            <VStack>
              <Icon as={FaFileAlt} color="synergy.500" boxSize={10} mb={2} />
              <Heading size="sm" textAlign="center">Whitepapers</Heading>
              <Text textAlign="center" fontSize="sm">
                Technical whitepapers detailing the Synergy Network architecture and innovations
              </Text>
            </VStack>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="100%">
          <CardBody>
            <VStack>
              <Icon as={FaCode} color="synergy.500" boxSize={10} mb={2} />
              <Heading size="sm" textAlign="center">GitHub Repository</Heading>
              <Text textAlign="center" fontSize="sm">
                Access the source code, contribute to development, and report issues
              </Text>
            </VStack>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="100%">
          <CardBody>
            <VStack>
              <Icon as={FaBook} color="synergy.500" boxSize={10} mb={2} />
              <Heading size="sm" textAlign="center">Tutorials</Heading>
              <Text textAlign="center" fontSize="sm">
                Step-by-step guides for developers and users of all skill levels
              </Text>
            </VStack>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" h="100%">
          <CardBody>
            <VStack>
              <Icon as={FaServer} color="synergy.500" boxSize={10} mb={2} />
              <Heading size="sm" textAlign="center">Testnet Resources</Heading>
              <Text textAlign="center" fontSize="sm">
                Tools and documentation for testing on the Synergy testnet
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
