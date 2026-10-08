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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FiAward, FiCheck, FiShoppingBag, FiTag } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCart } from "../../../redux/cart/cart.action";
import { COUPONS } from "../../../utils/cartTotals";
import AuthModal from "../../auth/AuthModal";
import LoginRequiredModal from "../../auth/LoginRequiredModal";
import { Ratings } from "./Ratings";

const ADDED_STATE_MS = 4000;

// Highly rated products with plenty of reviews get a "Bestseller" badge
const isBestseller = (stars, reviewCount) => Number(stars) >= 4.5 && reviewCount >= 100;

// Best coupon this product unlocks on its own (coupons are sorted by minCart)
const bestCouponFor = (price) => [...COUPONS].reverse().find((coupon) => price >= coupon.minCart);

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
  const navigate = useNavigate();
  const toast = useToast();
  const loginPrompt = useDisclosure();
  const authModal = useDisclosure();
  const [authMode, setAuthMode] = useState("login");
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef();

  useEffect(() => () => clearTimeout(addedTimer.current), []);

  const offerPrice = Number(price) || 0;
  const mrp = Number(price2) || 0;
  const discount = mrp > offerPrice ? Math.round(((mrp - offerPrice) * 100) / mrp) : 0;
  const features = [feature, feature2, feature3].filter(Boolean).slice(0, 2);
  const hasRating = Number(rating__stars) > 0;
  const reviews = (rating__caption || "").replace(/reviews?/i, "").trim();
  const bestseller = isBestseller(rating__stars, parseInt(reviews.replace(/\D/g, ""), 10) || 0);
  const coupon = bestCouponFor(offerPrice);

  const addToCart = async () => {
    setAdding(true);
    const ok = await dispatch(addCart(product));
    setAdding(false);

    if (!ok) {
      toast({ title: "Couldn't add to cart", description: "Please try again.", status: "error", duration: 2500, position: "top" });
      return;
    }

    toast({ title: "Added to cart", description: product_item_meta__title, status: "success", duration: 2000, position: "top" });
    setAdded(true);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), ADDED_STATE_MS);
  };

  const handleAddToCart = (event) => {
    // Stop the card link from opening the product page
    event.preventDefault();
    event.stopPropagation();

    if (added) {
      navigate("/productCart");
      return;
    }
    if (!localStorage.getItem("token")) {
      loginPrompt.onOpen();
      return;
    }
    addToCart();
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    loginPrompt.onClose();
    authModal.onOpen();
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

          <HStack position="absolute" top="3" left="3" right="3" spacing="1.5" flexWrap="wrap">
            {discount > 0 && (
              <Badge colorScheme="red" borderRadius="full" px="2">
                {discount}% off
              </Badge>
            )}
            {bestseller && (
              <Badge
                bg="#111827"
                color="yellow.300"
                borderRadius="full"
                px="2"
                display="inline-flex"
                alignItems="center"
                gap="1"
              >
                <FiAward /> Bestseller
              </Badge>
            )}
          </HStack>
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
            {coupon && (
              <HStack
                mt="2"
                spacing="1.5"
                px="2"
                py="1"
                bg="red.50"
                color="red.600"
                borderRadius="md"
                border="1px dashed"
                borderColor="red.200"
                fontSize="11px"
                fontWeight="600"
              >
                <FiTag style={{ flexShrink: 0 }} />
                <Text noOfLines={1}>
                  Extra {coupon.percent}% off with <b>{coupon.code}</b>
                </Text>
              </HStack>
            )}

            <Button
              mt="3"
              w="100%"
              size="sm"
              leftIcon={added ? <FiCheck /> : <FiShoppingBag />}
              colorScheme={added ? "green" : "red"}
              variant={added ? "solid" : "outline"}
              borderRadius="full"
              isLoading={adding}
              loadingText="Adding"
              onClick={handleAddToCart}
              _groupHover={added ? undefined : { bg: "red.500", color: "white" }}
            >
              {added ? "Added · View cart" : "Add to cart"}
            </Button>
          </Box>
        </Box>
      </Box>

      <LoginRequiredModal
        isOpen={loginPrompt.isOpen}
        onClose={loginPrompt.onClose}
        onLogin={() => openAuth("login")}
        onSignup={() => openAuth("signup")}
        title="Log in to add to cart"
        message="Log in or create an account to save this product to your cart. We'll add it for you right after."
      />
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={authModal.onClose}
        initialMode={authMode}
        onLoginSuccess={addToCart}
      />
    </Box>
  );
};
