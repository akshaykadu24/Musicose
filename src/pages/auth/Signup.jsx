import { Text, useDisclosure } from "@chakra-ui/react";
import AuthModal from "../../components/auth/AuthModal";

function Signup() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text fontSize="md" fontWeight="600" onClick={onOpen}>
        Signup
      </Text>

      <AuthModal isOpen={isOpen} onClose={onClose} initialMode="signup" />
    </>
  );
}

export default Signup;
