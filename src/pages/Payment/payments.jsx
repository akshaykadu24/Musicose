import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Icon,
  Input,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiCreditCard, FiDollarSign, FiLock, FiMapPin, FiShoppingBag, FiSmartphone } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, getCartItems } from "../../redux/cart/cart.action";
import {
  clearCoupon,
  formatPrice,
  getCartTotals,
  getSavedAddress,
  getSavedCouponCode,
  ORDER_KEY,
} from "../../utils/cartTotals";

const methods = [
  { id: "card", label: "Credit / Debit card", icon: FiCreditCard },
  { id: "upi", label: "UPI", icon: FiSmartphone },
  { id: "cod", label: "Cash on delivery", icon: FiDollarSign },
];

const emptyCard = { name: "", number: "", expiry: "", cvv: "" };

// Card number shown in groups of 4: "1234 5678 9012 3456"
const formatCardNumber = (value) =>
  value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

// Expiry shown as "MM/YY"
const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

const isExpiryValid = (expiry) => {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(expiry);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  // A card is valid until the end of its expiry month
  return new Date(year, month, 1) > new Date();
};

const validate = (method, card, upiId) => {
  const errors = {};
  if (method === "card") {
    if (card.name.trim().length < 3) errors.name = "Enter the name on the card";
    if (card.number.replace(/\s/g, "").length !== 16) errors.number = "Enter a valid 16-digit card number";
    if (!isExpiryValid(card.expiry)) errors.expiry = "Enter a valid future date (MM/YY)";
    if (!/^\d{3}$/.test(card.cvv)) errors.cvv = "Enter the 3-digit CVV";
  }
  if (method === "upi" && !/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim())) {
    errors.upi = "Enter a valid UPI ID, e.g. name@okbank";
  }
  return errors;
};

