import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, HStack, Input, Stack, useDisclosure } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useRef } from "react";

export const NavSlider = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Boat</DrawerHeader>

          <DrawerBody>
            <Stack w={"100%"} justify={"center"} align={"center"}>
              <HStack
                w={"100%"}
                minW="200px"
                p={"0px 20px"}
                justify={"center"}
                align={"center"}
                borderRadius={"25px"}
                bg="#EAEAEA"
              >
                <SearchIcon alignItems={"center"} zIndex="5" color={"black"} />
                <Input
                  outline={"none"}
                  border={"none"}
                  p={"0px"}
                  w={"100%"}
                  focusBorderColor={"transparent"}
                  placeholder="Search..."
                  color={"black"}
                />
              </HStack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
