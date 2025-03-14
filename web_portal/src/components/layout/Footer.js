import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Flex,
  Divider,
  HStack,
  Icon
} from '@chakra-ui/react';
import { FaTwitter, FaGithub, FaDiscord, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW={'7xl'}
        py={6}
        spacing={4}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Stack direction={'row'} spacing={6}>
            <Link href={'#'}>Home</Link>
            <Link href={'#'}>About</Link>
            <Link href={'#'}>Blog</Link>
            <Link href={'#'}>Contact</Link>
          </Stack>
          <HStack spacing={6} mt={{ base: 4, md: 0 }}>
            <Link href={'#'} isExternal>
              <Icon as={FaTwitter} w={5} h={5} />
            </Link>
            <Link href={'#'} isExternal>
              <Icon as={FaGithub} w={5} h={5} />
            </Link>
            <Link href={'#'} isExternal>
              <Icon as={FaDiscord} w={5} h={5} />
            </Link>
            <Link href={'#'} isExternal>
              <Icon as={FaTelegram} w={5} h={5} />
            </Link>
          </HStack>
        </Flex>
        <Divider />
        <Text pt={2} fontSize={'sm'} textAlign={'center'}>
          © {new Date().getFullYear()} Synergy Network. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
