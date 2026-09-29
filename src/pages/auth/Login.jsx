import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/authReducer/auth.action";

function Login({ iconOnly = false }) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginAction(formData));
    onClose();
  };

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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx="4">
          <form onSubmit={handleLogin}>
            <ModalHeader>Login to Musicose</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl mt="4" isRequired>
                <FormLabel htmlFor="pass">Password</FormLabel>
                <Input
                  type="password"
                  id="pass"
                  name="pass"
                  value={formData.pass || ""}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" bg="#111827" color="white" _hover={{ bg: "gray.700" }}>
                Login
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;