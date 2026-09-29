import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiHeadphones, FiShield, FiTruck } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const shopLinks = [
  { title: "True Wireless Earbuds", path: "/earbuds" },
  { title: "Bluetooth Headphones", path: "/bluetoothHeadphone" },
  { title: "Wired Headphones", path: "/headphone" },
  { title: "Wireless Speakers", path: "/speaker" },
  { title: "Smart Watches", path: "/watch" },
];

const companyLinks = [
  { title: "About Musicose", path: "/about" },
  { title: "Shop All Products", path: "/" },
  { title: "My Cart", path: "/productCart" },
];

const serviceItems = [
  { title: "Free Shipping", text: "On selected products", icon: FiTruck },
  { title: "Secure Shopping", text: "Your payments are protected", icon: FiShield },
  { title: "Need Assistance?", text: "We are here to help", icon: FiHeadphones },
];

const socialIcons = [FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn];

const FooterLink = ({ path, children }) => (
  <ChakraLink
    as={RouterLink}
    to={path}
    color="gray.400"
    fontSize="sm"
    _hover={{ color: "red.300", textDecoration: "none" }}
  >
    {children}
  </ChakraLink>
);

const Footer = () => {
  return (
    <Box as="footer" mt={{ base: "10", md: "16" }} textAlign="left">
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        bg="red.500"
        color="white"
      >
        {serviceItems.map((item) => (
          <HStack
            key={item.title}
            justify="center"
            spacing="4"
            px="6"
            py={{ base: "4", md: "5" }}
            borderBottom={{ base: "1px solid", md: "none" }}
            borderRight={{ base: "none", md: "1px solid" }}
            borderColor="whiteAlpha.300"
          >
            <Icon as={item.icon} boxSize="25px" flexShrink="0" />
            <Box>
              <Text fontWeight="700">{item.title}</Text>
              <Text fontSize="xs" color="whiteAlpha.800">
                {item.text}
              </Text>
            </Box>
          </HStack>
        ))}
      </Grid>

      <Box bg="#111827" color="white">
        <Grid
          maxW="1400px"
          mx="auto"
          px={{ base: "5", md: "8" }}
          py={{ base: "10", md: "14" }}
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "2fr 1fr 1fr 1fr" }}
          gap={{ base: "9", md: "10" }}
        >
          <Stack spacing="5" gridColumn={{ base: "auto", sm: "1 / -1", lg: "auto" }}>
            <Image
              src="/musicose-logo-white.svg"
              alt="Musicose"
              w={{ base: "165px", md: "190px" }}
            />
            <Text maxW="480px" color="gray.400" fontSize="sm" lineHeight="tall">
              Discover powerful sound for every moment. Shop earbuds, headphones,
              speakers and smart watches selected for your everyday lifestyle.
            </Text>

            <Box maxW="470px">
              <Text mb="3" fontWeight="700">
                Get product updates and special offers
              </Text>
              <Flex gap="2" direction={{ base: "column", sm: "row" }}>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  bg="white"
                  color="gray.800"
                  border="none"
                  borderRadius="md"
                  _placeholder={{ color: "gray.500" }}
                />
                <Button colorScheme="red" px="7" flexShrink="0">
                  Subscribe
                </Button>
              </Flex>
            </Box>
          </Stack>

          <Stack spacing="3">
            <Text fontWeight="700" fontSize="md" color="white">
              Shop
            </Text>
            {shopLinks.map((item) => (
              <FooterLink key={item.path} path={item.path}>
                {item.title}
              </FooterLink>
            ))}
          </Stack>

          <Stack spacing="3">
            <Text fontWeight="700" fontSize="md" color="white">
              Company
            </Text>
            {companyLinks.map((item) => (
              <FooterLink key={item.title} path={item.path}>
                {item.title}
              </FooterLink>
            ))}
          </Stack>

          <Stack spacing="3">
            <Text fontWeight="700" fontSize="md" color="white">
              Help
            </Text>
            <Text color="gray.400" fontSize="sm">Shipping Information</Text>
            <Text color="gray.400" fontSize="sm">Returns &amp; Replacement</Text>
            <Text color="gray.400" fontSize="sm">Warranty Support</Text>
            <Text color="gray.400" fontSize="sm">Secure Payments</Text>
          </Stack>
        </Grid>

        <Divider maxW="1400px" mx="auto" borderColor="whiteAlpha.200" />

        <Flex
          maxW="1400px"
          mx="auto"
          px={{ base: "5", md: "8" }}
          py="6"
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap="5"
        >
          <HStack spacing="2">
            {socialIcons.map((SocialIcon, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxSize="36px"
                bg="whiteAlpha.100"
                borderRadius="full"
                color="gray.300"
                _hover={{ bg: "red.500", color: "white" }}
              >
                <Icon as={SocialIcon} boxSize="15px" />
              </Box>
            ))}
          </HStack>

          <HStack spacing="2" flexWrap="wrap">
            {['VISA', 'Mastercard', 'UPI', 'RuPay'].map((payment) => (
              <Text
                key={payment}
                px="3"
                py="1"
                bg="white"
                color="gray.700"
                borderRadius="md"
                fontSize="xs"
                fontWeight="700"
              >
                {payment}
              </Text>
            ))}
          </HStack>

          <Text color="gray.500" fontSize="xs">
            © {new Date().getFullYear()} Musicose. All rights reserved.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;