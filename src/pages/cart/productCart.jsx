import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FiLock,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTag,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCart, getCartItems, updateCart } from "../../redux/cart/cart.action";
import {
  clearCoupon,
  COUPON_CODE,
  COUPON_PERCENT,
  formatPrice,
  getCartTotals,
  isCouponSaved,
  saveCoupon,
} from "../../utils/cartTotals";

const MAX_QUANTITY = 10;

const SummaryRow = ({ label, value, color, bold }) => (
  <Flex justify="space-between" fontSize={bold ? "md" : "sm"} fontWeight={bold ? "800" : "500"}>
    <Text color={bold ? "gray.900" : "gray.600"}>{label}</Text>
    <Text color={color || "gray.900"}>{value}</Text>
  </Flex>
);

const ProductCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const items = useSelector((store) => store.cart.cart.products || []);
  const loading = useSelector((store) => store.cart.loading);
  const [loaded, setLoaded] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(isCouponSaved);

  useEffect(() => {
    dispatch(getCartItems()).finally(() => setLoaded(true));
  }, [dispatch]);

  const changeQuantity = async (item, newQuantity) => {
    if (newQuantity < 1 || newQuantity > MAX_QUANTITY) return;
    setBusyId(item._id);
    await dispatch(updateCart(item._id, newQuantity));
    setBusyId(null);
  };

  const removeItem = async (item) => {
    setBusyId(item._id);
    await dispatch(deleteCart(item._id));
    setBusyId(null);
    toast({ title: "Removed from cart", status: "info", duration: 2000, position: "top" });
  };

  const applyCoupon = () => {
    if (couponInput.trim().toUpperCase() === COUPON_CODE) {
      setCouponApplied(true);
      saveCoupon();
      toast({ title: `${COUPON_PERCENT}% coupon applied`, status: "success", duration: 2500, position: "top" });
    } else {
      toast({ title: "Invalid coupon code", status: "error", duration: 2500, position: "top" });
    }
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setCouponInput("");
    clearCoupon();
  };

  const { itemCount, mrpTotal, productDiscount, couponDiscount, total, totalSaving } =
    getCartTotals(items, couponApplied);

  // Not logged in
  if (!localStorage.getItem("token")) {
    return (
      <EmptyState
        title="Login to see your cart"
        text="Your saved products will appear here after you login."
        buttonText="Continue shopping"
      />
    );
  }

  // First load
  if (!loaded && loading) {
    return (
      <Box maxW="1200px" mx="auto" px={{ base: "4", md: "6" }} py="8">
        <Skeleton h="36px" w="200px" mb="6" />
        <Grid templateColumns={{ base: "1fr", lg: "1fr 360px" }} gap="6">
          <Stack spacing="4">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} h="130px" borderRadius="xl" />
            ))}
          </Stack>
          <Skeleton h="320px" borderRadius="xl" />
        </Grid>
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        text="Looks like you haven't added anything yet. Explore our latest audio products and smart watches."
        buttonText="Start shopping"
      />
    );
  }

  return (
    <Box bg="#f8fafc" textAlign="left" minH="70vh">
      <Box maxW="1200px" mx="auto" px={{ base: "4", md: "6" }} py={{ base: "6", md: "10" }}>
        <HStack align="baseline" spacing="3" mb={{ base: "5", md: "7" }}>
          <Heading size={{ base: "lg", md: "xl" }}>My Cart</Heading>
          <Text color="gray.500">
            ({itemCount} {itemCount === 1 ? "item" : "items"})
          </Text>
        </HStack>

        <Grid templateColumns={{ base: "1fr", lg: "1fr 360px" }} gap={{ base: "5", lg: "8" }} alignItems="start">
          {/* Cart items */}
          <Stack spacing="3">
            {items.map((item) => {
              const price = Number(item.price) || 0;
              const mrp = Number(item.price2) || 0;
              const quantity = Number(item.quantity) || 1;
              const isBusy = busyId === item._id;
              const productLink = item.productId ? `/products/${item.productId}` : null;

              return (
                <Flex
                  key={item._id}
                  gap={{ base: "3", md: "5" }}
                  p={{ base: "3", md: "4" }}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.100"
                  borderRadius="xl"
                  boxShadow="sm"
                  opacity={isBusy ? 0.6 : 1}
                  transition="opacity 0.2s"
                >
                  <Box
                    as={productLink ? Link : "div"}
                    to={productLink || undefined}
                    w={{ base: "84px", md: "120px" }}
                    flexShrink="0"
                    bg="gray.50"
                    borderRadius="lg"
                    p="2"
                  >
                    <AspectRatio ratio={1}>
                      <Image
                        src={item.product_item__primary_image}
                        fallbackSrc="/musicose-mark.svg"
                        alt={item.product_item_meta__title}
                        objectFit="contain"
                      />
                    </AspectRatio>
                  </Box>

                  <Flex flex="1" direction="column" minW="0">
                    <Flex justify="space-between" gap="2">
                      <Text
                        as={productLink ? Link : "p"}
                        to={productLink || undefined}
                        fontWeight="700"
                        fontSize={{ base: "sm", md: "md" }}
                        noOfLines={2}
                        _hover={productLink ? { color: "red.500" } : undefined}
                      >
                        {item.product_item_meta__title}
                      </Text>
                      <IconButton
                        icon={<FiTrash2 />}
                        size="sm"
                        variant="ghost"
                        color="gray.400"
                        aria-label="Remove item"
                        isDisabled={isBusy}
                        onClick={() => removeItem(item)}
                        _hover={{ color: "red.500", bg: "red.50" }}
                      />
                    </Flex>

                    <HStack mt="1" spacing="2" align="baseline">
                      <Text fontWeight="800">{formatPrice(price)}</Text>
                      {mrp > price && (
                        <>
                          <Text fontSize="sm" color="gray.500" textDecoration="line-through">
                            {formatPrice(mrp)}
                          </Text>
                          <Badge colorScheme="green" fontSize="10px" borderRadius="md">
                            {Math.round(((mrp - price) * 100) / mrp)}% off
                          </Badge>
                        </>
                      )}
                    </HStack>

                    <Flex mt="auto" pt="3" justify="space-between" align="center">
                      <HStack
                        spacing="0"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="full"
                      >
                        <IconButton
                          icon={<FiMinus />}
                          size="sm"
                          variant="ghost"
                          borderRadius="full"
                          aria-label="Decrease quantity"
                          isDisabled={isBusy || quantity <= 1}
                          onClick={() => changeQuantity(item, quantity - 1)}
                        />
                        <Text w="32px" textAlign="center" fontWeight="700" fontSize="sm">
                          {quantity}
                        </Text>
                        <IconButton
                          icon={<FiPlus />}
                          size="sm"
                          variant="ghost"
                          borderRadius="full"
                          aria-label="Increase quantity"
                          isDisabled={isBusy || quantity >= MAX_QUANTITY}
                          onClick={() => changeQuantity(item, quantity + 1)}
                        />
                      </HStack>

                      <Text fontWeight="800" fontSize={{ base: "md", md: "lg" }}>
                        {formatPrice(price * quantity)}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}

            <Button
              as={Link}
              to="/"
              variant="ghost"
              alignSelf="flex-start"
              color="red.500"
              size="sm"
              leftIcon={<FiShoppingBag />}
            >
              Continue shopping
            </Button>
          </Stack>

          {/* Order summary */}
          <Stack spacing="4" position={{ lg: "sticky" }} top={{ lg: "110px" }}>
            <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" boxShadow="sm" p="5">
              <Heading size="md" mb="4">Order summary</Heading>
              <Stack spacing="3">
                <SummaryRow label={`MRP (${itemCount} items)`} value={formatPrice(mrpTotal)} />
                {productDiscount > 0 && (
                  <SummaryRow label="Product discount" value={`- ${formatPrice(productDiscount)}`} color="green.600" />
                )}
                {couponApplied && (
                  <SummaryRow label={`Coupon (${COUPON_CODE})`} value={`- ${formatPrice(couponDiscount)}`} color="green.600" />
                )}
                <SummaryRow label="Delivery" value="FREE" color="green.600" />
                <Divider />
                <SummaryRow label="Total" value={formatPrice(total)} bold />
              </Stack>

              {totalSaving > 0 && (
                <Box mt="4" py="2" px="3" bg="green.50" color="green.700" borderRadius="md" fontSize="sm" fontWeight="700">
                  You save {formatPrice(totalSaving)} on this order
                </Box>
              )}

              <Button
                mt="5"
                w="100%"
                size="lg"
                colorScheme="red"
                borderRadius="full"
                onClick={() => navigate("/checkout")}
              >
                Proceed to checkout
              </Button>

              <HStack mt="3" justify="center" spacing="2" color="gray.500" fontSize="xs">
                <Icon as={FiLock} />
                <Text>Safe and secure payments</Text>
              </HStack>
            </Box>

            <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" boxShadow="sm" p="5">
              <HStack mb="3" spacing="2">
                <Icon as={FiTag} color="red.500" />
                <Text fontWeight="700">Apply coupon</Text>
              </HStack>
              {couponApplied ? (
                <Flex justify="space-between" align="center" bg="green.50" p="3" borderRadius="md">
                  <Text fontSize="sm" fontWeight="700" color="green.700">
                    {COUPON_CODE} applied
                  </Text>
                  <Button size="xs" variant="ghost" colorScheme="red" onClick={removeCoupon}>
                    Remove
                  </Button>
                </Flex>
              ) : (
                <HStack>
                  <Input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                    placeholder="Enter coupon code"
                    borderRadius="full"
                    focusBorderColor="red.400"
                    textTransform="uppercase"
                  />
                  <Button onClick={applyCoupon} borderRadius="full" px="6" isDisabled={!couponInput.trim()}>
                    Apply
                  </Button>
                </HStack>
              )}
            </Box>

            <HStack bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" p="4" spacing="3">
              <Flex boxSize="36px" flexShrink="0" align="center" justify="center" bg="red.50" color="red.500" borderRadius="full">
                <Icon as={FiTruck} />
              </Flex>
              <Box>
                <Text fontSize="sm" fontWeight="700">Free delivery on every order</Text>
                <Text fontSize="xs" color="gray.500">Usually delivered in 5-7 days</Text>
              </Box>
            </HStack>
          </Stack>
        </Grid>
      </Box>
    </Box>
  );
};

const EmptyState = ({ title, text, buttonText }) => (
  <Flex direction="column" align="center" textAlign="center" py={{ base: "16", md: "24" }} px="4">
    <Flex boxSize="88px" align="center" justify="center" bg="red.50" color="red.500" borderRadius="full">
      <Icon as={FiShoppingBag} boxSize="38px" />
    </Flex>
    <Heading mt="5" size="lg">{title}</Heading>
    <Text mt="2" color="gray.600" maxW="420px">{text}</Text>
    <Button as={Link} to="/" mt="6" colorScheme="red" borderRadius="full" px="8">
      {buttonText}
    </Button>
  </Flex>
);

export default ProductCart;
