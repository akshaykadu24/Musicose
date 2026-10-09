import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useClipboard,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  FiAlertTriangle,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiCopy,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiTrash2,
  FiUserPlus,
  FiUsers,
  FiUser,
  FiX,
} from "react-icons/fi";
import { deleteUser, getUsers } from "../../redux/adminReducer/admin.action";
import { createdDate, formatDate } from "../../utils/dates";

const PAGE_SIZE = 10;

const ROLES = [
  { value: "all", label: "All users" },
  { value: "user", label: "Customers" },
  { value: "admin", label: "Admins" },
];

const SORTS = {
  newest: { label: "Newest first", fn: (a, b) => String(b._id).localeCompare(String(a._id)) },
  oldest: { label: "Oldest first", fn: (a, b) => String(a._id).localeCompare(String(b._id)) },
  name: { label: "Name: A to Z", fn: (a, b) => (a.name || "").localeCompare(b.name || "") },
};

const StatCard = ({ icon, label, value, accent }) => (
  <Flex bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" p={{ base: "4", md: "5" }} boxShadow="sm" align="center" gap="4">
    <Flex boxSize={{ base: "40px", md: "48px" }} flexShrink="0" align="center" justify="center" borderRadius="lg" bg={`${accent}.50`} color={`${accent}.500`}>
      <Icon as={icon} boxSize={{ base: "18px", md: "22px" }} />
    </Flex>
    <Box minW="0">
      <Text fontSize="xs" color="gray.500" fontWeight="600" textTransform="uppercase" letterSpacing="wide" noOfLines={1}>{label}</Text>
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="800" color="gray.900" lineHeight="short">{value}</Text>
    </Box>
  </Flex>
);

export const RoleBadge = ({ type }) =>
  type === "admin" ? (
    <Badge colorScheme="purple" variant="subtle" borderRadius="full" px="2.5" py="0.5" textTransform="none" fontSize="xs">
      <HStack spacing="1"><Icon as={FiShield} /><span>Admin</span></HStack>
    </Badge>
  ) : (
    <Badge colorScheme="blue" variant="subtle" borderRadius="full" px="2.5" py="0.5" textTransform="none" fontSize="xs">
      <HStack spacing="1"><Icon as={FiUser} /><span>Customer</span></HStack>
    </Badge>
  );

const UserIdentity = ({ el, isMe }) => (
  <HStack spacing="3" minW="0">
    <Avatar name={el.name || el.email} size="sm" bg={el.type === "admin" ? "purple.500" : "red.400"} color="white" />
    <Box minW="0">
      <HStack spacing="2">
        <Text fontWeight="700" fontSize="sm" color="gray.900" noOfLines={1}>{el.name || "Unnamed user"}</Text>
        {isMe && <Badge colorScheme="green" fontSize="9px" borderRadius="md">You</Badge>}
      </HStack>
      <Text fontSize="xs" color="gray.500" noOfLines={1}>{el.email}</Text>
    </Box>
  </HStack>
);

const CopyEmail = ({ email }) => {
  const { hasCopied, onCopy } = useClipboard(email || "");
  return (
    <Tooltip label={hasCopied ? "Copied!" : "Copy email"} hasArrow closeOnClick={false}>
      <IconButton
        icon={hasCopied ? <FiCheck /> : <FiCopy />}
        size="sm"
        variant="ghost"
        color={hasCopied ? "green.500" : "gray.600"}
        borderRadius="lg"
        aria-label="Copy email"
        onClick={onCopy}
        _hover={{ bg: "gray.100" }}
      />
    </Tooltip>
  );
};

