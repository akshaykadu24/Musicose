import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Td,
  Text,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/adminReducer/admin.action";
import UpdateProduct, { CATEGORIES } from "./updateProduct";

const CATEGORY_COLORS = {
  watch: "purple",
  earbud: "blue",
  headphone: "orange",
  speaker: "teal",
  bluetoothHeadphone: "cyan",
};

const formatINR = (value) => `₹${(Number(value) || 0).toLocaleString("en-IN")}`;

export const CategoryBadge = ({ category }) => {
  const label = CATEGORIES.find((c) => c.value === category)?.label || category || "Uncategorised";
  return (
    <Badge colorScheme={CATEGORY_COLORS[category] || "gray"} variant="subtle" borderRadius="full" px="2.5" py="0.5" textTransform="none" fontSize="xs">
      {label}
    </Badge>
  );
};

const Price = ({ el }) => {
  const offer = Number(el.price) || 0;
  const mrp = Number(el.price2) || 0;
  const discount = mrp > offer && offer > 0 ? Math.round(((mrp - offer) * 100) / mrp) : 0;

  return (
    <Box>
      <Text fontWeight="800" color="gray.900">{formatINR(offer)}</Text>
      {discount > 0 && (
        <HStack spacing="1.5" fontSize="xs">
          <Text color="gray.400" textDecoration="line-through">{formatINR(mrp)}</Text>
          <Text color="green.600" fontWeight="700">{discount}% off</Text>
        </HStack>
      )}
    </Box>
  );
};

const Thumb = ({ el, size }) => (
  <Box boxSize={size} flexShrink="0" bg="gray.50" borderRadius="lg" border="1px solid" borderColor="gray.100" p="1.5">
    <Image src={el.product_item__primary_image} fallbackSrc="/musicose-mark.svg" alt={el.product_item_meta__title} boxSize="100%" objectFit="contain" />
  </Box>
);

const DeleteProduct = ({ el, onDeleted, variant = "icon" }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const result = await dispatch(deleteProduct(el._id));
    setDeleting(false);
    onClose();

    if (!result.ok) {
      toast({ title: "Delete failed", description: result.msg, status: "error", position: "top", duration: 3000 });
      return;
    }
    toast({ title: "Product deleted", description: el.product_item_meta__title, status: "success", position: "top", duration: 2500 });
    onDeleted?.();
  };

  return (
    <>
      {variant === "icon" ? (
        <Tooltip label="Delete product" hasArrow>
          <IconButton
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            color="gray.600"
            borderRadius="lg"
            aria-label="Delete product"
            onClick={onOpen}
            _hover={{ bg: "red.50", color: "red.600" }}
          />
        </Tooltip>
      ) : (
        <Button size="sm" leftIcon={<FiTrash2 />} variant="outline" colorScheme="red" borderRadius="lg" flex="1" onClick={onOpen}>
          Delete
        </Button>
      )}

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay bg="blackAlpha.600" backdropFilter="blur(4px)">
          <AlertDialogContent mx="4" borderRadius="2xl">
            <AlertDialogHeader fontSize="lg" fontWeight="800">Delete product?</AlertDialogHeader>
            <AlertDialogBody>
              <HStack spacing="3" p="3" bg="gray.50" borderRadius="lg" mb="3">
                <Thumb el={el} size="48px" />
                <Text fontWeight="600" fontSize="sm" noOfLines={2}>{el.product_item_meta__title}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                This permanently removes the product from the store. This can't be undone.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter gap="3">
              <Button ref={cancelRef} variant="ghost" borderRadius="lg" onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" borderRadius="lg" onClick={handleDelete} isLoading={deleting} loadingText="Deleting">
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

// Table row for desktop
const AdminMapProductBox = ({ el, onChange }) => (
  <Tr _hover={{ bg: "gray.50" }} transition="background 0.15s">
    <Td py="3">
      <HStack spacing="3" maxW="380px">
        <Thumb el={el} size="56px" />
        <Box minW="0">
          <Text fontWeight="700" fontSize="sm" color="gray.900" noOfLines={2}>{el.product_item_meta__title}</Text>
          <Text fontSize="xs" color="gray.400" noOfLines={1}>#{String(el._id).slice(-8)}</Text>
        </Box>
      </HStack>
    </Td>
    <Td><CategoryBadge category={el.category} /></Td>
    <Td><Price el={el} /></Td>
    <Td maxW="240px">
      <Text fontSize="sm" color="gray.600" noOfLines={2}>{el.feature || "—"}</Text>
    </Td>
    <Td textAlign="right">
      <HStack spacing="1" justify="flex-end">
        <UpdateProduct el={el} onUpdated={onChange} />
        <DeleteProduct el={el} onDeleted={onChange} />
      </HStack>
    </Td>
  </Tr>
);

// Card for mobile
export const AdminProductCard = ({ el, onChange }) => (
  <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" p="4" boxShadow="sm">
    <Flex gap="3">
      <Thumb el={el} size="72px" />
      <Box flex="1" minW="0">
        <Text fontWeight="700" fontSize="sm" noOfLines={2}>{el.product_item_meta__title}</Text>
        <Box mt="1.5"><CategoryBadge category={el.category} /></Box>
        <Box mt="2"><Price el={el} /></Box>
      </Box>
    </Flex>
    {el.feature && (
      <Text mt="3" fontSize="xs" color="gray.500" noOfLines={2}>{el.feature}</Text>
    )}
    <HStack mt="3" spacing="2">
      <UpdateProduct el={el} onUpdated={onChange} variant="button" />
      <DeleteProduct el={el} onDeleted={onChange} variant="button" />
    </HStack>
  </Box>
);

export default AdminMapProductBox;
