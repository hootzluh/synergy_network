import React from "react";
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Link,
    Image,
    useColorModeValue,
    useDisclosure,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import {AiOutlineMenu, AiOutlineClose, AiOutlineDown} from "react-icons/ai";
import {Link as RouterLink} from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const Links = [
    {name: "Home", path: "/"},
    {name: "ICO Pre-sale", path: "/ico-presale"},
    {name: "Dashboard", path: "/dashboard"},
    {name: "Explorer", path: "/explorer"},
    {name: "Wallet", path: "/wallet"},
    {name: "Docs", path: "/docs"},
];

const NavLink = ({children, path}) => {
  console.log("Rendering NavLink with children:", children);
  const bgHover = useColorModeValue("gray.200", "gray.700");
    return (
        <Link
            as={RouterLink}
            to={path}
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
                textDecoration: "none",
                bg: bgHover,
            }}
        >
            {children}
        </Link>
    );
};

export default function Navbar() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isWalletConnected, setIsWalletConnected] = React.useState(false);
    
    const handleConnectWallet = () => {
        setIsWalletConnected(true);
    };
    
    return (
        <Box className="glass-nav" px={4} boxShadow="sm">
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <IconButton
                    size={"md"}
                    icon={isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    aria-label={"Open Menu"}
                    display={{md: "none"}}
                    onClick={isOpen ? onClose : onOpen}
                    className="glass-button"
                />
                <HStack spacing={8} alignItems={"center"}>
                    <Box>
                        <RouterLink to="/">
                            <Flex align="center">
                                <Image src="/images/syn.png" alt="Synergy Network" height="40px" />
                                <Text
                                    ml={3}
                                    fontWeight="bold"
                                    fontSize="xl"
                                    bgGradient="linear(to-r, #1399FF, #0500A3)"
                                    bgClip="text"
                                >
                                    Synergy Network
                                </Text>
                            </Flex>
                        </RouterLink>
                    </Box>
                    <HStack as={"nav"} spacing={4} display={{base: "none", md: "flex"}}>
                        {Links.map((link) => (
                            <NavLink key={link.name} path={link.path}>
                                {link.name}
                            </NavLink>
                        ))}
                    </HStack>
                </HStack>
                <Flex alignItems={"center"}>
                    {/* Theme Toggle Button */}
                    <Box mr={3}>
                        <ThemeToggle />
                    </Box>
                    
                    {isWalletConnected ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={"full"}
                                variant={"link"}
                                cursor={"pointer"}
                                minW={0}
                                rightIcon={<AiOutlineDown />}
                                bgGradient="linear(to-r, #1399FF, #0500A3)"
                                color="white"
                                px={4}
                                py={2}
                                className="glass-button"
                            >
                                0x1a2...3b4c
                            </MenuButton>
                            <MenuList className="glass-dark">
                                <MenuItem>My Wallet</MenuItem>
                                <MenuItem>Transactions</MenuItem>
                                <MenuItem>Settings</MenuItem>
                                <MenuItem onClick={() => setIsWalletConnected(false)}>Disconnect</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Button
                            bgGradient="linear(to-r, #1399FF, #0500A3)"
                            color="white"
                            _hover={{
                                bgGradient: "linear(to-r, #1399FF, #0500A3)",
                                opacity: 0.9
                            }}
                            onClick={handleConnectWallet}
                            className="glass-button glow-effect"
                        >
                            Connect Wallet
                        </Button>
                    )}
                </Flex>
            </Flex>
            {isOpen ? (
                <Box pb={4} display={{md: "none"}}>
                    <Stack as={"nav"} spacing={4}>
                        {Links.map((link) => (
                            <NavLink key={link.name} path={link.path}>
                                {link.name}
                            </NavLink>
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
}
