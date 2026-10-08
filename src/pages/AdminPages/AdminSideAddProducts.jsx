import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiDollarSign,
  FiImage,
  FiInfo,
  FiList,
  FiRotateCcw,
  FiUploadCloud,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../redux/adminReducer/admin.action";
import { CATEGORIES } from "./updateProduct";
import { ButtonIconBadge, primaryButtonStyles } from "./adminButtonStyles";

const EMPTY_PRODUCT = {
  product_item_meta__title: "",
  product_item__primary_image: "",
  product_item__secondary_image: "",
  category: "",
  price: "",
  price2: "",
  feature: "",
  feature2: "",
  feature3: "",
};

const REQUIRED_FIELDS = ["product_item_meta__title", "category", "price", "price2", "product_item__primary_image", "feature"];

const isUrl = (value) => /^https?:\/\/\S+$/i.test(value.trim());

const validate = (form) => {
  const errors = {};
  if (!form.product_item_meta__title.trim()) errors.product_item_meta__title = "Enter the product title";
  if (!form.category) errors.category = "Choose a category";
  if (!isUrl(form.product_item__primary_image)) errors.product_item__primary_image = "Enter a valid image URL (https://…)";
  if (form.product_item__secondary_image && !isUrl(form.product_item__secondary_image)) {
    errors.product_item__secondary_image = "Enter a valid image URL (https://…)";
  }
  if (!(Number(form.price) > 0)) errors.price = "Enter the offer price";
  if (!(Number(form.price2) > 0)) errors.price2 = "Enter the MRP";
  else if (Number(form.price) > Number(form.price2)) errors.price2 = "MRP can't be lower than the offer price";
  if (!form.feature.trim()) errors.feature = "Add at least one feature";
  return errors;
};

const inputStyles = {
  borderRadius: "lg",
  bg: "gray.50",
  borderColor: "gray.200",
  focusBorderColor: "red.400",
  _hover: { borderColor: "gray.300" },
};

const Section = ({ icon, title, subtitle, children }) => (
  <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" boxShadow="sm" p={{ base: "5", md: "6" }}>
    <HStack spacing="3" mb="5">
      <Flex boxSize="36px" align="center" justify="center" bg="red.50" color="red.500" borderRadius="lg">
        <Icon as={icon} />
      </Flex>
      <Box>
        <Text fontWeight="800" color="gray.900">{title}</Text>
        <Text fontSize="xs" color="gray.500">{subtitle}</Text>
      </Box>
    </HStack>
    {children}
  </Box>
);

