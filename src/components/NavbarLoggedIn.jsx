import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "./Categories";
import { NavSlider } from "./NavSlider";
import { MobileSearch } from "./MobileSearch";
import { logoutAction } from "../redux/authReducer/auth.action";
import { getSearchProducts } from "../redux/product/product.action";
import { getCartItems } from "../redux/cart/cart.action";

function NavbarLoggedIn() {
  const [showCategories, setShowCategories] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchData = useSelector((store) => store.productManager.searchData);
  const cartProducts = useSelector((store) => store.cart.cart.products || []);
  const { type, name, user } = useSelector((store) => store.authManager);
  const localType = JSON.parse(localStorage.getItem("type"));
  const localName = JSON.parse(localStorage.getItem("name"));
  const userType = type || localType;
  const fullName = name || localName || "My Account";
  const userName = fullName.trim().split(" ")[0];
  const cartCount = cartProducts.length;

  useEffect(() => {
    dispatch(getCartItems(user));
  }, [dispatch, user]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim()) {
      dispatch(getSearchProducts(value));
    }
  };

  const openAdmin = () => {
    navigate("/adminSideProducts");
  };

  const handleLogout = () => {
    dispatch(logoutAction);
    navigate("/");
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
        <Text display={{ base: "block", md: "none" }} fontSize="xs">
          Welcome back — find your favorite sound
        </Text>
        <Text display={{ base: "none", md: "block" }} fontSize="sm">
          Welcome back, {userName} — find your next favorite sound
        </Text>
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

          <Menu>
            <MenuButton
              as={Box}
              cursor="pointer"
              p="2"
              borderRadius="full"
              _hover={{ bg: "gray.100" }}
            >
              <HStack spacing="2">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxSize="34px"
                  bg="red.50"
                  borderRadius="full"
                >
                  <Icon as={FiUser} boxSize="21px" color="red.500" />
                </Box>
                <Box display={{ base: "none", xl: "block" }}>
                  <Text
                    maxW="100px"
                    fontSize="sm"
                    fontWeight="600"
                    noOfLines={1}
                  >
                    {userName}
                  </Text>
                </Box>
                <ChevronDownIcon display={{ base: "none", md: "block" }} />
              </HStack>
            </MenuButton>
            <MenuList zIndex="1100">
              <MenuItem isDisabled fontWeight="600">
                {fullName}
              </MenuItem>
              {userType === "admin" && (
                <MenuItem onClick={openAdmin}>Open Admin Panel</MenuItem>
              )}
              <MenuItem onClick={handleLogout} color="red.500">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>

          <Box
            as={Link}
            to="/productCart"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxSize="40px"
            borderRadius="full"
            aria-label={`Open cart with ${cartCount} items`}
            _hover={{ bg: "gray.100", color: "red.500" }}
          >
            <Icon as={FiShoppingBag} boxSize="24px" />
            {cartCount > 0 && (
              <Badge
                position="absolute"
                top="-3px"
                right="-3px"
                minW="19px"
                h="19px"
                px="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="red.500"
                color="white"
                border="2px solid white"
                borderRadius="full"
                fontSize="10px"
                lineHeight="1"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </Badge>
            )}
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}

export default NavbarLoggedIn;