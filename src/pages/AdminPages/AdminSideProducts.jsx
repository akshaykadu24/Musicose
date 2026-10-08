import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
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
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import {
  FiAlertTriangle,
  FiBox,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiPackage,
  FiPercent,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTag,
  FiX,
} from "react-icons/fi";
import { getProducts } from "../../redux/adminReducer/admin.action";
import AdminMapProductBox, { AdminProductCard } from "./AdminMapProductBox";
import { CATEGORIES } from "./updateProduct";
import { ButtonIconBadge, primaryButtonStyles } from "./adminButtonStyles";

const PAGE_SIZE = 10;

const SORTS = {
  newest: { label: "Newest first", fn: (a, b) => String(b._id).localeCompare(String(a._id)) },
  priceLow: { label: "Price: low to high", fn: (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0) },
  priceHigh: { label: "Price: high to low", fn: (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0) },
  name: { label: "Name: A to Z", fn: (a, b) => (a.product_item_meta__title || "").localeCompare(b.product_item_meta__title || "") },
};

const discountOf = (p) => {
  const offer = Number(p.price) || 0;
  const mrp = Number(p.price2) || 0;
  return mrp > offer && offer > 0 ? ((mrp - offer) * 100) / mrp : 0;
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

const AdminSideProducts = () => {
  const dispatch = useDispatch();
  const { products, Loading, Error } = useSelector((store) => store.adminManager);
  const list = Array.isArray(products) ? products : [];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const refresh = () => dispatch(getProducts());

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  const stats = useMemo(() => {
    const total = list.length;
    const categories = new Set(list.map((p) => p.category).filter(Boolean)).size;
    const avgPrice = total ? list.reduce((sum, p) => sum + (Number(p.price) || 0), 0) / total : 0;
    const discounted = list.filter((p) => discountOf(p) > 0);
    const avgDiscount = discounted.length
      ? discounted.reduce((sum, p) => sum + discountOf(p), 0) / discounted.length
      : 0;
    return { total, categories, avgPrice, avgDiscount };
  }, [list]);

  const categoryCounts = useMemo(
    () => list.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {}),
    [list]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return list
      .filter((p) => category === "all" || p.category === category)
      .filter((p) =>
        !query ||
        (p.product_item_meta__title || "").toLowerCase().includes(query) ||
        String(p._id).toLowerCase().includes(query)
      )
      .sort(SORTS[sort].fn);
  }, [list, search, category, sort]);

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
        <Heading mt="5" size="lg">Couldn't load products</Heading>
        <Text mt="2" color="gray.600" maxW="420px">
          The server didn't respond. Check that the backend is running, then try again.
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
            <Text fontSize="sm" color="gray.500" fontWeight="600">Admin · Catalogue</Text>
            <Heading size="lg" color="gray.900">Products</Heading>
            <Text fontSize="sm" color="gray.500" mt="1">Search, edit and manage every product listed in the store.</Text>
          </Box>
          <HStack spacing="2">
            <Tooltip label="Refresh" hasArrow>
              <IconButton
                icon={<FiRefreshCw />}
                aria-label="Refresh products"
                variant="outline"
                bg="white"
                borderRadius="lg"
                isLoading={Loading}
                onClick={refresh}
              />
            </Tooltip>
            <Button
              as={Link}
              to="/adminAddProduct"
              h="44px"
              px="5"
              leftIcon={<ButtonIconBadge><FiPlus size="15px" /></ButtonIconBadge>}
              {...primaryButtonStyles}
            >
              Add New Product
            </Button>
          </HStack>
        </Flex>

        {/* Stats */}
        <SimpleGrid columns={{ base: 2, lg: 4 }} gap={{ base: "3", md: "4" }} mb="6">
          {firstLoad ? (
            [1, 2, 3, 4].map((n) => <Skeleton key={n} h="88px" borderRadius="xl" />)
          ) : (
            <>
              <StatCard icon={FiPackage} label="Total products" value={stats.total} accent="red" />
              <StatCard icon={FiGrid} label="Categories" value={stats.categories} accent="purple" />
              <StatCard icon={FiTag} label="Avg. price" value={`₹${Math.round(stats.avgPrice).toLocaleString("en-IN")}`} accent="blue" />
              <StatCard icon={FiPercent} label="Avg. discount" value={`${Math.round(stats.avgDiscount)}%`} accent="green" />
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
                  placeholder="Search by product name or ID"
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
              <Select value={sort} onChange={(e) => setSort(e.target.value)} w={{ base: "100%", md: "220px" }} borderRadius="lg" bg="gray.50" borderColor="gray.200" focusBorderColor="red.400">
                {Object.entries(SORTS).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </Select>
            </Flex>

            <HStack spacing="2" overflowX="auto" pb="1" sx={{ scrollbarWidth: "none" }}>
              {[{ value: "all", label: "All" }, ...CATEGORIES].map((c) => {
                const active = category === c.value;
                const count = c.value === "all" ? list.length : categoryCounts[c.value] || 0;
                return (
                  <Button
                    key={c.value}
                    size="sm"
                    flexShrink="0"
                    borderRadius="full"
                    variant={active ? "solid" : "outline"}
                    bg={active ? "#111827" : "white"}
                    color={active ? "white" : "gray.600"}
                    borderColor="gray.200"
                    _hover={{ bg: active ? "#1f2937" : "gray.50" }}
                    onClick={() => setCategory(c.value)}
                  >
                    {c.label}
                    <Box as="span" ml="2" px="1.5" borderRadius="full" fontSize="xs" bg={active ? "whiteAlpha.300" : "gray.100"}>
                      {count}
                    </Box>
                  </Button>
                );
              })}
            </HStack>
          </Stack>

          {firstLoad ? (
            <Stack p="5" spacing="3">
              {[1, 2, 3, 4, 5].map((n) => <Skeleton key={n} h="64px" borderRadius="lg" />)}
            </Stack>
          ) : filtered.length === 0 ? (
            <Flex direction="column" align="center" textAlign="center" py="16" px="4">
              <Flex boxSize="64px" align="center" justify="center" bg="gray.100" color="gray.400" borderRadius="full">
                <Icon as={FiBox} boxSize="28px" />
              </Flex>
              <Text mt="4" fontWeight="700">{list.length ? "No products match your filters" : "No products yet"}</Text>
              <Text mt="1" fontSize="sm" color="gray.500">
                {list.length ? "Try a different search or category." : "Add your first product to get started."}
              </Text>
              {list.length ? (
                <Button mt="4" size="sm" variant="outline" borderRadius="lg" onClick={() => { setSearch(""); setCategory("all"); }}>
                  Clear filters
                </Button>
              ) : (
                <Button as={Link} to="/adminAddProduct" mt="4" h="40px" px="5" leftIcon={<ButtonIconBadge><FiPlus size="14px" /></ButtonIconBadge>} {...primaryButtonStyles}>
                  Add New Product
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
                      {["Product", "Category", "Price", "Key feature"].map((h) => (
                        <Th key={h} color="gray.500" fontSize="xs" letterSpacing="wider" py="3">{h}</Th>
                      ))}
                      <Th color="gray.500" fontSize="xs" letterSpacing="wider" py="3" textAlign="right">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pageItems.map((el) => (
                      <AdminMapProductBox key={el._id} el={el} onChange={refresh} />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              {/* Mobile cards */}
              <Stack display={{ base: "flex", md: "none" }} spacing="3" p="4" bg="gray.50">
                {pageItems.map((el) => (
                  <AdminProductCard key={el._id} el={el} onChange={refresh} />
                ))}
              </Stack>

              {/* Pagination */}
              <Flex align="center" justify="space-between" gap="3" px={{ base: "4", md: "5" }} py="3" borderTop="1px solid" borderColor="gray.100" direction={{ base: "column", sm: "row" }}>
                <Text fontSize="sm" color="gray.500">
                  Showing <b>{(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)}</b> of <b>{filtered.length}</b> products
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

export default AdminSideProducts;