function AdminSideAddProducts() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "price" || name === "price2") value = value.replace(/\D/g, "");
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (submitted) setErrors(validate(updated));
  };

  const resetForm = () => {
    setForm(EMPTY_PRODUCT);
    setErrors({});
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const formErrors = validate(form);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      toast({ title: "Please fix the highlighted fields", status: "error", duration: 2500, position: "top" });
      return;
    }

    setSaving(true);
    const result = await dispatch(addProduct(form));
    setSaving(false);

    if (!result.ok) {
      toast({ title: "Couldn't add product", description: result.msg, status: "error", duration: 3500, position: "top" });
      return;
    }

    toast({
      title: "Product added",
      description: `${form.product_item_meta__title} is now live in the store.`,
      status: "success",
      duration: 3000,
      position: "top",
    });
    resetForm();
  };

  const offer = Number(form.price) || 0;
  const mrp = Number(form.price2) || 0;
  const discount = mrp > offer && offer > 0 ? Math.round(((mrp - offer) * 100) / mrp) : 0;
  const categoryLabel = CATEGORIES.find((c) => c.value === form.category)?.label;
  const features = [form.feature, form.feature2, form.feature3].filter((f) => f.trim());
  const requiredErrors = validate({ ...form, product_item__secondary_image: "" });
  const requiredCount = REQUIRED_FIELDS.filter((key) => !requiredErrors[key]).length;
  const requiredDone = requiredCount === REQUIRED_FIELDS.length;

  return (
    <Box bg="#f8fafc" minH="80vh" textAlign="left">
      <Box as="form" onSubmit={handleSubmit} noValidate maxW="1200px" mx="auto" px={{ base: "4", md: "6" }} py={{ base: "6", md: "8" }}>
        {/* Header */}
        <Flex align={{ base: "flex-start", md: "center" }} justify="space-between" gap="4" direction={{ base: "column", md: "row" }} mb="6">
          <Box>
            <Button as={Link} to="/adminSideProducts" variant="link" size="sm" color="gray.500" leftIcon={<FiArrowLeft />} mb="1">
              Back to products
            </Button>
            <Heading size="lg" color="gray.900">Add new product</Heading>
            <Text fontSize="sm" color="gray.500" mt="1">Fill in the details below, then click <b>Publish product</b> at the bottom. Fields marked * are required.</Text>
          </Box>
        </Flex>

        <Grid templateColumns={{ base: "1fr", lg: "1fr 340px" }} gap={{ base: "5", lg: "6" }} alignItems="start">
          {/* Form */}
          <Stack spacing="5">
            <Section icon={FiInfo} title="Basic details" subtitle="Name and category shown to customers">
              <Stack spacing="4">
                <FormControl isRequired isInvalid={!!errors.product_item_meta__title}>
                  <FormLabel fontSize="sm">Product title</FormLabel>
                  <Input name="product_item_meta__title" value={form.product_item_meta__title} onChange={handleChange} placeholder="e.g. Musicose Wireless Earbuds Pro" {...inputStyles} />
                  <FormErrorMessage>{errors.product_item_meta__title}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.category}>
                  <FormLabel fontSize="sm">Category</FormLabel>
                  <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} gap="2">
                    {CATEGORIES.map((c) => {
                      const active = form.category === c.value;
                      return (
                        <Button
                          key={c.value}
                          type="button"
                          size="sm"
                          h="auto"
                          py="2.5"
                          whiteSpace="normal"
                          borderRadius="lg"
                          border="1.5px solid"
                          borderColor={active ? "red.400" : errors.category ? "red.200" : "gray.200"}
                          bg={active ? "red.50" : "white"}
                          color={active ? "red.600" : "gray.600"}
                          fontWeight={active ? "700" : "600"}
                          _hover={{ borderColor: active ? "red.400" : "gray.300" }}
                          onClick={() => handleChange({ target: { name: "category", value: c.value } })}
                        >
                          {c.label}
                        </Button>
                      );
                    })}
                  </SimpleGrid>
                  <FormErrorMessage>{errors.category}</FormErrorMessage>
                </FormControl>
              </Stack>
            </Section>

            <Section icon={FiDollarSign} title="Pricing" subtitle="Discount is calculated automatically">
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                <FormControl isRequired isInvalid={!!errors.price}>
                  <FormLabel fontSize="sm">Offer price</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.400">₹</InputLeftElement>
                    <Input name="price" value={form.price} onChange={handleChange} inputMode="numeric" placeholder="1299" {...inputStyles} />
                  </InputGroup>
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.price2}>
                  <FormLabel fontSize="sm">MRP (launch price)</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.400">₹</InputLeftElement>
                    <Input name="price2" value={form.price2} onChange={handleChange} inputMode="numeric" placeholder="4490" {...inputStyles} />
                  </InputGroup>
                  {errors.price2 ? (
                    <FormErrorMessage>{errors.price2}</FormErrorMessage>
                  ) : (
                    discount > 0 && <FormHelperText color="green.600" fontWeight="600">{discount}% off for customers</FormHelperText>
                  )}
                </FormControl>
              </SimpleGrid>
            </Section>

            <Section icon={FiImage} title="Images" subtitle="Paste public image URLs (PNG, JPG or WebP)">
              <Stack spacing="4">
                <FormControl isRequired isInvalid={!!errors.product_item__primary_image}>
                  <FormLabel fontSize="sm">Primary image URL</FormLabel>
                  <Input name="product_item__primary_image" value={form.product_item__primary_image} onChange={handleChange} placeholder="https://…" {...inputStyles} />
                  <FormErrorMessage>{errors.product_item__primary_image}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.product_item__secondary_image}>
                  <FormLabel fontSize="sm">Secondary image URL</FormLabel>
                  <Input name="product_item__secondary_image" value={form.product_item__secondary_image} onChange={handleChange} placeholder="https://… (optional)" {...inputStyles} />
                  {errors.product_item__secondary_image ? (
                    <FormErrorMessage>{errors.product_item__secondary_image}</FormErrorMessage>
                  ) : (
                    <FormHelperText>Shown when a customer hovers over the product.</FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </Section>

            <Section icon={FiList} title="Key features" subtitle="Short highlights, e.g. “42 hours playback”">
              <Stack spacing="3">
                {["feature", "feature2", "feature3"].map((key, index) => (
                  <FormControl key={key} isRequired={index === 0} isInvalid={!!errors[key]}>
                    <FormLabel fontSize="sm">Feature {index + 1}{index > 0 && <Text as="span" color="gray.400" fontWeight="400"> (optional)</Text>}</FormLabel>
                    <Input name={key} value={form[key]} onChange={handleChange} placeholder={["Up to 42 hours playback", "Active noise cancellation", "IPX4 water resistance"][index]} {...inputStyles} />
                    <FormErrorMessage>{errors[key]}</FormErrorMessage>
                  </FormControl>
                ))}
              </Stack>
            </Section>
          </Stack>

          {/* Live preview */}
          <Stack spacing="4" position={{ lg: "sticky" }} top={{ lg: "100px" }}>
            <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" boxShadow="sm" overflow="hidden">
              <Flex px="5" py="3" borderBottom="1px solid" borderColor="gray.100" justify="space-between" align="center">
                <Text fontSize="sm" fontWeight="700" color="gray.700">Store preview</Text>
                <Badge colorScheme={requiredDone ? "green" : "gray"} borderRadius="full" px="2">
                  {requiredDone ? "Ready" : "Draft"}
                </Badge>
              </Flex>
              <Box p="5">
                <AspectRatio ratio={1}>
                  <Box bg="gray.50" borderRadius="lg" position="relative">
                    {isUrl(form.product_item__primary_image) ? (
                      <Image src={form.product_item__primary_image} fallbackSrc="/musicose-mark.svg" alt="Preview" objectFit="contain" w="100%" h="100%" p="4" />
                    ) : (
                      <Stack align="center" color="gray.400" spacing="2">
                        <Icon as={FiImage} boxSize="36px" />
                        <Text fontSize="xs">Image preview</Text>
                      </Stack>
                    )}
                    {discount > 0 && (
                      <Badge position="absolute" top="3" left="3" colorScheme="green" variant="solid" borderRadius="md">
                        {discount}% OFF
                      </Badge>
                    )}
                  </Box>
                </AspectRatio>
                {categoryLabel && (
                  <Text mt="4" fontSize="xs" fontWeight="700" color="red.500" textTransform="uppercase" letterSpacing="wide">{categoryLabel}</Text>
                )}
                <Text mt={categoryLabel ? "1" : "4"} fontWeight="700" color={form.product_item_meta__title ? "gray.900" : "gray.400"} noOfLines={2}>
                  {form.product_item_meta__title || "Product title"}
                </Text>
                <HStack mt="2" spacing="2" align="baseline">
                  <Text fontSize="xl" fontWeight="800">₹{offer.toLocaleString("en-IN")}</Text>
                  {discount > 0 && (
                    <Text fontSize="sm" color="gray.400" textDecoration="line-through">₹{mrp.toLocaleString("en-IN")}</Text>
                  )}
                </HStack>
                {features.length > 0 && (
                  <Stack mt="3" spacing="1.5">
                    {features.map((f) => (
                      <HStack key={f} spacing="2" fontSize="sm" color="gray.600" align="flex-start">
                        <Icon as={FiCheck} color="green.500" mt="1" flexShrink="0" />
                        <Text noOfLines={1}>{f}</Text>
                      </HStack>
                    ))}
                  </Stack>
                )}
              </Box>
            </Box>

          </Stack>
        </Grid>

        {/* Action bar: the button that actually saves the product */}
        <Flex
          position="sticky"
          bottom={{ base: "3", md: "5" }}
          zIndex="10"
          mt="6"
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="2xl"
          boxShadow="0 -4px 30px rgba(15, 23, 42, 0.12)"
          px={{ base: "4", md: "6" }}
          py="4"
          gap="4"
          align="center"
          direction={{ base: "column", sm: "row" }}
        >
          <Box flex="1" w="100%">
            <HStack justify="space-between" mb="1.5">
              <Text fontSize="sm" fontWeight="700" color="gray.800">
                {requiredDone ? "All set — ready to publish" : "Complete the required fields"}
              </Text>
              <Text fontSize="sm" fontWeight="700" color={requiredDone ? "green.600" : "gray.500"}>
                {requiredCount}/{REQUIRED_FIELDS.length}
              </Text>
            </HStack>
            <Progress
              value={(requiredCount / REQUIRED_FIELDS.length) * 100}
              size="sm"
              borderRadius="full"
              colorScheme={requiredDone ? "green" : "red"}
              bg="gray.100"
            />
          </Box>
          <HStack spacing="3" w={{ base: "100%", sm: "auto" }}>
            <Button
              variant="ghost"
              h="48px"
              borderRadius="xl"
              color="gray.600"
              leftIcon={<FiRotateCcw />}
              onClick={resetForm}
              flex={{ base: "1", sm: "none" }}
            >
              Reset
            </Button>
            <Button
              type="submit"
              h="48px"
              px="7"
              fontSize="md"
              flex={{ base: "2", sm: "none" }}
              leftIcon={<ButtonIconBadge><FiUploadCloud size="15px" /></ButtonIconBadge>}
              isLoading={saving}
              loadingText="Publishing"
              {...primaryButtonStyles}
            >
              Publish product
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}

export { AdminSideAddProducts };
