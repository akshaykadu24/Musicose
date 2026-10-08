import { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FiCheck, FiLogOut } from "react-icons/fi";

const popIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
`;

const ripple = keyframes`
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(1.8); opacity: 0; }
`;

const shrink = keyframes`
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
`;

const VARIANTS = {
  success: { icon: FiCheck, color: "#16a34a", soft: "#dcfce7" },
  info: { icon: FiLogOut, color: "#111827", soft: "#e5e7eb" },
};

// Presentational check-mark panel, reused inside the auth modal after signup.
export function StatusPanel({
  variant = "success",
  title,
  message,
  actionLabel = "Continue",
  onAction,
  autoCloseMs,
}) {
  const { icon, color, soft } = VARIANTS[variant] || VARIANTS.success;

  return (
    <Flex direction="column" align="center" textAlign="center" px="6" pt="10" pb="8">
      <Box position="relative" mb="6">
        <Box
          position="absolute"
          inset="0"
          borderRadius="full"
          bg={soft}
          animation={`${ripple} 1.4s ease-out infinite`}
        />
        <Flex
          position="relative"
          boxSize="84px"
          borderRadius="full"
          bg={soft}
          align="center"
          justify="center"
          animation={`${popIn} 0.5s cubic-bezier(.17,.89,.32,1.28) both`}
        >
          <Flex boxSize="56px" borderRadius="full" bg={color} align="center" justify="center">
            <Icon as={icon} boxSize="28px" color="white" strokeWidth="3" />
          </Flex>
        </Flex>
      </Box>

      <Text fontSize="2xl" fontWeight="800" color="#111827" lineHeight="short">
        {title}
      </Text>
      {message && (
        <Text mt="2" color="gray.500" fontSize="md" maxW="320px">
          {message}
        </Text>
      )}

      <Button
        mt="7"
        w="100%"
        size="lg"
        borderRadius="xl"
        bg="#111827"
        color="white"
        _hover={{ bg: "#1f2937" }}
        _active={{ bg: "#030712" }}
        onClick={onAction}
      >
        {actionLabel}
      </Button>

      {autoCloseMs && (
        <Box mt="5" h="3px" w="100%" bg="gray.100" borderRadius="full" overflow="hidden">
          <Box
            h="100%"
            bg={color}
            transformOrigin="left"
            animation={`${shrink} ${autoCloseMs}ms linear forwards`}
          />
        </Box>
      )}
    </Flex>
  );
}

const AUTO_CLOSE_MS = 3500;

// Global popup driven by redux, mounted once in App.
function AuthStatusPopup({ popup, onClose }) {
  const { isOpen, title, message, variant, actionLabel } = popup;

  useEffect(() => {
    if (!isOpen) return undefined;
    const timer = setTimeout(onClose, AUTO_CLOSE_MS);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(6px)" />
      <ModalContent mx="4" maxW="400px" borderRadius="2xl" overflow="hidden">
        <ModalBody p="0">
          <StatusPanel
            variant={variant}
            title={title}
            message={message}
            actionLabel={actionLabel}
            onAction={onClose}
            autoCloseMs={isOpen ? AUTO_CLOSE_MS : undefined}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AuthStatusPopup;
