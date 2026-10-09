import {
  AspectRatio,
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiZap,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Products } from "../../components/Carousal/Carousal/Products";
import { Ratings } from "../../components/Carousal/Carousal/Ratings";
import { addCart } from "../../redux/cart/cart.action";
import { getSingleData } from "../../redux/product/product.action";

const categoryInfo = {
  earbud: { name: "Earbuds", path: "/earbuds" },
  headphone: { name: "Wired Headphones", path: "/headphone" },
  bluetoothHeadphone: { name: "Bluetooth Headphones", path: "/bluetoothHeadphone" },
  speaker: { name: "Speakers", path: "/speaker" },
  watch: { name: "Smart Watches", path: "/watch" },
};

const services = [
  { icon: FiTruck, title: "Free delivery", text: "Delivered within 5-7 days" },
  { icon: FiShield, title: "1 year warranty", text: "On all Musicose products" },
  { icon: FiRefreshCw, title: "7 day replacement", text: "Easy, no questions asked" },
];

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const product = useSelector((store) => store.productManager.product) || {};
  const loading = useSelector((store) => store.productManager.loading);
  const [requestedId, setRequestedId] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState(null);
  const [related, setRelated] = useState([]);

  // The store may still hold the previous product while the new one loads
  const isCurrent = product._id === id;
  const isLoading = !isCurrent && (loading || requestedId !== id);
  const notFound = !isCurrent && !isLoading;

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage("");
    setPincode("");
    setPincodeMessage(null);
    setRelated([]);
    dispatch(getSingleData(id));
    setRequestedId(id);
  }, [dispatch, id]);

  useEffect(() => {
    if (!isCurrent || !product.category) return;

    axios
      .get(`${process.env.REACT_APP_MUSICOSE_API}/products`)
      .then((res) => {
        const sameCategory = (res.data.products || []).filter(
          (item) => item.category === product.category && item._id !== product._id
        );
        setRelated(sameCategory.slice(0, 5));
      })
      .catch(() => setRelated([]));
  }, [isCurrent, product._id, product.category]);

  const offerPrice = Number(product.price) || 0;
  const mrp = Number(product.price2) || 0;
  const saving = mrp > offerPrice ? mrp - offerPrice : 0;
  const discount = saving > 0 ? Math.round((saving * 100) / mrp) : 0;
  const images = [product.product_item__primary_image, product.product_item__secondary_image].filter(Boolean);
  const mainImage = activeImage || images[0];
  const features = [product.feature, product.feature2, product.feature3].filter(Boolean);
  const hasRating = Number(product.rating__stars) > 0;
  const reviews = (product.rating__caption || "").replace(/reviews?/i, "").trim();
  const category = categoryInfo[product.category];

  const addToCart = () => {
    if (!localStorage.getItem("token")) {
      toast({ title: "Please login to add products to cart", status: "warning", position: "top" });
      return false;
    }

    dispatch(addCart(product));
    toast({ title: "Added to cart", status: "success", duration: 2000, position: "top" });
    return true;
  };

  const buyNow = () => {
    if (addToCart()) navigate("/productCart");
  };

  const checkPincode = () => {
    if (/^[1-9][0-9]{5}$/.test(pincode)) {
      setPincodeMessage({ ok: true, text: "Delivery available. Expected in 5-7 days." });
    } else {
      setPincodeMessage({ ok: false, text: "Please enter a valid 6-digit pincode." });
    }
  };

  if (isLoading) {
    return (
      <Box maxW="1400px" mx="auto" px={{ base: "4", md: "6" }} py="8">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="10">
          <Skeleton h={{ base: "320px", md: "480px" }} borderRadius="2xl" />
          <Stack spacing="4">
            <Skeleton h="36px" w="70%" />
            <Skeleton h="20px" w="40%" />
            <Skeleton h="44px" w="50%" />
            <Skeleton h="120px" />
            <Skeleton h="48px" />
          </Stack>
        </Grid>
      </Box>
    );
  }

  if (notFound) {
    return (
      <Box py="20" px="4" textAlign="center">
        <Heading size="lg">Product not found</Heading>
        <Text mt="2" color="gray.600">This product may have been removed or the link is incorrect.</Text>
        <Button as={Link} to="/" mt="6" colorScheme="red" borderRadius="full">
          Back to home
        </Button>
      </Box>
    );
  }

  return (
    <Box bg="#f8fafc" textAlign="left">
      <Box maxW="1400px" mx="auto" px={{ base: "4", md: "6" }} py={{ base: "5", md: "8" }}>
        <Breadcrumb
          spacing="1"
          separator={<ChevronRightIcon color="gray.400" />}
          fontSize="sm"
          color="gray.500"
          mb={{ base: "4", md: "6" }}
          maxW="1150px"
          mx="auto"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={category.path}>{category.name}</BreadcrumbLink>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem isCurrentPage>
            <Text as="span" color="gray.800" noOfLines={1}>
              {product.product_item_meta__title}
            </Text>
          </BreadcrumbItem>
        </Breadcrumb>

        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(0, 500px) 1fr" }}
          gap={{ base: "6", lg: "14" }}
          maxW="1150px"
          mx="auto"
        >
          {/* Image gallery */}
          <Box position={{ lg: "sticky" }} top={{ lg: "110px" }} alignSelf="start">
            <Box position="relative" bg="white" borderRadius="2xl" border="1px solid" borderColor="gray.100" p={{ base: "6", md: "8", lg: "10" }} maxW={{ base: "460px", lg: "none" }} mx="auto">
              <AspectRatio ratio={1}>
                <Image
                  src={mainImage}
                  fallbackSrc="/musicose-mark.svg"
                  alt={product.product_item_meta__title}
                  objectFit="contain"
                />
              </AspectRatio>
              {discount > 0 && (
                <Badge position="absolute" top="4" left="4" colorScheme="red" borderRadius="full" px="3" py="1" fontSize="sm">
                  {discount}% off
                </Badge>
              )}
            </Box>

            {images.length > 1 && (
              <HStack mt="3" spacing="3">
                {images.map((image) => (
                  <Box
                    as="button"
                    key={image}
                    onClick={() => setActiveImage(image)}
                    w="76px"
                    p="2"
                    bg="white"
                    borderRadius="lg"
                    border="2px solid"
                    borderColor={mainImage === image ? "red.400" : "gray.100"}
                    aria-label="Show product image"
                    _hover={{ borderColor: "red.300" }}
                  >
                    <AspectRatio ratio={1}>
                      <Image src={image} alt="" objectFit="contain" />
                    </AspectRatio>
                  </Box>
                ))}
              </HStack>
            )}
          </Box>

          {/* Product details */}
          <Stack spacing="5">
            <Box>
              {category && (
                <Text color="red.500" fontSize="sm" fontWeight="700" textTransform="uppercase" letterSpacing="wide">
                  {category.name}
                </Text>
              )}
              <Heading mt="1" size={{ base: "lg", md: "xl" }} lineHeight="short">
                {product.product_item_meta__title}
              </Heading>
              <HStack mt="3" spacing="2">
                {hasRating ? (
                  <>
                    <Ratings rating={product.rating__stars} />
                    {reviews && <Text fontSize="sm" color="gray.500">| {reviews} reviews</Text>}
                  </>
                ) : (
                  <Badge colorScheme="green" borderRadius="full" px="2">New arrival</Badge>
                )}
              </HStack>
            </Box>

            <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p="5">
              <HStack align="baseline" spacing="3" flexWrap="wrap">
                <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" color="gray.900">
                  ₹{offerPrice.toLocaleString("en-IN")}
                </Text>
                {saving > 0 && (
                  <>
                    <Text fontSize="lg" color="gray.500" textDecoration="line-through">
                      ₹{mrp.toLocaleString("en-IN")}
                    </Text>
                    <Badge colorScheme="red" fontSize="sm" borderRadius="md">{discount}% off</Badge>
                  </>
                )}
              </HStack>
              {saving > 0 && (
                <Text mt="1" color="green.600" fontWeight="700" fontSize="sm">
                  You save ₹{saving.toLocaleString("en-IN")}
                </Text>
              )}
              <Text mt="1" color="gray.500" fontSize="xs">Inclusive of all taxes</Text>
            </Box>

            {features.length > 0 && (
              <Box>
                <Text fontWeight="700" mb="2">Key features</Text>
                <List spacing="2">
                  {features.map((item) => (
                    <ListItem key={item} display="flex" alignItems="center" fontSize="sm" color="gray.700">
                      <ListIcon as={FiCheckCircle} color="green.500" />
                      {item}
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            <Flex gap="3" display={{ base: "none", md: "flex" }}>
              <Button
                flex="1"
                size="lg"
                colorScheme="red"
                variant="outline"
                borderRadius="full"
                leftIcon={<FiShoppingBag />}
                onClick={addToCart}
              >
                Add to cart
              </Button>
              <Button
                flex="1"
                size="lg"
                colorScheme="red"
                borderRadius="full"
                leftIcon={<FiZap />}
                onClick={buyNow}
              >
                Buy now
              </Button>
            </Flex>

            <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p="5">
              <Text fontWeight="700" mb="3">Check delivery</Text>
              <HStack>
                <Input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  onKeyDown={(e) => e.key === "Enter" && checkPincode()}
                  placeholder="Enter pincode"
                  inputMode="numeric"
                  focusBorderColor="red.400"
                  borderRadius="full"
                />
                <Button onClick={checkPincode} borderRadius="full" px="6">
                  Check
                </Button>
              </HStack>
              {pincodeMessage && (
                <Text mt="2" fontSize="sm" color={pincodeMessage.ok ? "green.600" : "red.500"}>
                  {pincodeMessage.text}
                </Text>
              )}

              <Divider my="4" />

              <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4">
                {services.map((item) => (
                  <HStack key={item.title} align="flex-start" spacing="3">
                    <Flex boxSize="36px" flexShrink="0" align="center" justify="center" bg="red.50" color="red.500" borderRadius="full">
                      <Icon as={item.icon} />
                    </Flex>
                    <Box>
                      <Text fontSize="sm" fontWeight="700">{item.title}</Text>
                      <Text fontSize="xs" color="gray.500">{item.text}</Text>
                    </Box>
                  </HStack>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </Grid>

        {related.length > 0 && (
          <Box mt={{ base: "12", md: "16" }}>
            <Flex align="flex-end" justify="space-between" mb="4">
              <Heading size={{ base: "md", md: "lg" }}>You may also like</Heading>
              {category && (
                <Text as={Link} to={category.path} color="red.500" fontSize="sm" fontWeight="700">
                  View all
                </Text>
              )}
            </Flex>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} gap={{ base: "3", md: "4" }}>
              {related.map((item) => (
                <Products key={item._id} product={item} />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Box>

      {/* Mobile: buttons stay at the bottom of the screen while scrolling */}
      <HStack
        display={{ base: "flex", md: "none" }}
        position="sticky"
        bottom="0"
        zIndex="100"
        spacing="3"
        px="4"
        py="3"
        bg="white"
        borderTop="1px solid"
        borderColor="gray.100"
        boxShadow="0 -6px 20px rgba(15, 23, 42, 0.08)"
      >
        <Box flexShrink="0" minW="76px" lineHeight="1.2">
          <HStack spacing="1.5" align="baseline">
            <Text fontSize="lg" fontWeight="800">
              ₹{offerPrice.toLocaleString("en-IN")}
            </Text>
            {saving > 0 && (
              <Text fontSize="xs" color="gray.500" textDecoration="line-through">
                ₹{mrp.toLocaleString("en-IN")}
              </Text>
            )}
          </HStack>
          {saving > 0 && (
            <Text fontSize="11px" color="green.600" fontWeight="700" whiteSpace="nowrap">
              You save ₹{saving.toLocaleString("en-IN")}
            </Text>
          )}
        </Box>
        <Button
          flex="1"
          h="44px"
          colorScheme="red"
          variant="outline"
          borderRadius="full"
          fontSize="sm"
          px="2"
          leftIcon={<FiShoppingBag />}
          onClick={addToCart}
        >
          Add to cart
        </Button>
        <Button
          flex="1"
          h="44px"
          colorScheme="red"
          borderRadius="full"
          fontSize="sm"
          px="2"
          leftIcon={<FiZap />}
          onClick={buyNow}
        >
          Buy now
        </Button>
      </HStack>
    </Box>
  );
};

export default SingleProduct;
