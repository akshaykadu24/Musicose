import {
    FormControl,
    FormLabel,
    Input,
    Button,
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/authReducer/auth.action";
  


  function Login() {
    const toast = useToast();
    const [val,setVal] = useState({})
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {isAuth,msg} = useSelector((store)=>store.authManager)
    const handleChange = (e)=>{
      const {name,value} = e.target

      setVal({...val,[name]:value})
    }
    console.log(val)
    console.log("1")
    useEffect(()=>{
      if(isAuth){
        return (toast({
          title: "Welcome",
          description: msg,
          status: "success",
          duration: 9000,
          isClosable: true,
        }));
      }else{
        return(toast({
          title: "Login Failed",
          description: msg,
          status: "error",
          duration: 9000,
          isClosable: true,
        }));
      }
      console.log("2")
    },[isAuth])

    useEffect(()=>{
      
    })

    console.log("3")
    const handlelLogin = (e) => {
      dispatch(loginAction(val))
      

      e.preventDefault();
      
      onClose();
    };
  
    return (
      <>
        <Button variantcolor="teal" onClick={onOpen}>
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
              <Button variantcolor="teal" backgroundColor={"Black"} color={"white"} mr={3} onClick={handlelLogin}>
                Login
              </Button>
              
            </ModalFooter>
          </ModalContent>:
          
          
        </Modal>
      </>
    );
  }
  
  export default Login;
  