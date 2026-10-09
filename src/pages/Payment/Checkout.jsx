import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiLock, FiMapPin, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems } from "../../redux/cart/cart.action";
import { ADDRESS_KEY, formatPrice, getCartTotals, getSavedCouponCode } from "../../utils/cartTotals";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
  "Lakshadweep", "Puducherry",
];

const emptyAddress = { name: "", phone: "", address: "", city: "", state: "", pincode: "" };

const Steps = () => (
  <HStack spacing="2" fontSize="sm" fontWeight="600" color="gray.400" mb={{ base: "5", md: "7" }}>
    <Text as={Link} to="/productCart" color="green.600">Cart</Text>
    <Text>—</Text>
    <Text color="red.500">Address</Text>
    <Text>—</Text>
    <Text>Payment</Text>
  </HStack>
);

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const items = useSelector((store) => store.cart.cart.products || []);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState(() => {
    try {
      return { ...emptyAddress, ...JSON.parse(sessionStorage.getItem(ADDRESS_KEY)) };
    } catch (error) {
      return emptyAddress;
    }
  });

  const totals = getCartTotals(items, getSavedCouponCode());

  useEffect(() => {
    dispatch(getCartItems()).finally(() => setLoaded(true));
  }, [dispatch]);

  const handleChange = (event) => {
    let { name, value } = event.target;
    // Allow only numbers in phone and pincode
    if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    if (name === "pincode") value = value.replace(/\D/g, "").slice(0, 6);

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem(ADDRESS_KEY, JSON.stringify(form));
    toast({ title: "Address saved", status: "success", duration: 2000, position: "top" });
    navigate("/payment");
  };

  if (!localStorage.getItem("token")) {
    return (
      <Message
        title="Login to checkout"
        text="Please login to continue with your order."
        buttonText="Back to home"
        to="/"
      />
    );
  }

  if (!loaded) {
    return (
      <Box maxW="1200px" mx="auto" px={{ base: "4", md: "6" }} py="8">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 380px" }} gap="6">
          <Skeleton h="480px" borderRadius="xl" />
          <Skeleton h="360px" borderRadius="xl" />
        </Grid>
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Message
        title="Your cart is empty"
        text="Add some products to your cart before checking out."
        buttonText="Start shopping"
        to="/"
      />
    );
  }

  return (
    <Box bg="#f8fafc" textAlign="left" minH="70vh">
      <Box maxW="1200px" mx="auto" px={{ base: "4", md: "6" }} py={{ base: "6", md: "10" }}>
        <Steps />

        <Grid templateColumns={{ base: "1fr", lg: "1fr 380px" }} gap={{ base: "5", lg: "8" }} alignItems="start">
          {/* Address form */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            noValidate
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="xl"
            boxShadow="sm"
            p={{ base: "5", md: "7" }}
          >
            <HStack spacing="3" mb="6">
              <Flex boxSize="40px" align="center" justify="center" bg="red.50" color="red.500" borderRadius="full">
                <Icon as={FiMapPin} />
              </Flex>
              <Box>
                <Heading size="md">Delivery address</Heading>
                <Text fontSize="sm" color="gray.500">Where should we deliver your order?</Text>
              </Box>
            </HStack>

            <Stack spacing="4">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                <FormControl>
                  <FormLabel fontSize="sm">Full name</FormLabel>
                  <Input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" autoComplete="name" focusBorderColor="red.400" />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Mobile number</FormLabel>
                  <Input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" inputMode="numeric" autoComplete="tel" focusBorderColor="red.400" />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="sm">Address</FormLabel>
                <Textarea name="address" value={form.address} onChange={handleChange} placeholder="House no., building, street, area" rows={3} autoComplete="street-address" focusBorderColor="red.400" />
              </FormControl>

              <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                <FormControl>
                  <FormLabel fontSize="sm">City</FormLabel>
                  <Input name="city" value={form.city} onChange={handleChange} placeholder="City" autoComplete="address-level2" focusBorderColor="red.400" />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">State</FormLabel>
                  <Select name="state" value={form.state} onChange={handleChange} placeholder="Select state" focusBorderColor="red.400">
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Pincode</FormLabel>
                  <Input name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit pincode" inputMode="numeric" autoComplete="postal-code" focusBorderColor="red.400" />
                </FormControl>
              </SimpleGrid>
            </Stack>

            <Flex mt="7" gap="3" direction={{ base: "column-reverse", sm: "row" }} justify="space-between">
              <Button as={Link} to="/productCart" variant="ghost" leftIcon={<FiArrowLeft />} borderRadius="full">
                Back to cart
              </Button>
              <Button type="submit" colorScheme="red" size="lg" borderRadius="full" px="10">
                Continue to payment
              </Button>
            </Flex>
          </Box>

          {/* Order summary */}
          <Box
            position={{ lg: "sticky" }}
            top={{ lg: "110px" }}
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="xl"
            boxShadow="sm"
            p="5"
          >
            <Heading size="md" mb="4">
              Order summary
            </Heading>

            <Stack spacing="3" maxH="260px" overflowY="auto" pr="1">
              {items.map((item) => (
                <HStack key={item._id} spacing="3" align="center">
                  <Box position="relative" w="56px" flexShrink="0" bg="gray.50" borderRadius="md" p="1">
                    <AspectRatio ratio={1}>
                      <Image src={item.product_item__primary_image} fallbackSrc="/musicose-mark.svg" alt={item.product_item_meta__title} objectFit="contain" />
                    </AspectRatio>
                    <Flex
                      position="absolute"
                      top="-6px"
                      right="-6px"
                      minW="20px"
                      h="20px"
                      px="1"
                      align="center"
                      justify="center"
                      bg="gray.700"
                      color="white"
                      fontSize="10px"
                      fontWeight="700"
                      borderRadius="full"
                    >
                      {Number(item.quantity) || 1}
                    </Flex>
                  </Box>
                  <Text flex="1" fontSize="sm" fontWeight="600" noOfLines={2}>
                    {item.product_item_meta__title}
                  </Text>
                  <Text fontSize="sm" fontWeight="700">
                    {formatPrice((Number(item.price) || 0) * (Number(item.quantity) || 1))}
                  </Text>
                </HStack>
              ))}
            </Stack>

            <Divider my="4" />

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

            <HStack mt="4" justify="center" spacing="2" color="gray.500" fontSize="xs">
              <Icon as={FiLock} />
              <Text>Safe and secure payments</Text>
            </HStack>
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

export default Checkout;
