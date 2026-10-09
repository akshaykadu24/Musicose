import { IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import AuthModal from "../../components/auth/AuthModal";

function Login({ iconOnly = false }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {iconOnly ? (
        <IconButton
          icon={<FiUser size="21px" />}
          onClick={onOpen}
          variant="ghost"
          borderRadius="full"
          aria-label="Login"
        />
      ) : (
        <Text fontSize="md" fontWeight="600" onClick={onOpen}>
          Login
        </Text>
      )}

      <AuthModal isOpen={isOpen} onClose={onClose} initialMode="login" />
    </>
  );
}

export default Login;
