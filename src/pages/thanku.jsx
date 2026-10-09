import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiCheck, FiPackage, FiTruck } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems } from "../redux/cart/cart.action";
import { formatPrice, ORDER_KEY } from "../utils/cartTotals";

const readOrder = () => {
  try {
    return JSON.parse(sessionStorage.getItem(ORDER_KEY));
  } catch (error) {
    return null;
  }
};

const Detail = ({ label, value }) => (
  <Box>
    <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide">
      {label}
    </Text>
    <Text mt="1" fontWeight="700">{value}</Text>
  </Box>
);

function Thanking() {
  const dispatch = useDispatch();
  const [order] = useState(readOrder);

  // Refresh the cart so the navbar badge shows the empty cart
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (!order) {
    return (
      <Flex direction="column" align="center" textAlign="center" py={{ base: "16", md: "24" }} px="4">
        <Heading size="lg">No recent order</Heading>
        <Text mt="2" color="gray.600">Your order details will appear here after you place an order.</Text>
        <Button as={Link} to="/" mt="6" colorScheme="red" borderRadius="full" px="8">
          Start shopping
        </Button>
      </Flex>
    );
  }

  const deliveryDate = new Date(order.date);
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const address = order.address || {};

  return (
    <Box bg="#f8fafc" minH="70vh" py={{ base: "8", md: "14" }} px="4">
      <Box maxW="680px" mx="auto" textAlign="center">
        <Flex mx="auto" boxSize="84px" align="center" justify="center" bg="green.500" color="white" borderRadius="full" boxShadow="0 0 0 10px var(--chakra-colors-green-100)">
          <Icon as={FiCheck} boxSize="42px" strokeWidth="3" />
        </Flex>
        <Heading mt="7" size={{ base: "lg", md: "xl" }}>Thank you for your order!</Heading>
        <Text mt="2" color="gray.600">
          Your order has been placed and will be delivered soon.
        </Text>

        <Box mt="8" bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" boxShadow="sm" p={{ base: "5", md: "7" }} textAlign="left">
          <SimpleGrid columns={{ base: 2, md: 4 }} gap="5">
            <Detail label="Order ID" value={order.id} />
            <Detail label="Items" value={order.itemCount} />
            <Detail label="Payment" value={order.method} />
            <Detail label="Total" value={formatPrice(order.total)} />
          </SimpleGrid>

          {order.saving > 0 && (
            <Box mt="5" py="2" px="3" bg="green.50" color="green.700" borderRadius="md" fontSize="sm" fontWeight="700">
              You saved {formatPrice(order.saving)} on this order
            </Box>
          )}

          <Divider my="5" />

          <Stack spacing="3">
            {order.items.map((item, index) => (
              <HStack key={`${item.title}-${index}`} spacing="3">
                <Box w="52px" flexShrink="0" bg="gray.50" borderRadius="md" p="1">
                  <AspectRatio ratio={1}>
                    <Image src={item.image} fallbackSrc="/musicose-mark.svg" alt={item.title} objectFit="contain" />
                  </AspectRatio>
                </Box>
                <Text flex="1" fontSize="sm" fontWeight="600" noOfLines={2}>{item.title}</Text>
                <Text fontSize="sm" color="gray.500">× {item.quantity}</Text>
              </HStack>
            ))}
          </Stack>

          <Divider my="5" />

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
            <HStack align="flex-start" spacing="3">
              <Icon as={FiPackage} color="red.500" mt="1" />
              <Box>
                <Text fontWeight="700" fontSize="sm">Delivering to</Text>
                <Text fontSize="sm" color="gray.600">{address.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {address.address}, {address.city}, {address.state} - {address.pincode}
                </Text>
              </Box>
            </HStack>
            <HStack align="flex-start" spacing="3">
              <Icon as={FiTruck} color="red.500" mt="1" />
              <Box>
                <Text fontWeight="700" fontSize="sm">Estimated delivery</Text>
                <Text fontSize="sm" color="gray.600">
                  By {deliveryDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                </Text>
              </Box>
            </HStack>
          </SimpleGrid>
        </Box>

        <Button as={Link} to="/" mt="8" colorScheme="red" size="lg" borderRadius="full" px="10">
          Continue shopping
        </Button>
      </Box>
    </Box>
  );
}

export default Thanking;
