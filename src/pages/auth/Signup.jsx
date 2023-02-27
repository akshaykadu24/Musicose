
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
    ModalCloseButton,
    Select,
    Text
  } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupAction } from "../../redux/authReducer/auth.action";
  


  function Signup() {
    const toast = useToast();
    const [val,setVal] = useState({})
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChange = (e)=>{
      const {name,value} = e.target

      setVal({...val,[name]:value})
    }
    console.log(val)
    const handleSignup = async(e) => {
      let data = await dispatch(signupAction(val))
      console.log(data)

      e.preventDefault();
      toast({
        title: "Congratulations",
        description: "User Registered sucessfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    };
  
    return (
      <>
        <Text fontSize={"18px"} variantcolor="teal" onClick={onOpen}>
          Signup
        </Text>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Signup</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={handleSignup}>

                <FormControl mt={4}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    onChange={(e)=>{handleChange(e)}}
                    id="name"
                    placeholder="Enter your name"
                    aria-describedby="name-helper-text"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={(e)=>{handleChange(e)}}
                    id="email"
                    placeholder="Enter your email"
                    aria-describedby="email-helper-text"
                  />
                </FormControl>
  
                <FormControl mt={4}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    name="pass"
                    onChange={(e)=>{handleChange(e)}}
                    id="password"
                    placeholder="Enter your password"
                    aria-describedby="password-helper-text"
                  />
                </FormControl>
  
                <FormControl mt={4}>
                  <FormLabel htmlFor="userType">User Type</FormLabel>
                  <Select name="type"  onChange={(e)=>{handleChange(e)}}  placeholder='Select User Type' >
                    <option value='user'>USER </option>
                    <option value='admin'>ADMIN</option>
                   
                  </Select>
                  
                </FormControl>
              </form>
            </ModalBody>
  
            <ModalFooter>
              <Button variantcolor="teal" backgroundColor={"Black"} color={"white"} mr={3} onClick={()=>handleSignup()}>
                Signup
              </Button>
              
            </ModalFooter>
          </ModalContent>:
          
          
        </Modal>
      </>
    );
  }
  
  export default Signup;
  


  ////////////////////////////////////////


  