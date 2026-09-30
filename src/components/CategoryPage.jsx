import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Skeleton,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  FiAward,
  FiSliders,
  FiStar,
  FiTrendingDown,
  FiTrendingUp,
  FiType,
} from "react-icons/fi";
import { useMemo, useState } from "react";
import { Products } from "./Carousal/Carousal/Products";

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 - ₹5,000", min: 2000, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: Infinity },
];

const sortOptions = [
  { value: "", label: "Featured", icon: FiStar },
  { value: "low", label: "Price: Low to High", icon: FiTrendingUp },
  { value: "high", label: "Price: High to Low", icon: FiTrendingDown },
  { value: "rating", label: "Top Rated", icon: FiAward },
  { value: "az", label: "Name: A to Z", icon: FiType },
];

const CategoryPage = ({ title, description, products = [], loading }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [range, setRange] = useState(priceRanges[0]);
  const selectedSort = sortOptions.find((option) => option.value === sort) || sortOptions[0];

  const visibleProducts = useMemo(() => {
    let list = products.filter((item) => {
      const price = Number(item.price) || 0;
      const name = (item.product_item_meta__title || "").toLowerCase();
      return (
        name.includes(search.trim().toLowerCase()) &&
        price >= range.min &&
        price <= range.max
      );
    });

    // Copy before sorting so the original list is not changed
    list = [...list];
    if (sort === "low") list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "high") list.sort((a, b) => Number(b.price) - Number(a.price));
    if (sort === "rating") list.sort((a, b) => Number(b.rating__stars) - Number(a.rating__stars));
    if (sort === "az") {
      list.sort((a, b) => a.product_item_meta__title.localeCompare(b.product_item_meta__title));
    }

    return list;
  }, [products, search, sort, range]);

  const clearFilters = () => {
    setSearch("");
    setSort("");
    setRange(priceRanges[0]);
  };

  return (
    <Box bg="#f8fafc" minH="70vh" textAlign="left">
      <Box bg="#111827" color="white" py={{ base: "8", md: "12" }}>
        <Box maxW="1400px" mx="auto" px={{ base: "4", md: "6" }}>
          <Heading size={{ base: "xl", md: "2xl" }}>{title}</Heading>
          <Text mt="2" color="gray.300" maxW="600px">
            {description}
          </Text>
        </Box>
      </Box>

      <Box maxW="1400px" mx="auto" px={{ base: "4", md: "6" }} py={{ base: "6", md: "8" }}>
        <Flex
          gap="3"
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "center" }}
          justify="space-between"
        >
          <InputGroup maxW={{ md: "340px" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search in ${title}`}
              bg="white"
              borderRadius="full"
              focusBorderColor="red.400"
            />
          </InputGroup>

          <Menu placement="bottom-end">
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              leftIcon={<Icon as={FiSliders} color="red.500" />}
              bg="white"
              border="1px solid"
              borderColor={sort ? "red.300" : "gray.200"}
              borderRadius="full"
              fontWeight="600"
              fontSize="sm"
              minW={{ md: "230px" }}
              textAlign="left"
              _hover={{ borderColor: "red.300" }}
              _active={{ bg: "gray.50" }}
            >
              <Text as="span" color="gray.500" fontWeight="500">
                Sort:{" "}
              </Text>
              {selectedSort.label}
            </MenuButton>
            <MenuList zIndex="20" borderRadius="xl" boxShadow="lg" p="2">
              {sortOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => setSort(option.value)}
                  icon={<Icon as={option.icon} />}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight={sort === option.value ? "700" : "500"}
                  color={sort === option.value ? "red.500" : "gray.700"}
                  bg={sort === option.value ? "red.50" : "transparent"}
                  _hover={{ bg: "gray.50" }}
                  command={sort === option.value ? "✓" : ""}
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>

        <Wrap mt="4" spacing="2">
          {priceRanges.map((item) => (
            <WrapItem key={item.label}>
              <Button
                size="sm"
                borderRadius="full"
                variant={range.label === item.label ? "solid" : "outline"}
                colorScheme={range.label === item.label ? "red" : "gray"}
                bg={range.label === item.label ? undefined : "white"}
                onClick={() => setRange(item)}
              >
                {item.label}
              </Button>
            </WrapItem>
          ))}
        </Wrap>

        <Text mt="5" mb="1" color="gray.600" fontSize="sm">
          {loading ? "Loading products..." : `${visibleProducts.length} products`}
        </Text>

        {loading ? (
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} gap={{ base: "3", md: "4" }} mt="2">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} h={{ base: "260px", md: "320px" }} borderRadius="xl" />
            ))}
          </SimpleGrid>
        ) : visibleProducts.length > 0 ? (
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} gap={{ base: "3", md: "4" }}>
            {visibleProducts.map((item) => (
              <Products key={item._id} product={item} />
            ))}
          </SimpleGrid>
        ) : (
          <Box mt="4" py="14" bg="white" borderRadius="xl" textAlign="center">
            <Text fontWeight="700">No products match your filters.</Text>
            <Button mt="4" size="sm" colorScheme="red" onClick={clearFilters}>
              Clear filters
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CategoryPage;
