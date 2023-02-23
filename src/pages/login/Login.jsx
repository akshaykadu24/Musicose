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
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
  


  function Login() {
    const toast = useToast();
    const [val,setVal] = useState({})
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [on, setOn] = useState(true);

    const handleChange = (e)=>{
      const {name,value} = e.target

      setVal({...val,[name]:value})
    }
    console.log(val)
    const handlelLogin = (e) => {
      // dispatch(login(val))
      

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
          Login
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handlelLogin}>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e)=>{handleChange(e)}}
                    placeholder="Enter your email"
                    aria-describedby="email-helper-text"
                  />
                </FormControl>
  
                <FormControl mt={4}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    id="pass"
                    name="pass"
                    onChange={(e)=>{handleChange(e)}}
                    placeholder="Enter your password"
                    aria-describedby="password-helper-text"
                  />
                </FormControl>
              </form>
            </ModalBody>
  
            <ModalFooter>
              <Button variantColor="teal" backgroundColor={"Black"} color={"white"} mr={3} onClick={handlelLogin}>
                Login
              </Button>
              
            </ModalFooter>
          </ModalContent>:
          
          
        </Modal>
      </>
    );
  }
  
  export default Login;
  