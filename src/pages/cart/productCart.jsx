import {
  Box,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  Image,
  Flex,
  Button,
  Text,
  Input,
  useToast,
  HStack,
  Grid,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart, getCartItems, updateCart } from "../../redux/cart/cart.action";
let api = `${process.env.REACT_APP_MUSICOSE_API}/cart`;

const ProductCart = () => {
  const [quant, setQuant] = useState(0);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [amt, setAmt] = useState(0);
  const [samt, setsAmt] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const toast = useToast();
  const [count, setCount] = useState(0);

  const cartItems = useSelector((store) => {
    return store.cart.cart;
  });
  console.log(cartItems)
  const {user,type} = useSelector((store)=>store.authManager)
  console.log(user)

  useEffect(()=>{
    dispatch(getCartItems(user,type));
  },[count])
  
console.log(cartItems.products)
  useEffect(() => {
    dispatch(getCartItems(user,type));

    fetch(api,{
      headers:{
        "Authorization":JSON.parse(localStorage.getItem("token"))
      }
    })
      .then((res) => res.json())
      .then((data) => {

        let localtype = JSON.parse(localStorage.getItem("type"))
        let useridLocal = JSON.parse(localStorage.getItem("user"))

        let userid = user
        console.log(userid,"id",type,"type",localtype,"b")
        console.log(data.products)
        let filt
        
        if(type||localtype){
            console.log(userid,"1",useridLocal,"2")
            filt = data.products.filter((el)=>el.user==(userid||useridLocal))
            console.log(filt)
        }

        console.log(filt);
        setData(filt);
        let q = 0;
        let s = 0;
        let p = 0;
        for (let j = 0; j < filt.length; j++) {
          q += filt[j].quantity;
          p += filt[j].quantity * filt[j].price;
          s += filt[j].price2 * filt[j].quantity;
        }
        console.log(q,p,s)
        
        setQuant(q);
        setAmt(p);
        setsAmt(s);
      });
  }, [count]);
  console.log(data);


  const removeProduct = (id) => {
    console.log("ok")
    console.log(id)
    dispatch(deleteCart(id));
    
    setCount((prev) => prev + 1);

   // setTimeout(() => {
     // dispatch(getCartItems);
     // window.location.reload();
   // }, 500);
  };

  let handleInc = async (id, price, quantity) => {
    // let res = await fetch(`${api}/${id}`
    // , {
    //   method: "PATCH",
    //   body: JSON.stringify({ quantity: quantity + 1 }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }
    // )
    //   .then((res) => {
    //     res.json()
    //    window.location.reload();
    //  })
    //  .then((res) => {
    //    console.log(res);
        
    //  });

     dispatch(updateCart(id,quantity))
     setCount((prev)=>prev+1)
    console.log(id, api);

    //setRefresh(refresh)
  };

  let handleDec = async (id, price, quantity) => {
    if (quantity == 1) {
      removeProduct(id);
    } else {
      let res = await fetch(`${api}/${id}`
      // , {
      //   method: "PATCH",
      //   body: JSON.stringify({ quantity: quantity - 1 }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
      )
        .then((res) => {
          res.json()
         // window.location.reload();
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const handlecoup = () => {
    if (value == "boat100") {
      setApplied(true);
      return toast({
        title: "YAY!",
        description: "30% off has been applied on your total amount!",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else {
      return toast({
        title: "Error",
        description: "Sorry Inavalid Coupon",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removecoup = () => {
    setApplied(false);
    return toast({
      title: "Coupon dismissed",
      description: "Discount has been discarded",
      status: "warning",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p="40px" mt="20px">
      <Box
        display="flex"
        flexDirection={["column", "column", "row"]}
        gap="40px"
        justifyContent="center"
        alignItems="flex-start">
        <Box w={["100%", "100%", "100%", "100%", "60%"]}>
          <Table>
            <Thead
              boxShadow=" rgba(149, 157, 165, 0.2) 0px 8px 24px"
              bgColor={"white"}>
              <Tr fontSize={"xs"} fontWeight="bold">
                <Td>ITEM</Td>
                <Td>TITLE</Td>
                <Td>PRICE</Td>
                <Td>QUANTITY</Td>
              </Tr>
            </Thead>
            <Tbody>
              
              {
                 data.length>0?( data.map((ele) => {
                  return (
                    <Tr
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      key={ele._id}>
                      <Td fontSize={"xs"} fontWeight="bold" w="15%" p="5px">
                        <Image src={ele.product_item__primary_image} w="100%" />
                      </Td>
                      <Td
                        fontSize={"xs"}
                        fontWeight="bold"
                        w="40%"
                        style={{ border: "0px solid black", padding: "20px" }}>
                        <Box
                          display={"flex"}
                          flexDirection="column"
                          justifyContent={"space-between"}>
                          <Box mb="20px">
                            <Heading size={"md"}>{ele.product_item_meta__title}</Heading>
                          </Box>
                        </Box>
                      </Td>
                      <Td
                        pt="22px"
                        valign="top"
                        fontSize={"xs"}
                        fontWeight="bold">
                        <Box
                          display={"flex"}
                          flexDirection="column"
                          justifyContent={"flex-start"}>
                          <Heading size={"sm"} >₹{ele.price * ele.quantity}.00</Heading>
                          <Heading size={"sm"} color={"gray"} textDecoration={"line-through"}>
                            ₹{ele.price2 * ele.quantity}.00
                          </Heading>
                        </Box>
                      </Td>
                      <Td
                        pt="22px"
                        valign="top"
                        fontSize={"xs"}
                        fontWeight="bold">
                        <Box
                          display="flex"
                          justifyContent={"space-evenly"}
                          border="1px solid black">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleDec(ele._id, ele.price, ele.quantity)
                            }>
                            -
                          </span>
                          <Heading size={"md"} display="inline" px="2px">
                            {ele.quantity}
                          </Heading>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleInc(ele._id, ele.price, ele.quantity)
                            }>
                            +
                          </span>
                        </Box>

                        <Flex gap="2px" p="2px">
                          <Button
                            color={"white"}
                            bgColor="#004d3d"
                            onClick={() => removeProduct(ele._id)}
                            w={{ lg: "100%", md: "100%", sm: "100%" }}
                            size="xs"
                            mt={{ lg: "70px" }}
                            padding="19px"
                            fontSize="20px">
                            Remove
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  )
                })):(
                  <>NO Items in Cart</>
              )   
              }
                
            </Tbody>
          </Table>
        </Box>

        <Box w={["100%", "100%", "100%", "100%", "30%"]}>
          <Box m="auto" display={"flex"} flexDirection="column">
            <Box
              p="20px"
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              gap="20px"
              display={"flex"}
              flexDirection="column"
              w="100%">
              <Box display="flex" flexDirection={"column"} gap="20px">
                <Box
                  fontSize={"14px"}
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems={"center"}>
                  <Box>
                    <Heading size={"sm"} marginTop={"10px"} fontWeight={"bold"}>Subtotal</Heading>
                    <Heading size={"sm"} marginTop={"10px"} fontWeight={"bold"}>Discount</Heading>
                    <Heading size={"sm"} marginTop={"10px"}
                      fontWeight={"bold"}
                      display={applied === true ? "block" : "none"}>
                      Coupon Discount
                    </Heading>
                    <Heading size={"sm"} marginTop={"10px"} fontWeight={"bold"}>Shipping Charges</Heading>
                  </Box>
                  <Box>
                    <Heading size={"sm"} marginTop="10px">&nbsp;&nbsp;₹{samt}.00 </Heading>
                    <Heading size={"sm"} marginTop="10px">- ₹{samt - amt}.00 </Heading>
                    <Heading size={"sm"} marginTop="10px" display={applied === true ? "block" : "none"}>
                      &nbsp;- ₹{(amt * 0.3).toFixed(2)}{" "}
                    </Heading>
                    <Text marginTop="10px">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹0.00{" "}
                    </Text>
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent="space-between">
                  <Heading size={"sm"} marginTop="10px" fontWeight={"bold"}>Total Price</Heading >
                  <Heading size={"sm"} marginTop="10px" fontWeight={"bold"}>
                    ₹
                    {applied === true ? (amt * 0.7).toFixed(2) : amt.toFixed(2)}
                  </Heading >
                </Box>
              </Box>

              <Button
                bgColor="#004d3d"
                color="white"
                onClick={() => {
                  navigate("/checkout");
                }}>
                Checkout
              </Button>
              <Button bgColor={"rgb(255,255,255)"}>
                <Image
                  src="data:image/png;base64,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"
                  height="100%"></Image>
              </Button>
            </Box>
            <Box
              p="30px"
              mt="40px"
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
              <Text fontStyle={"italic"} fontWeight="bold">
                Have A coupon code?
              </Text>
              <Input
                display={applied === false ? "inline" : "none"}
                w="100%"
                value={value}
                onChange={(e) => setValue(e.target.value)}></Input>
              <Button
                bgColor="#004d3d"
                color="white"
                w="100%"
                mt="10px"
                onClick={!applied ? handlecoup : removecoup}>
                {applied ? "Remove Coupon" : "Apply"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box border="1px solid gray" marginTop="30px"></Box>

      <Grid
        m={"auto"}
        w="95%"
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        p={"20px 0px"}>
        <Box
          pt={"10px"}
          mb={"20px"}
          fontSize={{ base: "16px", sm: "15px", md: "16px", lg: "18px" }}>
          <Text
            fontSize={{ base: "17px", sm: "17px", md: "17px", lg: "18px" }}
            textAlign="left"
            fontWeight={"bold"}>
            Accepted Payment Methods
          </Text>
          <HStack m={"5px 0"}>
            <Image
              src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/04/Regalia-HDFC.png.webp"
              style={{ width: "10%", height: "100%" }}></Image>
            <Image
              src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/simplysave-credit-card.jpg.webp"
              style={{
                width: "10%",
                height: "100%",
                marginLeft: "10px",
              }}></Image>
            <Image
              src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/ICICI-Coral-Contactless-Card.jpg.webp"
              style={{
                width: "10%",
                height: "100%",
                marginLeft: "10px",
              }}></Image>
            <Image
              src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/11/222.png.webp"
              style={{
                width: "10%",
                height: "100%",
                marginLeft: "10px",
              }}></Image>
            <Image
              src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/Citi-Cash-Back-Credit-Card.jpg.webp"
              style={{
                width: "10%",
                height: "100%",
                marginLeft: "10px",
              }}></Image>
            <Image
              src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/YES-Prosperity-Rewards-Plus.jpg.webp"
              style={{
                width: "10%",
                height: "100%",
                marginLeft: "10px",
              }}></Image>
          </HStack>

          <Text textAlign="left">
            Need help? Call 1.888.282.6060 or chat with us
          </Text>
          <Text textAlign="left">Shipping internationally?</Text>
        </Box>

        <Box>
          <Image
            src="https://storage.needpix.com/rsynced_images/discount-2789863_1280.png"
            style={{ height: "100%" }}
            w={{ sm: "70%", lg: "50%" }}
            ml={{ sm: "-50px", lg: "150px" }}></Image>
        </Box>
      </Grid>
    </Box>
  );
};

export default ProductCart;