const Payments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const items = useSelector((store) => store.cart.cart.products || []);
  const [loaded, setLoaded] = useState(false);
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState(emptyCard);
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [placing, setPlacing] = useState(false);

  const address = getSavedAddress();
  const totals = getCartTotals(items, getSavedCouponCode());

  useEffect(() => {
    dispatch(getCartItems()).finally(() => setLoaded(true));
  }, [dispatch]);

  const updateCard = (event) => {
    let { name, value } = event.target;
    if (name === "number") value = formatCardNumber(value);
    if (name === "expiry") value = formatExpiry(value);
    if (name === "cvv") value = value.replace(/\D/g, "").slice(0, 3);

    const updated = { ...card, [name]: value };
    setCard(updated);
    if (submitted) setErrors(validate(method, updated, upiId));
  };

  const changeMethod = (id) => {
    setMethod(id);
    setErrors({});
    setSubmitted(false);
  };

  const placeOrder = async () => {
    setSubmitted(true);
    const formErrors = validate(method, card, upiId);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setPlacing(true);

    // Demo only: wait a moment to simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const order = {
      id: `MSC${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      method: methods.find((item) => item.id === method).label,
      total: totals.total,
      saving: totals.totalSaving,
      itemCount: totals.itemCount,
      items: items.map((item) => ({
        title: item.product_item_meta__title,
        image: item.product_item__primary_image,
        quantity: Number(item.quantity) || 1,
      })),
      address,
    };

    const cleared = await dispatch(clearCart());
    setPlacing(false);

    if (!cleared) {
      toast({ title: "Could not place the order. Please try again.", status: "error", position: "top" });
      return;
    }

    // Card details are never saved; only the order summary is kept for the thank-you page
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    clearCoupon();
    navigate("/thanku", { replace: true });
  };

  if (!localStorage.getItem("token")) {
    return <Message title="Login to continue" text="Please login to complete your order." buttonText="Back to home" to="/" />;
  }

  if (!loaded) {
    return (
      <Box maxW="1200px" mx="auto" px={{ base: "4", md: "6" }} py="8">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 380px" }} gap="6">
          <Skeleton h="440px" borderRadius="xl" />
          <Skeleton h="300px" borderRadius="xl" />
        </Grid>
      </Box>
    );
  }

  if (items.length === 0) {
    return <Message title="Your cart is empty" text="Add some products to your cart before paying." buttonText="Start shopping" to="/" />;
  }

  if (!address) {
    return <Message title="Add a delivery address" text="Please add your delivery address before payment." buttonText="Go to checkout" to="/checkout" />;
  }

  return (
    <Box bg="#f8fafc" textAlign="left" minH="70vh">
      <Box maxW="1200px" mx="auto" px={{ base: "4", md: "6" }} py={{ base: "6", md: "10" }}>
        <HStack spacing="2" fontSize="sm" fontWeight="600" color="gray.400" mb={{ base: "5", md: "7" }}>
          <Text as={Link} to="/productCart" color="green.600">Cart</Text>
          <Text>—</Text>
          <Text as={Link} to="/checkout" color="green.600">Address</Text>
          <Text>—</Text>
          <Text color="red.500">Payment</Text>
        </HStack>

        <Grid templateColumns={{ base: "1fr", lg: "1fr 380px" }} gap={{ base: "5", lg: "8" }} alignItems="start">
          <Stack spacing="4">
            {/* Delivery address */}
            <Flex bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" boxShadow="sm" p="5" gap="3" align="flex-start">
              <Flex boxSize="40px" flexShrink="0" align="center" justify="center" bg="red.50" color="red.500" borderRadius="full">
                <Icon as={FiMapPin} />
              </Flex>
              <Box flex="1" minW="0">
                <Text fontWeight="700">Delivering to {address.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {address.address}, {address.city}, {address.state} - {address.pincode}
                </Text>
                <Text fontSize="sm" color="gray.600">Mobile: {address.phone}</Text>
              </Box>
              <Button as={Link} to="/checkout" size="sm" variant="ghost" colorScheme="red">
                Change
              </Button>
            </Flex>

            {/* Payment method */}
            <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" boxShadow="sm" p={{ base: "5", md: "7" }}>
              <Heading size="md" mb="4">Payment method</Heading>

              <SimpleGrid columns={{ base: 1, sm: 3 }} gap="3" mb="6">
                {methods.map((item) => {
                  const active = method === item.id;
                  return (
                    <Button
                      key={item.id}
                      onClick={() => changeMethod(item.id)}
                      h="auto"
                      py="4"
                      flexDirection={{ base: "row", sm: "column" }}
                      justifyContent={{ base: "flex-start", sm: "center" }}
                      gap="2"
                      bg={active ? "red.50" : "white"}
                      color={active ? "red.600" : "gray.700"}
                      border="2px solid"
                      borderColor={active ? "red.400" : "gray.100"}
                      borderRadius="lg"
                      fontSize="sm"
                      whiteSpace="normal"
                      aria-pressed={active}
                      _hover={{ borderColor: "red.300" }}
                    >
                      <Icon as={item.icon} boxSize="20px" />
                      {item.label}
                    </Button>
                  );
                })}
              </SimpleGrid>

              {method === "card" && (
                <Stack spacing="4">
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel fontSize="sm">Name on card</FormLabel>
                    <Input name="name" value={card.name} onChange={updateCard} placeholder="As printed on the card" autoComplete="cc-name" focusBorderColor="red.400" />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.number}>
                    <FormLabel fontSize="sm">Card number</FormLabel>
                    <Input name="number" value={card.number} onChange={updateCard} placeholder="1234 5678 9012 3456" inputMode="numeric" autoComplete="cc-number" focusBorderColor="red.400" />
                    <FormErrorMessage>{errors.number}</FormErrorMessage>
                  </FormControl>
                  <SimpleGrid columns={2} gap="4">
                    <FormControl isInvalid={!!errors.expiry}>
                      <FormLabel fontSize="sm">Expiry</FormLabel>
                      <Input name="expiry" value={card.expiry} onChange={updateCard} placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" focusBorderColor="red.400" />
                      <FormErrorMessage>{errors.expiry}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.cvv}>
                      <FormLabel fontSize="sm">CVV</FormLabel>
                      <Input name="cvv" type="password" value={card.cvv} onChange={updateCard} placeholder="•••" inputMode="numeric" autoComplete="cc-csc" focusBorderColor="red.400" />
                      <FormErrorMessage>{errors.cvv}</FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>
                </Stack>
              )}

              {method === "upi" && (
                <FormControl isInvalid={!!errors.upi}>
                  <FormLabel fontSize="sm">UPI ID</FormLabel>
                  <Input
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      if (submitted) setErrors(validate(method, card, e.target.value));
                    }}
                    placeholder="yourname@okbank"
                    focusBorderColor="red.400"
                  />
                  <FormErrorMessage>{errors.upi}</FormErrorMessage>
                </FormControl>
              )}

              {method === "cod" && (
                <Box bg="gray.50" borderRadius="lg" p="4" fontSize="sm" color="gray.600">
                  Pay with cash or UPI when your order is delivered.
                </Box>
              )}

              <Button
                mt="6"
                w="100%"
                size="lg"
                colorScheme="red"
                borderRadius="full"
                onClick={placeOrder}
                isLoading={placing}
                loadingText="Processing..."
              >
                {method === "cod" ? "Place order" : `Pay ${formatPrice(totals.total)}`}
              </Button>

              <HStack mt="3" justify="center" spacing="2" color="gray.500" fontSize="xs">
                <Icon as={FiLock} />
                <Text>Demo checkout. No real payment is made and card details are not stored.</Text>
              </HStack>
            </Box>
          </Stack>

          {/* Order summary */}
          <Box position={{ lg: "sticky" }} top={{ lg: "110px" }} bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" boxShadow="sm" p="5">
            <Heading size="md" mb="4">Order summary</Heading>
            <Stack spacing="2" fontSize="sm">
              <Flex justify="space-between">
                <Text color="gray.600">MRP ({totals.itemCount} items)</Text>
                <Text>{formatPrice(totals.mrpTotal)}</Text>
              </Flex>
              {totals.productDiscount > 0 && (
                <Flex justify="space-between">
                  <Text color="gray.600">Product discount</Text>
                  <Text color="green.600">- {formatPrice(totals.productDiscount)}</Text>
                </Flex>
              )}
              {totals.coupon && (
                <Flex justify="space-between">
                  <Text color="gray.600">Coupon ({totals.coupon.code})</Text>
                  <Text color="green.600">- {formatPrice(totals.couponDiscount)}</Text>
                </Flex>
              )}
              <Flex justify="space-between">
                <Text color="gray.600">Delivery</Text>
                <Text color="green.600">FREE</Text>
              </Flex>
              <Divider />
              <Flex justify="space-between" fontSize="md" fontWeight="800">
                <Text>Total</Text>
                <Text>{formatPrice(totals.total)}</Text>
              </Flex>
            </Stack>
            {totals.totalSaving > 0 && (
              <Box mt="4" py="2" px="3" bg="green.50" color="green.700" borderRadius="md" fontSize="sm" fontWeight="700">
                You save {formatPrice(totals.totalSaving)} on this order
              </Box>
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

const Message = ({ title, text, buttonText, to }) => (
  <Flex direction="column" align="center" textAlign="center" py={{ base: "16", md: "24" }} px="4">
    <Flex boxSize="88px" align="center" justify="center" bg="red.50" color="red.500" borderRadius="full">
      <Icon as={FiShoppingBag} boxSize="38px" />
    </Flex>
    <Heading mt="5" size="lg">{title}</Heading>
    <Text mt="2" color="gray.600" maxW="420px">{text}</Text>
    <Button as={Link} to={to} mt="6" colorScheme="red" borderRadius="full" px="8">
      {buttonText}
    </Button>
  </Flex>
);

export default Payments;
