
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateProduct } from "../../redux/adminReducer/admin.action";
import { UpdateAction } from "../../redux/authReducer/auth.action";
  


  function UpdateProduct({el}) {
    const toast = useToast();
    const [val,setVal] = useState({})
    const [prod,setProd]  = useState({})
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure();

    // let {products} = useSelector((store)=>store.adminManager)
    // console.log(products)
    console.log(el,"l")
    // let produ = products.filter((item)=>item._id==el)
    // setProd()
    // console.log(produ,'b')
    

    // document.getElementById("product_item_meta__title").value = "lavu"
    // document.getElementById("product_item__primary_image").value = prod.product_item__primary_image
    // document.getElementById("product_item__secondary_image").value = prod.product_item__secondary_image
    // document.getElementById("category").value = prod.category
    // document.getElementById("price").value = prod.price
    // document.getElementById("price2").value = prod.price2
    // document.getElementById("feature").value = prod.feature
    // document.getElementById("feature2").value = prod.feature2
    // document.getElementById("feature3").value = prod.feature3



    useEffect(()=>{
        // dispatch(getProducts())
    },[])

    const handleChange = (e)=>{
      const {name,value} = e.target

      setVal({...val,[name]:value})
    }
    console.log(val)

    const handleUpdate = async(e) => {
        dispatch(updateProduct(el._id,val))
        setCount((prev)=>prev+1)
      dispatch(getProducts())
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
        <Text variantcolor="teal" backgroundColor={"blue"} color={"white"} textAlign={"center"} padding={"5px"} borderRadius={"8%"} fontWeight={"medium"} fontSize={["sm","xl"]} onClick={onOpen}>
          Update
        </Text>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader backgroundColor={"skyblue"}>Update</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={handleUpdate}>

                <FormControl mt={4}>
                  <FormLabel htmlFor="name">Title</FormLabel>
                  <Input
                //   value={el.product_item_meta__title}
                    type="text"
                    name="product_item_meta__title"
                    onChange={(e)=>{handleChange(e)}}
                    id="product_item__primary_image"
                    placeholder="Enter product Name"
                   
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="img">Image</FormLabel>
                  <Input
                    type="text"
                    name="product_item__primary_image"
                    onChange={(e)=>{handleChange(e)}}
                    id="product_item__primary_image"
                    placeholder="Image 1"
                  />
                </FormControl>
  
               
                
                <FormControl mt={4}>
                  <FormLabel htmlFor="password">Image2</FormLabel>
                  <Input
                    type="text"
                    name="product_item__secondary_image"
                    onChange={(e)=>{handleChange(e)}}
                    id="product_item__secondary_image"
                    placeholder="Image 2"
                  />
                </FormControl>
  
                <FormControl mt={4}>
                  <FormLabel htmlFor="userType">Category</FormLabel>
                
                  <Select name="category"  onChange={(e)=>{handleChange(e)}}  id="category" placeholder='Select Category' >
                    <option value='watch'>Watch </option>
                    <option value='earbud'>Earbuds</option>
                    <option value='headphone'>Headphone</option>
                    <option value='speaker'>Speaker</option>
                    <option value='bluetoothHeadphone'>Bluetooth Headphone</option>

                    
                    </Select>
                  
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="password">Offer Price</FormLabel>
                  <Input
                    type="text"
                    name="price"
                    onChange={(e)=>{handleChange(e)}}
                    id="price"
                    placeholder="Offer Price"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="password">MRP Price</FormLabel>
                  <Input
                    type="text"
                    name="price2"
                    onChange={(e)=>{handleChange(e)}}
                    id="price2"
                    placeholder="MRP Price"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="password">feature1</FormLabel>
                  <Input
                    type="text"
                    name="feature"
                    onChange={(e)=>{handleChange(e)}}
                    id="feature"
                    placeholder="feature1"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="password">feature2</FormLabel>
                  <Input
                    type="text"
                    name="feature2"
                    onChange={(e)=>{handleChange(e)}}
                    id="feature2"
                    placeholder="feature2"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="password">feature3</FormLabel>
                  <Input
                    type="text"
                    name="feature3"
                    onChange={(e)=>{handleChange(e)}}
                    id="feature3"
                    placeholder="feature3"
                  />
                </FormControl>



              </form>
            </ModalBody>
  
            <ModalFooter>
              <Button variantcolor="teal" backgroundColor={"Black"} color={"white"} mr={3} onClick={()=>handleUpdate()}>
                Update
              </Button>
              
            </ModalFooter>
          </ModalContent>:
          
          
        </Modal>
      </>
    );
  }
  
  export default UpdateProduct;
  