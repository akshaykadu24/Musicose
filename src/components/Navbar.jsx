import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "./Categories";
import { NavSlider } from "./NavSlider";
import { MobileSearch } from "./MobileSearch";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import { getSearchProducts } from "../redux/product/product.action";

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const searchData = useSelector((store) => store.productManager.searchData);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim()) {
      dispatch(getSearchProducts(value));
    }
  };

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      w="100%"
      bg="white"
      boxShadow="0 8px 24px rgba(15, 23, 42, 0.08)"
    >
      <Box
        h="32px"
        bg="#111827"
        color="white"
        px="4"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="sm"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        Great sound, better moments — free shipping on selected products
      </Box>

      <Flex
        w="100%"
        maxW="1400px"
        minH={{ base: "64px", md: "72px" }}
        mx="auto"
        px={{ base: "3", md: "6" }}
        align="center"
        gap={{ base: "2", lg: "6" }}
      >
        <Box display={{ base: "block", lg: "none" }} flexShrink="0">
          <NavSlider />
        </Box>

        <Box as={Link} to="/" flexShrink="0">
          <Image
            src="/musicose-logo.svg"
            alt="Musicose home"
            w={{ base: "120px", md: "170px" }}
            objectFit="contain"
          />
        </Box>

        <UnorderedList
          m="0"
          listStyleType="none"
          display={{ base: "none", lg: "block" }}
        >
          <HStack spacing="1">
            <ListItem
              position="relative"
              px="3"
              py="6"
              cursor="pointer"
              fontWeight="600"
              fontSize="sm"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
              _hover={{ color: "red.500" }}
            >
              Categories <ChevronDownIcon />
              {showCategories && <Categories />}
            </ListItem>
            <ListItem>
              <Box
                as={Link}
                to="/watch"
                display="block"
                px="3"
                py="6"
                fontWeight="600"
                fontSize="sm"
                _hover={{ color: "red.500" }}
              >
                Smart Watches
              </Box>
            </ListItem>
            <ListItem>
              <Box
                as={Link}
                to="/about"
                display="block"
                px="3"
                py="6"
                fontWeight="600"
                fontSize="sm"
                _hover={{ color: "red.500" }}
              >
                About
              </Box>
            </ListItem>
          </HStack>
        </UnorderedList>

        <Box flex="1" />

        <Box
          position="relative"
          w={{ lg: "240px", xl: "300px" }}
          display={{ base: "none", md: "block" }}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              value={searchValue}
              onChange={handleSearch}
              placeholder="Search products"
              bg="gray.100"
              border="1px solid"
              borderColor="transparent"
              borderRadius="full"
              _hover={{ bg: "gray.50", borderColor: "gray.200" }}
              _focus={{ bg: "white", borderColor: "red.400" }}
            />
          </InputGroup>

          {searchValue && Array.isArray(searchData) && searchData.length > 0 && (
            <Box
              position="absolute"
              top="48px"
              left="0"
              w="100%"
              maxH="340px"
              overflowY="auto"
              bg="white"
              borderRadius="lg"
              boxShadow="xl"
              border="1px solid"
              borderColor="gray.100"
              p="2"
            >
              {searchData.slice(0, 8).map((product) => (
                <Box
                  as={Link}
                  to={`/products/${product._id}`}
                  key={product._id}
                  display="flex"
                  alignItems="center"
                  gap="3"
                  p="2"
                  borderRadius="md"
                  textAlign="left"
                  onClick={() => setSearchValue("")}
                  _hover={{ bg: "gray.100" }}
                >
                  <Image
                    boxSize="44px"
                    objectFit="contain"
                    src={product.product_item__primary_image}
                    alt={product.product_item_meta__title}
                  />
                  <Text fontSize="sm" fontWeight="600" noOfLines={2}>
                    {product.product_item_meta__title}
                  </Text>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <HStack spacing={{ base: "1", md: "3" }} flexShrink="0">
          <Box display={{ base: "block", md: "none" }}>
            <MobileSearch />
          </Box>

          <Box display={{ base: "block", md: "none" }}>
            <Login iconOnly />
          </Box>

          <HStack
            display={{ base: "none", md: "flex" }}
            spacing="2"
            fontWeight="600"
            cursor="pointer"
          >
            <Box px="1" _hover={{ color: "red.500" }}>
              <Login />
            </Box>
            <Box
              bg="red.500"
              color="white"
              px="3"
              py="2"
              borderRadius="full"
              _hover={{ bg: "red.600" }}
            >
              <Signup />
            </Box>
          </HStack>

          <Box
            as={Link}
            to="/productCart"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxSize="40px"
            borderRadius="full"
            aria-label="Open cart"
            _hover={{ bg: "gray.100", color: "red.500" }}
          >
            <Icon as={FiShoppingBag} boxSize="24px" />
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;