const DeleteUser = ({ el, isMe, onDeleted, variant = "icon" }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const result = await dispatch(deleteUser(el._id));
    setDeleting(false);
    onClose();

    if (!result.ok) {
      toast({ title: "Delete failed", description: result.msg, status: "error", position: "top", duration: 3000 });
      return;
    }
    toast({ title: "User removed", description: el.email, status: "success", position: "top", duration: 2500 });
    onDeleted?.();
  };

  const label = isMe ? "You can't delete your own account" : "Delete user";

  return (
    <>
      {variant === "icon" ? (
        <Tooltip label={label} hasArrow>
          <IconButton
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            color="gray.600"
            borderRadius="lg"
            aria-label={label}
            isDisabled={isMe}
            onClick={onOpen}
            _hover={{ bg: "red.50", color: "red.600" }}
          />
        </Tooltip>
      ) : (
        <Button size="sm" leftIcon={<FiTrash2 />} variant="outline" colorScheme="red" borderRadius="lg" flex="1" isDisabled={isMe} onClick={onOpen}>
          {isMe ? "This is you" : "Delete"}
        </Button>
      )}

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay bg="blackAlpha.600" backdropFilter="blur(4px)">
          <AlertDialogContent mx="4" borderRadius="2xl">
            <AlertDialogHeader fontSize="lg" fontWeight="800">Delete user?</AlertDialogHeader>
            <AlertDialogBody>
              <Box p="3" bg="gray.50" borderRadius="lg" mb="3">
                <UserIdentity el={el} />
              </Box>
              <Text fontSize="sm" color="gray.600">
                This permanently removes the account. They won't be able to log in again with this email.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter gap="3">
              <Button ref={cancelRef} variant="ghost" borderRadius="lg" onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" borderRadius="lg" onClick={handleDelete} isLoading={deleting} loadingText="Deleting">
                Delete user
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, Loading, Error } = useSelector((store) => store.adminManager);
  const list = useMemo(() => (Array.isArray(users) ? users : []), [users]);
  const myId = JSON.parse(localStorage.getItem("user") || "null");

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const refresh = () => dispatch(getUsers());

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [search, role, sort]);

  const stats = useMemo(() => {
    const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return {
      total: list.length,
      customers: list.filter((u) => u.type !== "admin").length,
      admins: list.filter((u) => u.type === "admin").length,
      recent: list.filter((u) => (createdDate(u)?.getTime() || 0) >= monthAgo).length,
    };
  }, [list]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return list
      .filter((u) => role === "all" || (role === "admin" ? u.type === "admin" : u.type !== "admin"))
      .filter((u) =>
        !query ||
        (u.name || "").toLowerCase().includes(query) ||
        (u.email || "").toLowerCase().includes(query)
      )
      .sort(SORTS[sort].fn);
  }, [list, search, role, sort]);

  const roleCounts = { all: stats.total, user: stats.customers, admin: stats.admins };
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const firstLoad = Loading && list.length === 0;

  if (Error && list.length === 0) {
    return (
      <Flex direction="column" align="center" textAlign="center" py="24" px="4" bg="#f8fafc" minH="70vh">
        <Flex boxSize="80px" align="center" justify="center" bg="red.50" color="red.500" borderRadius="full">
          <Icon as={FiAlertTriangle} boxSize="34px" />
        </Flex>
        <Heading mt="5" size="lg">Couldn't load users</Heading>
        <Text mt="2" color="gray.600" maxW="420px">
          Your session may have expired or the server isn't responding. Try again, or log in again if it keeps failing.
        </Text>
        <Button mt="6" colorScheme="red" borderRadius="full" px="8" leftIcon={<FiRefreshCw />} onClick={refresh}>
          Try again
        </Button>
      </Flex>
    );
  }

  return (
    <Box bg="#f8fafc" minH="80vh" textAlign="left">
      <Box maxW="1400px" mx="auto" px={{ base: "4", md: "6" }} py={{ base: "6", md: "8" }}>
        {/* Header */}
        <Flex align={{ base: "flex-start", md: "center" }} justify="space-between" gap="4" direction={{ base: "column", md: "row" }} mb="6">
          <Box>
            <Text fontSize="sm" color="gray.500" fontWeight="600">Admin · People</Text>
            <Heading size="lg" color="gray.900">Users</Heading>
            <Text fontSize="sm" color="gray.500" mt="1">Everyone with a Musicose account — customers and admins.</Text>
          </Box>
          <Tooltip label="Refresh" hasArrow>
            <IconButton icon={<FiRefreshCw />} aria-label="Refresh users" variant="outline" bg="white" borderRadius="lg" isLoading={Loading} onClick={refresh} />
          </Tooltip>
        </Flex>

        {/* Stats */}
        <SimpleGrid columns={{ base: 2, lg: 4 }} gap={{ base: "3", md: "4" }} mb="6">
          {firstLoad ? (
            [1, 2, 3, 4].map((n) => <Skeleton key={n} h="88px" borderRadius="xl" />)
          ) : (
            <>
              <StatCard icon={FiUsers} label="Total users" value={stats.total} accent="red" />
              <StatCard icon={FiUser} label="Customers" value={stats.customers} accent="blue" />
              <StatCard icon={FiShield} label="Admins" value={stats.admins} accent="purple" />
              <StatCard icon={FiUserPlus} label="Joined in last 30 days" value={stats.recent} accent="green" />
            </>
          )}
        </SimpleGrid>

        {/* Toolbar + list */}
        <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" boxShadow="sm" overflow="hidden">
          <Stack spacing="4" p={{ base: "4", md: "5" }} borderBottom="1px solid" borderColor="gray.100">
            <Flex gap="3" direction={{ base: "column", md: "row" }}>
              <InputGroup flex="1">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or email"
                  borderRadius="lg"
                  bg="gray.50"
                  borderColor="gray.200"
                  focusBorderColor="red.400"
                />
                {search && (
                  <InputRightElement>
                    <IconButton icon={<FiX />} size="xs" variant="ghost" borderRadius="full" aria-label="Clear search" onClick={() => setSearch("")} />
                  </InputRightElement>
                )}
              </InputGroup>
              <Select value={sort} onChange={(e) => setSort(e.target.value)} w={{ base: "100%", md: "200px" }} borderRadius="lg" bg="gray.50" borderColor="gray.200" focusBorderColor="red.400">
                {Object.entries(SORTS).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </Select>
            </Flex>

            <HStack spacing="2" overflowX="auto" pb="1" sx={{ scrollbarWidth: "none" }}>
              {ROLES.map((r) => {
                const active = role === r.value;
                return (
                  <Button
                    key={r.value}
                    size="sm"
                    flexShrink="0"
                    borderRadius="full"
                    variant={active ? "solid" : "outline"}
                    bg={active ? "#111827" : "white"}
                    color={active ? "white" : "gray.600"}
                    borderColor="gray.200"
                    _hover={{ bg: active ? "#1f2937" : "gray.50" }}
                    onClick={() => setRole(r.value)}
                  >
                    {r.label}
                    <Box as="span" ml="2" px="1.5" borderRadius="full" fontSize="xs" bg={active ? "whiteAlpha.300" : "gray.100"}>
                      {roleCounts[r.value]}
                    </Box>
                  </Button>
                );
              })}
            </HStack>
          </Stack>

          {firstLoad ? (
            <Stack p="5" spacing="3">
              {[1, 2, 3, 4, 5].map((n) => <Skeleton key={n} h="56px" borderRadius="lg" />)}
            </Stack>
          ) : filtered.length === 0 ? (
            <Flex direction="column" align="center" textAlign="center" py="16" px="4">
              <Flex boxSize="64px" align="center" justify="center" bg="gray.100" color="gray.400" borderRadius="full">
                <Icon as={FiUsers} boxSize="28px" />
              </Flex>
              <Text mt="4" fontWeight="700">{list.length ? "No users match your filters" : "No users yet"}</Text>
              <Text mt="1" fontSize="sm" color="gray.500">
                {list.length ? "Try a different name, email or role." : "New sign-ups will appear here."}
              </Text>
              {list.length > 0 && (
                <Button mt="4" size="sm" variant="outline" borderRadius="lg" onClick={() => { setSearch(""); setRole("all"); }}>
                  Clear filters
                </Button>
              )}
            </Flex>
          ) : (
            <>
              {/* Desktop table */}
              <TableContainer display={{ base: "none", md: "block" }} whiteSpace="normal">
                <Table size="md">
                  <Thead bg="gray.50">
                    <Tr>
                      {["User", "Role", "Joined", "User ID"].map((h) => (
                        <Th key={h} color="gray.500" fontSize="xs" letterSpacing="wider" py="3">{h}</Th>
                      ))}
                      <Th color="gray.500" fontSize="xs" letterSpacing="wider" py="3" textAlign="right">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pageItems.map((el) => {
                      const isMe = el._id === myId;
                      return (
                        <Tr key={el._id} _hover={{ bg: "gray.50" }} transition="background 0.15s">
                          <Td py="3" maxW="360px"><UserIdentity el={el} isMe={isMe} /></Td>
                          <Td><RoleBadge type={el.type} /></Td>
                          <Td fontSize="sm" color="gray.600">{formatDate(createdDate(el))}</Td>
                          <Td>
                            <Text fontSize="xs" fontFamily="mono" color="gray.500" bg="gray.100" px="2" py="1" borderRadius="md" display="inline-block">
                              #{String(el._id).slice(-8)}
                            </Text>
                          </Td>
                          <Td textAlign="right">
                            <HStack spacing="1" justify="flex-end">
                              <CopyEmail email={el.email} />
                              <DeleteUser el={el} isMe={isMe} onDeleted={refresh} />
                            </HStack>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>

              {/* Mobile cards */}
              <Stack display={{ base: "flex", md: "none" }} spacing="3" p="4" bg="gray.50">
                {pageItems.map((el) => {
                  const isMe = el._id === myId;
                  return (
                    <Box key={el._id} bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" p="4" boxShadow="sm">
                      <Flex justify="space-between" align="flex-start" gap="2">
                        <UserIdentity el={el} isMe={isMe} />
                        <CopyEmail email={el.email} />
                      </Flex>
                      <HStack mt="3" spacing="3" fontSize="xs" color="gray.500">
                        <RoleBadge type={el.type} />
                        <Text>Joined {formatDate(createdDate(el))}</Text>
                      </HStack>
                      <HStack mt="3">
                        <DeleteUser el={el} isMe={isMe} onDeleted={refresh} variant="button" />
                      </HStack>
                    </Box>
                  );
                })}
              </Stack>

              {/* Pagination */}
              <Flex align="center" justify="space-between" gap="3" px={{ base: "4", md: "5" }} py="3" borderTop="1px solid" borderColor="gray.100" direction={{ base: "column", sm: "row" }}>
                <Text fontSize="sm" color="gray.500">
                  Showing <b>{(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)}</b> of <b>{filtered.length}</b> users
                </Text>
                <HStack spacing="1">
                  <IconButton icon={<FiChevronLeft />} size="sm" variant="outline" borderRadius="lg" aria-label="Previous page" isDisabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} />
                  {Array.from({ length: pageCount }, (_, i) => i + 1)
                    .filter((n) => n === 1 || n === pageCount || Math.abs(n - currentPage) <= 1)
                    .map((n, i, arr) => (
                      <HStack key={n} spacing="1">
                        {i > 0 && n - arr[i - 1] > 1 && <Text color="gray.400" px="1">…</Text>}
                        <Button
                          size="sm"
                          minW="32px"
                          borderRadius="lg"
                          variant={n === currentPage ? "solid" : "ghost"}
                          bg={n === currentPage ? "#111827" : undefined}
                          color={n === currentPage ? "white" : "gray.600"}
                          _hover={{ bg: n === currentPage ? "#1f2937" : "gray.100" }}
                          onClick={() => setPage(n)}
                        >
                          {n}
                        </Button>
                      </HStack>
                    ))}
                  <IconButton icon={<FiChevronRight />} size="sm" variant="outline" borderRadius="lg" aria-label="Next page" isDisabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} />
                </HStack>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AllUsers;
