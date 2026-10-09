import {
  AspectRatio,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/adminReducer/admin.action";

export const CATEGORIES = [
  { value: "watch", label: "Smart Watch" },
  { value: "earbud", label: "Earbuds" },
  { value: "headphone", label: "Wired Headphone" },
  { value: "speaker", label: "Speaker" },
  { value: "bluetoothHeadphone", label: "Bluetooth Headphone" },
];

const FIELDS = [
  "product_item_meta__title",
  "product_item__primary_image",
  "product_item__secondary_image",
  "category",
  "price",
  "price2",
  "feature",
  "feature2",
  "feature3",
];

const pickFields = (product) =>
  FIELDS.reduce((acc, key) => ({ ...acc, [key]: product[key] ?? "" }), {});

const inputStyles = {
  borderRadius: "lg",
  bg: "gray.50",
  borderColor: "gray.200",
  focusBorderColor: "red.400",
  _hover: { borderColor: "gray.300" },
};

const SectionTitle = ({ children }) => (
  <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb="3">
    {children}
  </Text>
);

function UpdateProduct({ el, onUpdated, variant = "icon" }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState(() => pickFields(el));
  const [saving, setSaving] = useState(false);

  const open = () => {
    setForm(pickFields(el));
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Only send the fields that were actually edited
  const changes = FIELDS.reduce((acc, key) => {
    if (form[key] !== (el[key] ?? "")) acc[key] = form[key];
    return acc;
  }, {});
  const hasChanges = Object.keys(changes).length > 0;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!hasChanges) return;

    setSaving(true);
    const result = await dispatch(updateProduct(el._id, changes));
    setSaving(false);

    if (!result.ok) {
      toast({ title: "Update failed", description: result.msg, status: "error", position: "top", duration: 3000 });
      return;
    }

    toast({ title: "Product updated", description: form.product_item_meta__title, status: "success", position: "top", duration: 2500 });
    onClose();
    onUpdated?.();
  };

  const offer = Number(form.price) || 0;
  const mrp = Number(form.price2) || 0;
  const discount = mrp > offer && offer > 0 ? Math.round(((mrp - offer) * 100) / mrp) : 0;

  return (
    <>
      {variant === "icon" ? (
        <Tooltip label="Edit product" hasArrow>
          <IconButton
            icon={<FiEdit2 />}
            size="sm"
            variant="ghost"
            color="gray.600"
            borderRadius="lg"
            aria-label="Edit product"
            onClick={open}
            _hover={{ bg: "blue.50", color: "blue.600" }}
          />
        </Tooltip>
      ) : (
        <Button size="sm" leftIcon={<FiEdit2 />} variant="outline" borderRadius="lg" flex="1" onClick={open}>
          Edit
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <ModalContent as="form" onSubmit={handleUpdate} mx="4" borderRadius="2xl" overflow="hidden">
          <ModalHeader borderBottom="1px solid" borderColor="gray.100" py="4">
            <HStack spacing="3">
              <Flex boxSize="38px" align="center" justify="center" bg="red.50" color="red.500" borderRadius="lg">
                <Icon as={FiEdit2} />
              </Flex>
              <Box>
                <Text fontSize="lg" fontWeight="800">Edit product</Text>
                <Text fontSize="xs" color="gray.500" fontWeight="500">ID: {el._id}</Text>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton top="5" borderRadius="full" />

          <ModalBody py="6">
            <Grid templateColumns={{ base: "1fr", md: "220px 1fr" }} gap="6">
              {/* Live preview */}
              <Stack spacing="3">
                <AspectRatio ratio={1}>
                  <Box bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.100" p="4">
                    <Image
                      src={form.product_item__primary_image}
                      fallbackSrc="/musicose-mark.svg"
                      alt="Primary"
                      objectFit="contain"
                      w="100%"
                      h="100%"
                    />
                  </Box>
                </AspectRatio>
                {form.product_item__secondary_image && (
                  <AspectRatio ratio={2}>
                    <Box bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.100" p="2">
                      <Image src={form.product_item__secondary_image} fallbackSrc="/musicose-mark.svg" alt="Secondary" objectFit="contain" w="100%" h="100%" />
                    </Box>
                  </AspectRatio>
                )}
                <Box>
                  <Text fontWeight="700" fontSize="sm" noOfLines={2}>
                    {form.product_item_meta__title || "Product title"}
                  </Text>
                  <HStack spacing="2" mt="1">
                    <Text fontWeight="800">₹{offer.toLocaleString("en-IN")}</Text>
                    {discount > 0 && (
                      <>
                        <Text fontSize="sm" color="gray.400" textDecoration="line-through">₹{mrp.toLocaleString("en-IN")}</Text>
                        <Text fontSize="xs" color="green.600" fontWeight="700">{discount}% off</Text>
                      </>
                    )}
                  </HStack>
                </Box>
              </Stack>

              {/* Form */}
              <Stack spacing="6">
                <Box>
                  <SectionTitle>Basic details</SectionTitle>
                  <Stack spacing="4">
                    <FormControl>
                      <FormLabel fontSize="sm">Title</FormLabel>
                      <Input name="product_item_meta__title" value={form.product_item_meta__title} onChange={handleChange} placeholder="Product name" {...inputStyles} />
                    </FormControl>
                    <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4">
                      <FormControl>
                        <FormLabel fontSize="sm">Category</FormLabel>
                        <Select name="category" value={form.category} onChange={handleChange} placeholder="Select" {...inputStyles}>
                          {CATEGORIES.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="sm">Offer price</FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none" color="gray.400">₹</InputLeftElement>
                          <Input name="price" value={form.price} onChange={handleChange} inputMode="numeric" {...inputStyles} />
                        </InputGroup>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="sm">MRP</FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none" color="gray.400">₹</InputLeftElement>
                          <Input name="price2" value={form.price2} onChange={handleChange} inputMode="numeric" {...inputStyles} />
                        </InputGroup>
                      </FormControl>
                    </SimpleGrid>
                  </Stack>
                </Box>

                <Box>
                  <SectionTitle>Images</SectionTitle>
                  <Stack spacing="4">
                    <FormControl>
                      <FormLabel fontSize="sm">Primary image URL</FormLabel>
                      <Input name="product_item__primary_image" value={form.product_item__primary_image} onChange={handleChange} placeholder="https://" {...inputStyles} />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="sm">Secondary image URL</FormLabel>
                      <Input name="product_item__secondary_image" value={form.product_item__secondary_image} onChange={handleChange} placeholder="https://" {...inputStyles} />
                    </FormControl>
                  </Stack>
                </Box>

                <Box>
                  <SectionTitle>Key features</SectionTitle>
                  <Stack spacing="3">
                    {["feature", "feature2", "feature3"].map((key, index) => (
                      <Input key={key} name={key} value={form[key]} onChange={handleChange} placeholder={`Feature ${index + 1}`} {...inputStyles} />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </ModalBody>

          <ModalFooter borderTop="1px solid" borderColor="gray.100" gap="3">
            <Text flex="1" fontSize="sm" color="gray.500">
              {hasChanges ? `${Object.keys(changes).length} field(s) changed` : "No changes yet"}
            </Text>
            <Button variant="ghost" borderRadius="lg" onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              colorScheme="red"
              borderRadius="lg"
              px="6"
              isLoading={saving}
              loadingText="Saving"
              isDisabled={!hasChanges}
            >
              Save changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateProduct;
