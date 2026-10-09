import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import {
  FiBox,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiCopy,
  FiHash,
  FiLogOut,
  FiMail,
  FiPlusCircle,
  FiShield,
  FiShoppingBag,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { getUsers } from "../../redux/adminReducer/admin.action";
import { logoutAction } from "../../redux/authReducer/auth.action";
import { createdDate, formatDate } from "../../utils/dates";
import { RoleBadge } from "./users";

const readLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
};

const DetailRow = ({ icon, label, value, copyValue, mono }) => {
  const { hasCopied, onCopy } = useClipboard(copyValue || "");
  return (
    <Flex align="center" gap="4" py="3.5" borderBottom="1px solid" borderColor="gray.100" _last={{ borderBottom: "none" }}>
      <Flex boxSize="38px" flexShrink="0" align="center" justify="center" bg="gray.50" color="gray.500" borderRadius="lg">
        <Icon as={icon} />
      </Flex>
      <Box flex="1" minW="0">
        <Text fontSize="xs" color="gray.500" fontWeight="600" textTransform="uppercase" letterSpacing="wide">{label}</Text>
        <Box fontSize="sm" fontWeight="600" color="gray.900" fontFamily={mono ? "mono" : undefined} noOfLines={1} wordBreak="break-all">
          {value}
        </Box>
      </Box>
      {copyValue && (
        <Tooltip label={hasCopied ? "Copied!" : `Copy ${label.toLowerCase()}`} hasArrow closeOnClick={false}>
          <IconButton
            icon={hasCopied ? <FiCheck /> : <FiCopy />}
            size="sm"
            variant="ghost"
            borderRadius="lg"
            color={hasCopied ? "green.500" : "gray.500"}
            aria-label={`Copy ${label}`}
            onClick={onCopy}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

const QuickLink = ({ to, icon, title, text, accent }) => (
  <Flex
    as={Link}
    to={to}
    align="center"
    gap="4"
    p="4"
    bg="white"
    border="1px solid"
    borderColor="gray.100"
    borderRadius="xl"
    boxShadow="sm"
    transition="all 0.2s"
    _hover={{ borderColor: `${accent}.200`, boxShadow: "md", transform: "translateY(-2px)" }}
  >
    <Flex boxSize="44px" flexShrink="0" align="center" justify="center" bg={`${accent}.50`} color={`${accent}.500`} borderRadius="lg">
      <Icon as={icon} boxSize="20px" />
    </Flex>
    <Box flex="1" minW="0">
      <Text fontWeight="700" fontSize="sm" color="gray.900">{title}</Text>
      <Text fontSize="xs" color="gray.500" noOfLines={1}>{text}</Text>
    </Box>
    <Icon as={FiChevronRight} color="gray.400" />
  </Flex>
);

const AdminUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, Loading } = useSelector((store) => store.adminManager);
  const { user } = useSelector((store) => store.authManager);
  const myId = user || readLocal("user");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const list = useMemo(() => (Array.isArray(users) ? users : []), [users]);
  const me = list.find((el) => el._id === myId);

  // Fall back to what was saved at login while the user list loads
  const profile = {
    name: me?.name || readLocal("name") || "Your account",
    email: me?.email,
    type: me?.type || readLocal("type") || "user",
    _id: me?._id || myId,
  };
  const isAdmin = profile.type === "admin";
  const memberSince = formatDate(createdDate(me || { _id: profile._id }));
  const loadingDetails = Loading && !me;

  const handleLogout = () => {
    dispatch(logoutAction);
    navigate("/");
  };

  const quickLinks = isAdmin
    ? [
        { to: "/adminSideProducts", icon: FiBox, title: "Manage products", text: "Edit, search and remove products", accent: "red" },
        { to: "/adminAddProduct", icon: FiPlusCircle, title: "Add a product", text: "List something new in the store", accent: "green" },
        { to: "/alluser", icon: FiUsers, title: "All users", text: `${list.length || "View"} registered accounts`, accent: "purple" },
        { to: "/", icon: FiShoppingBag, title: "Visit store", text: "See the shop as customers do", accent: "blue" },
      ]
    : [
        { to: "/productCart", icon: FiShoppingBag, title: "My cart", text: "Review items and check out", accent: "red" },
        { to: "/", icon: FiBox, title: "Continue shopping", text: "Explore the latest products", accent: "blue" },
      ];

  return (
    <Box bg="#f8fafc" minH="80vh" textAlign="left">
      {/* Cover */}
      <Box
        h={{ base: "140px", md: "190px" }}
        bg="linear-gradient(135deg, #111827 0%, #1f2937 55%, #7f1d1d 100%)"
        position="relative"
        overflow="hidden"
      >
        <Box position="absolute" top="-80px" right="-60px" boxSize="260px" borderRadius="full" bg="red.500" opacity="0.25" filter="blur(60px)" />
        <Box position="absolute" bottom="-90px" left="10%" boxSize="200px" borderRadius="full" bg="purple.500" opacity="0.15" filter="blur(60px)" />
      </Box>

      <Box maxW="1100px" mx="auto" px={{ base: "4", md: "6" }} pb="12">
        {/* Identity card */}
        <Flex
          mt={{ base: "-60px", md: "-80px" }}
          position="relative"
          bg="white"
          borderRadius="2xl"
          boxShadow="0 20px 50px rgba(15, 23, 42, 0.12)"
          p={{ base: "5", md: "7" }}
          gap={{ base: "4", md: "6" }}
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "center" }}
          textAlign={{ base: "center", md: "left" }}
        >
          {loadingDetails ? (
            <SkeletonCircle size="28" />
          ) : (
            <Avatar
              name={profile.name}
              size="2xl"
              bg={isAdmin ? "purple.500" : "red.400"}
              color="white"
              border="5px solid white"
              boxShadow="lg"
              mt={{ base: "-70px", md: "0" }}
            />
          )}
          <Box flex="1" minW="0">
            <Stack direction={{ base: "column", md: "row" }} align="center" spacing="3" justify={{ base: "center", md: "flex-start" }}>
              <Heading size="lg" color="gray.900" noOfLines={1}>{profile.name}</Heading>
              <RoleBadge type={profile.type} />
            </Stack>
            {loadingDetails ? (
              <Skeleton h="16px" w="220px" mt="2" mx={{ base: "auto", md: "0" }} />
            ) : (
              <Text color="gray.500" mt="1">{profile.email || "Email unavailable"}</Text>
            )}
            <HStack mt="3" spacing="4" fontSize="sm" color="gray.500" justify={{ base: "center", md: "flex-start" }}>
              <HStack spacing="1.5"><Icon as={FiCalendar} /><Text>Member since {memberSince}</Text></HStack>
            </HStack>
          </Box>
          <Button
            leftIcon={<FiLogOut />}
            variant="outline"
            colorScheme="red"
            borderRadius="xl"
            w={{ base: "100%", md: "auto" }}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Flex>

        <Grid templateColumns={{ base: "1fr", lg: "1.2fr 1fr" }} gap="6" mt="6" alignItems="start">
          {/* Account details */}
          <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" boxShadow="sm" p={{ base: "5", md: "6" }}>
            <Heading size="sm" color="gray.900">Account details</Heading>
            <Text fontSize="sm" color="gray.500" mb="2">The information linked to your Musicose login.</Text>
            {loadingDetails ? (
              <Stack spacing="4" mt="4">
                {[1, 2, 3, 4, 5].map((n) => <Skeleton key={n} h="44px" borderRadius="lg" />)}
              </Stack>
            ) : (
              <Box>
                <DetailRow icon={FiUser} label="Full name" value={profile.name} />
                <DetailRow icon={FiMail} label="Email" value={profile.email || "—"} copyValue={profile.email} />
                <DetailRow icon={FiShield} label="Role" value={<RoleBadge type={profile.type} />} />
                <DetailRow icon={FiCalendar} label="Member since" value={memberSince} />
                <DetailRow icon={FiHash} label="User ID" value={profile._id || "—"} copyValue={profile._id} mono />
              </Box>
            )}
          </Box>

          {/* Quick actions */}
          <Stack spacing="3">
            <Box>
              <Heading size="sm" color="gray.900">{isAdmin ? "Admin shortcuts" : "Quick links"}</Heading>
              <Text fontSize="sm" color="gray.500">Jump straight to what you need.</Text>
            </Box>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 1 }} gap="3">
              {quickLinks.map((item) => (
                <QuickLink key={item.to} {...item} />
              ))}
            </SimpleGrid>
          </Stack>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminUser;
