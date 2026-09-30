import {
  AspectRatio,
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Tag,
  Text,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../../../redux/cart/cart.action";
import { Ratings } from "./Ratings";

export const Products = ({ product }) => {
  const {
    _id,
    product_item_meta__title,
    price2,
    price,
    rating__stars,
    rating__caption,
    product_item__primary_image,
    product_item__secondary_image,
    feature,
    feature2,
    feature3,
  } = product;

  const dispatch = useDispatch();
  const toast = useToast();

  const offerPrice = Number(price) || 0;
  const mrp = Number(price2) || 0;
  const discount = mrp > offerPrice ? Math.round(((mrp - offerPrice) * 100) / mrp) : 0;
  const features = [feature, feature2, feature3].filter(Boolean).slice(0, 2);
  const hasRating = Number(rating__stars) > 0;
  const reviews = (rating__caption || "").replace(/reviews?/i, "").trim();

  const handleAddToCart = (event) => {
    // Stop the card link from opening the product page
    event.preventDefault();

    if (!localStorage.getItem("token")) {
      toast({ title: "Please login to add products to cart", status: "warning", position: "top" });
      return;
    }

    dispatch(addCart(product));
    toast({ title: "Added to cart", status: "success", duration: 2000, position: "top" });
  };

  return (
    <Box py="2" h="100%">
      <Box
        as={Link}
        to={`/products/${_id}`}
        role="group"
        display="flex"
        flexDirection="column"
        h="100%"
        bg="white"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="sm"
        transition="all 0.2s"
        _hover={{ transform: "translateY(-4px)", boxShadow: "lg", borderColor: "red.100" }}
      >
        <Box position="relative" bg="gray.50" px={{ base: "4", md: "6" }} py={{ base: "3", md: "4" }}>
          <AspectRatio ratio={4 / 3}>
            <Box>
              <Image
                src={product_item__primary_image}
                fallbackSrc="/musicose-mark.svg"
                alt={product_item_meta__title}
                objectFit="contain"
                w="100%"
                h="100%"
                transition="all 0.3s"
                _groupHover={product_item__secondary_image ? { opacity: 0 } : { transform: "scale(1.05)" }}
              />
              {product_item__secondary_image && (
                <Image
                  src={product_item__secondary_image}
                  alt=""
                  position="absolute"
                  inset="0"
                  objectFit="contain"
                  w="100%"
                  h="100%"
                  opacity="0"
                  transition="opacity 0.3s"
                  _groupHover={{ opacity: 1 }}
                />
              )}
            </Box>
          </AspectRatio>

          {discount > 0 && (
            <Badge position="absolute" top="3" left="3" colorScheme="red" borderRadius="full" px="2">
              {discount}% off
            </Badge>
          )}
        </Box>

        <Box p={{ base: "3", md: "4" }} display="flex" flexDirection="column" flex="1" textAlign="left">
          <Text fontWeight="700" fontSize={{ base: "sm", md: "md" }} lineHeight="short" noOfLines={2}>
            {product_item_meta__title}
          </Text>

          <HStack mt="1.5" spacing="2">
            {hasRating ? (
              <>
                <Ratings rating={rating__stars} />
                {reviews && (
                  <Text fontSize="xs" color="gray.500">
                    ({reviews})
                  </Text>
                )}
              </>
            ) : (
              <Tag size="sm" colorScheme="green" borderRadius="full">
                New arrival
              </Tag>
            )}
          </HStack>

          {features.length > 0 && (
            <Wrap mt="3" spacing="1.5">
              {features.map((item) => (
                <WrapItem key={item}>
                  <Tag size="sm" bg="gray.100" color="gray.700" borderRadius="md" fontSize="11px">
                    {item}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          )}

          <Box mt="auto" pt="4">
            <HStack align="baseline" spacing="2">
              <Text fontSize={{ base: "md", md: "lg" }} fontWeight="800" color="gray.900">
                ₹{offerPrice.toLocaleString("en-IN")}
              </Text>
              {mrp > offerPrice && (
                <Text color="gray.500" fontSize="sm" textDecoration="line-through">
                  ₹{mrp.toLocaleString("en-IN")}
                </Text>
              )}
            </HStack>
            {mrp > offerPrice && (
              <Text color="green.600" fontSize="xs" fontWeight="700">
                You save ₹{(mrp - offerPrice).toLocaleString("en-IN")}
              </Text>
            )}

            <Button
              mt="3"
              w="100%"
              size="sm"
              leftIcon={<FiShoppingBag />}
              colorScheme="red"
              variant="outline"
              borderRadius="full"
              onClick={handleAddToCart}
              _groupHover={{ bg: "red.500", color: "white" }}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
