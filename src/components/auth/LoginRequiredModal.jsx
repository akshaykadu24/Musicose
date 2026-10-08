import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiLock, FiShoppingBag } from "react-icons/fi";

function LoginRequiredModal({
  isOpen,
  onClose,
  onLogin,
  onSignup,
  title = "Log in to view your cart",
  message = "Your cart is saved to your account. Log in or create one to see your items and check out.",
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(6px)" />
      <ModalContent mx="4" maxW="400px" borderRadius="2xl" overflow="hidden">
        <ModalCloseButton borderRadius="full" top="3" right="3" />
        <ModalBody px="7" pt="10" pb="7">
          <Flex direction="column" align="center" textAlign="center">
            <Flex
              position="relative"
              boxSize="84px"
              borderRadius="full"
              bg="red.50"
              align="center"
              justify="center"
              mb="6"
            >
              <Icon as={FiShoppingBag} boxSize="36px" color="red.500" />
              <Flex
                position="absolute"
                bottom="0"
                right="0"
                boxSize="30px"
                borderRadius="full"
                bg="#111827"
                border="3px solid white"
                align="center"
                justify="center"
              >
                <Icon as={FiLock} boxSize="13px" color="white" />
              </Flex>
            </Flex>

            <Text fontSize="2xl" fontWeight="800" color="#111827" lineHeight="short">
              {title}
            </Text>
            <Text mt="2" color="gray.500" fontSize="md" maxW="320px">
              {message}
            </Text>

            <Stack w="100%" mt="7" spacing="3">
              <Button
                size="lg"
                borderRadius="xl"
                bg="red.500"
                color="white"
                fontWeight="700"
                boxShadow="0 10px 24px rgba(239, 68, 68, 0.35)"
                _hover={{ bg: "red.600" }}
                _active={{ bg: "red.700" }}
                onClick={onLogin}
              >
                Log in
              </Button>
              <Button
                size="lg"
                borderRadius="xl"
                variant="outline"
                borderColor="gray.300"
                color="#111827"
                fontWeight="700"
                _hover={{ bg: "gray.50" }}
                onClick={onSignup}
              >
                Create an account
              </Button>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default LoginRequiredModal;
