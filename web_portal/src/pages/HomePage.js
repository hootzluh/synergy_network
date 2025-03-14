import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  HStack,
  useColorModeValue,
  Divider,
  Card,
  CardBody
} from '@chakra-ui/react';
import { FaShieldAlt, FaNetworkWired, FaUsers, FaRocket } from 'react-icons/fa';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'synergy.500'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function HomePage() {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-r, synergy.700, synergy.500)"
        color="white"
        py={20}
      >
        <Container maxW={'7xl'}>
          <Stack
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            direction={{ base: 'column', md: 'row' }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              >
                <Text as={'span'}>
                  The Future of Blockchain
                </Text>
                <br />
                <Text as={'span'} color={'accent.500'}>
                  Synergy Network
                </Text>
              </Heading>
              <Text color={'gray.100'} fontSize={'xl'}>
                Synergy Network is a next-generation blockchain platform featuring Proof of Synergy consensus and Post-Quantum Cryptography. Built for collaboration, security, and real-world utility.
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: 'column', sm: 'row' }}
              >
                <Button
                  as={RouterLink}
                  to="/ico-presale"
                  rounded={'full'}
                  size={'lg'}
                  fontWeight={'normal'}
                  px={6}
                  colorScheme={'white'}
                  bg={'white'}
                  color={'synergy.500'}
                  _hover={{ bg: 'gray.100' }}
                >
                  Join ICO Pre-sale
                </Button>
                <Button
                  as={RouterLink}
                  to="/docs"
                  rounded={'full'}
                  size={'lg'}
                  fontWeight={'normal'}
                  px={6}
                  colorScheme={'white'}
                  variant="outline"
                >
                  Learn More
                </Button>
              </Stack>
            </Stack>
            <Flex
              flex={1}
              justify={'center'}
              align={'center'}
              position={'relative'}
              w={'full'}
            >
              <Box
                position={'relative'}
                height={'300px'}
                rounded={'2xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}
                bg={'white'}
              >
                {/* Placeholder for network visualization */}
                <Box
                  bgGradient="radial(synergy.200, synergy.400)"
                  height={'100%'}
                  width={'100%'}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize="5xl"
                    fontWeight="bold"
                    color="white"
                  >
                    SYNERGY
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW={'7xl'}>
          <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
            <Heading fontSize={'3xl'}>Key Features</Heading>
            <Text color={'gray.600'} fontSize={'xl'}>
              Synergy Network combines innovative technology with practical utility
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} mt={10}>
            <Feature
              icon={<Icon as={FaUsers} w={10} h={10} />}
              title={'Proof of Synergy'}
              text={'A novel consensus mechanism that prioritizes collaboration over competition, forming dynamic validator clusters.'}
            />
            <Feature
              icon={<Icon as={FaShieldAlt} w={10} h={10} />}
              title={'Post-Quantum Security'}
              text={'Implemented with Dilithium-3 and Kyber algorithms to ensure security against quantum computing threats.'}
            />
            <Feature
              icon={<Icon as={FaNetworkWired} w={10} h={10} />}
              title={'Synergy Naming System'}
              text={'Human-readable addresses for easy interaction with the blockchain network.'}
            />
            <Feature
              icon={<Icon as={FaRocket} w={10} h={10} />}
              title={'High Performance'}
              text={'Processing 3,000-5,000 transactions per second with 2-3 second confirmation times.'}
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Token Economics Section */}
      <Box bg={'gray.50'} py={20}>
        <Container maxW={'7xl'}>
          <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={10}>
            <Heading fontSize={'3xl'}>Token Economics</Heading>
            <Text color={'gray.600'} fontSize={'xl'}>
              SYN token powers the entire Synergy Network ecosystem
            </Text>
          </Stack>

          <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" mb={10}>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={10}>
                <VStack align="center">
                  <Heading size="md" color="synergy.500">10B</Heading>
                  <Text textAlign="center">Total Supply</Text>
                </VStack>
                <VStack align="center">
                  <Heading size="md" color="synergy.500">50%</Heading>
                  <Text textAlign="center">Validator Rewards</Text>
                </VStack>
                <VStack align="center">
                  <Heading size="md" color="synergy.500">20%</Heading>
                  <Text textAlign="center">Ecosystem Development</Text>
                </VStack>
                <VStack align="center">
                  <Heading size="md" color="synergy.500">15%</Heading>
                  <Text textAlign="center">Public Sale</Text>
                </VStack>
                <VStack align="center">
                  <Heading size="md" color="synergy.500">15%</Heading>
                  <Text textAlign="center">Team & Reserve</Text>
                </VStack>
              </SimpleGrid>
            </CardBody>
          </Card>

          <HStack justify="center">
            <Button
              as={RouterLink}
              to="/ico-presale"
              rounded={'full'}
              px={6}
              colorScheme={'synergy'}
              bg={'synergy.500'}
              _hover={{ bg: 'synergy.600' }}
            >
              Participate in ICO Pre-sale
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Box py={20}>
        <Container maxW={'7xl'}>
          <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={10}>
            <Heading fontSize={'3xl'}>Real-World Use Cases</Heading>
            <Text color={'gray.600'} fontSize={'xl'}>
              Synergy Network enables numerous applications across industries
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" height="100%">
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md">Collaborative Content Creation</Heading>
                  <Text>Incentivize and reward collaboration in creative industries through transparent contribution tracking and fair reward distribution.</Text>
                </VStack>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" height="100%">
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md">Decentralized Finance</Heading>
                  <Text>Build DeFi applications with quantum-resistant security and collaborative validation for enhanced security and efficiency.</Text>
                </VStack>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" height="100%">
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md">Supply Chain Management</Heading>
                  <Text>Create transparent, collaborative supply chains with immutable record-keeping and incentivized participation.</Text>
                </VStack>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" height="100%">
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md">Decentralized Autonomous Organizations</Heading>
                  <Text>Form DAOs with enhanced governance mechanisms that reward constructive collaboration and consensus-building.</Text>
                </VStack>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" height="100%">
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md">Gaming and Digital Economies</Heading>
                  <Text>Power next-generation gaming experiences with collaborative gameplay mechanics and secure digital asset ownership.</Text>
                </VStack>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" height="100%">
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Heading size="md">Healthcare Data Sharing</Heading>
                  <Text>Enable secure, quantum-resistant sharing of sensitive healthcare data with privacy controls and incentivized collaboration.</Text>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box bg={'synergy.500'} color={'white'} py={10}>
        <Container maxW={'7xl'}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align={'center'} justify={'space-between'}>
            <Heading size="lg">Ready to join the Synergy Network?</Heading>
            <Button
              as={RouterLink}
              to="/ico-presale"
              rounded={'full'}
              px={6}
              colorScheme={'white'}
              bg={'white'}
              color={'synergy.500'}
              _hover={{ bg: 'gray.100' }}
              size="lg"
            >
              Join ICO Pre-sale
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
