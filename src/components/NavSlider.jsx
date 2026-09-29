import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { categoryLinks } from "./Categories";

export const NavSlider = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuButtonRef = useRef();

  return (
    <>
      <IconButton
        ref={menuButtonRef}
        icon={<HamburgerIcon boxSize="24px" />}
        onClick={onOpen}
        variant="ghost"
        borderRadius="full"
        aria-label="Open categories"
      />

      <Drawer
        isOpen={isOpen}
        placement="left"
        size="sm"
        onClose={onClose}
        finalFocusRef={menuButtonRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton top="5" />
          <DrawerHeader py="4" borderBottomWidth="1px">
            <Image
              src="/musicose-logo.svg"
              alt="Musicose"
              w="150px"
              objectFit="contain"
            />
          </DrawerHeader>
          <DrawerBody p="4" bg="gray.50">
            <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden">
              <Text px="4" py="4" fontSize="lg" fontWeight="700" textAlign="left">
                Categories
              </Text>
              <Grid
                templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }}
                gap="2"
                p="3"
                borderTop="1px solid"
                borderColor="gray.100"
              >
                {categoryLinks.map((category) => (
                  <Box
                    as={Link}
                    to={category.path}
                    key={category.path}
                    onClick={onClose}
                    p="2"
                    borderRadius="lg"
                    textAlign="center"
                    _hover={{ bg: "red.50", color: "red.500" }}
                  >
                    <Image
                      src={category.image}
                      fallbackSrc="/musicose-mark.svg"
                      alt={category.title}
                      boxSize={{ base: "68px", sm: "78px" }}
                      mx="auto"
                      objectFit="contain"
                    />
                    <Text mt="2" fontSize="xs" fontWeight="600" lineHeight="short">
                      {category.title}
                    </Text>
                  </Box>
                ))}
              </Grid>
              <Box
                as={Link}
                to="/about"
                onClick={onClose}
                display="block"
                px="4"
                py="4"
                color="red.500"
                fontWeight="700"
                textAlign="left"
                borderTop="1px solid"
                borderColor="gray.100"
                _hover={{ bg: "red.50" }}
              >
                About Musicose
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};