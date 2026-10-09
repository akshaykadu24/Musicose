import { useRef, useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProducts } from "../redux/product/product.action";

export const MobileSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = useState("");
  const searchButtonRef = useRef();
  const dispatch = useDispatch();
  const searchData = useSelector((store) => store.productManager.searchData);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim()) {
      dispatch(getSearchProducts(value));
    }
  };

  const closeSearch = () => {
    setSearchValue("");
    onClose();
  };

  return (
    <>
      <IconButton
        ref={searchButtonRef}
        icon={<SearchIcon boxSize="20px" />}
        onClick={onOpen}
        variant="ghost"
        borderRadius="full"
        aria-label="Search products"
      />
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={closeSearch}
        finalFocusRef={searchButtonRef}
      >
        <DrawerOverlay top="32px" />
        <DrawerContent mt="32px" borderBottomRadius="xl">
          <DrawerBody p={{ base: "4", md: "6" }}>
            <InputGroup maxW="900px" mx="auto">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.600" />
              </InputLeftElement>
              <Input
                autoFocus
                value={searchValue}
                onChange={handleSearch}
                pr="12"
                bg="gray.100"
                border="none"
                borderRadius="full"
                placeholder='Search "Smart Watches"'
                focusBorderColor="red.400"
              />
              <IconButton
                icon={<CloseIcon boxSize="12px" />}
                onClick={closeSearch}
                position="absolute"
                right="1"
                top="1"
                zIndex="2"
                size="sm"
                variant="ghost"
                borderRadius="full"
                aria-label="Close search"
              />
            </InputGroup>

            {searchValue && Array.isArray(searchData) && (
              <Box maxW="900px" maxH="55vh" mx="auto" mt="4" overflowY="auto">
                {searchData.length > 0 ? (
                  searchData.slice(0, 8).map((product) => (
                    <Box
                      as={Link}
                      to={`/products/${product._id}`}
                      key={product._id}
                      display="flex"
                      alignItems="center"
                      gap="3"
                      p="3"
                      borderBottom="1px solid"
                      borderColor="gray.100"
                      textAlign="left"
                      onClick={closeSearch}
                      _hover={{ bg: "gray.50" }}
                    >
                      <Image
                        src={product.product_item__primary_image}
                        alt={product.product_item_meta__title}
                        boxSize="52px"
                        objectFit="contain"
                      />
                      <Text fontSize="sm" fontWeight="600" noOfLines={2}>
                        {product.product_item_meta__title}
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Text py="6" color="gray.500">No products found.</Text>
                )}
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};