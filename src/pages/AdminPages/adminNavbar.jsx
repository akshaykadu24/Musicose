import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FiBox, FiHome, FiLogOut, FiPlusCircle, FiUser, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/authReducer/auth.action";

const AdminNavbar = () => {
  const { isAuth } = useSelector((store) => store.authManager);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    { title: "All Products", path: "/adminSideProducts", icon: FiBox },
    { title: "Add Product", path: "/adminAddProduct", icon: FiPlusCircle },
    { title: "All Users", path: "/alluser", icon: FiUsers },
    { title: "My Profile", path: "/user", icon: FiUser },
  ];

  const openStore = () => {
    navigate("/");
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
      bg="#111827"
      color="white"
      boxShadow="0 8px 24px rgba(15, 23, 42, 0.22)"
    >
      <Flex
        maxW="1400px"
        minH={{ base: "60px", md: "72px" }}
        mx="auto"
        px={{ base: "2", md: "6" }}
        align="center"
        gap={{ base: "1", md: "4" }}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon boxSize="22px" />}
            display={{ base: "flex", md: "none" }}
            variant="ghost"
            color="white"
            borderRadius="full"
            aria-label="Open admin menu"
            _hover={{ bg: "whiteAlpha.200" }}
            _active={{ bg: "whiteAlpha.300" }}
          />
          <MenuList color="gray.800" zIndex="1100">
            {links.map((item) => (
              <MenuItem
                as={NavLink}
                to={item.path}
                end
                key={item.path}
                icon={<Icon as={item.icon} />}
                _activeLink={{
                  bg: "red.50",
                  color: "red.600",
                  fontWeight: "700",
                }}
              >
                {item.title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Box as={Link} to="/" onClick={openStore} flexShrink="0">
          <Image
            src="/musicose-logo-white.svg"
            alt="Musicose home"
            w={{ base: "105px", md: "170px" }}
            objectFit="contain"
          />
        </Box>

        <HStack flex="1" spacing="1" display={{ base: "none", md: "flex" }}>
          {links.map((item) => (
            <Box
              as={NavLink}
              to={item.path}
              end
              key={item.path}
              display="flex"
              alignItems="center"
              gap="2"
              px="3"
              py="2"
              borderRadius="md"
              borderBottom="2px solid transparent"
              whiteSpace="nowrap"
              fontSize="sm"
              fontWeight="600"
              _hover={{ bg: "whiteAlpha.200", color: "red.300" }}
              _activeLink={{
                bg: "whiteAlpha.200",
                color: "red.300",
                borderColor: "red.400",
              }}
            >
              <Icon as={item.icon} />
              <Text>{item.title}</Text>
            </Box>
          ))}
        </HStack>

        <Box flex={{ base: "1", md: "0" }} />

        <IconButton
          icon={<FiHome />}
          display={{ base: "flex", lg: "none" }}
          variant="ghost"
          color="white"
          borderRadius="full"
          onClick={openStore}
          aria-label="Back to store"
          _hover={{ bg: "whiteAlpha.200" }}
        />
        <Button
          leftIcon={<FiHome />}
          display={{ base: "none", lg: "flex" }}
          variant="ghost"
          color="white"
          onClick={openStore}
          _hover={{ bg: "whiteAlpha.200" }}
        >
          Store
        </Button>

        {(isAuth || token) && (
          <>
            <IconButton
              icon={<FiLogOut />}
              display={{ base: "flex", lg: "none" }}
              colorScheme="red"
              borderRadius="full"
              onClick={handleLogout}
              aria-label="Logout"
            />
            <Button
              leftIcon={<FiLogOut />}
              display={{ base: "none", lg: "flex" }}
              colorScheme="red"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default AdminNavbar;