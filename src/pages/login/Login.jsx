import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Link,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton
  } from "@chakra-ui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
  


  function Login() {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [on, setOn] = useState(true);
    const handleSubmit = (e) => {
      e.preventDefault();
      toast({
        title: "Welcome",
        description: "You are now logged in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    };
  
    return (
      <>
        <Button variantColor="teal" onClick={onOpen}>
          Login/Signup
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          {on?<ModalContent>
            <ModalHeader>Login/Signup</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    aria-describedby="email-helper-text"
                  />
                </FormControl>
  
                <FormControl mt={4}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    aria-describedby="password-helper-text"
                  />
                </FormControl>
              </form>
            </ModalBody>
  
            <ModalFooter>
              <Button variantColor="teal" mr={3} onClick={handleSubmit}>
                Login
              </Button>
              <NavLink
                ml={2}
                textDecor ="underline"
                fontSize = "sm"
                color = "blue.500"
                // href = "/singup"
                onClick={() => setOn(!on)}
                // to="/signup"
              >
                {on?"Signup":"login"}
              </NavLink>
            </ModalFooter>
          </ModalContent>:
          
          <ModalContent>
            <ModalHeader>Signup</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    aria-describedby="email-helper-text"
                  />
                </FormControl>
  
                <FormControl mt={4}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    aria-describedby="password-helper-text"
                  />
                </FormControl>
  
                <FormControl mt={4}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    aria-describedby="name-helper-text"
                  />
                </FormControl>
  
                <FormControl mt={4}>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <Input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    aria-describedby="phone-helper-text"
                  />
                </FormControl>
              </form>
            </ModalBody>
  
            <ModalFooter>
            <Button variantColor="teal" mr={3} onClick={handleSubmit}>
              Signup
            </Button>
            <Link  onClick={() => setOn(!on)}> {on?"Signup":"login"}</Link>
          </ModalFooter>
          </ModalContent>}
        </Modal>
      </>
    );
  }
  
  export default Login;
  