import {
  Box,
  Button,
  Flex,
  Image,
  Tag,
  Text,
  Badge,
  Stack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DetailHeader from "../../components/Revati_components/DetailHeader";
import {  AiFillTag } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getSingleData } from "../../redux/product/product.action";
import { TrendingSlider } from "../../components/Revati_components/slider";
import { BsBag } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pincode, setPincode] = useState("");

  const dispatch = useDispatch();

  const product = useSelector((store) => {
    return store.productManager.product;
  });

  useEffect(() => {
    dispatch(getSingleData(id));

    // dispatch(getCartItems());
  }, []);

  let exist = false;
  //      cartItems.forEach((e)=>{
  //     if(e.id==id){
  //      exist=true;

  //       }
  //    })

  const handleClick = () => {
    //   dispatch(addCart({...product}));
    //   toast({
    //     title: 'Add to Cart.',
    //     description: "Item added to Cart Successfully.",
    //     status: 'success',
    //     duration: 3000,
    //     isClosable: true,
    //     position:"top"
    //   })
  };

  const handlePincode = (e) => {
    setPincode(e.target.value);
  };
  //console.log(pincode)

  return (
    <>
      <Box
        display={{ lg: "flex", base: "block" }}
        w="90%"
        m="auto"
        mt="40px"
        boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px">
        <Box
          flex={{ xl: "0.5", lg: "0.6" }}
          p={{ xl: "25px", lg: "25px 10px", md: "25px", base: "25px" }}>
          <Image
            fallbackSrc="https://www.shutterstock.com/image-vector/not-available-grunge-rubber-stamp-260nw-549465931.jpg"
            m={{ lg: "0px", base: "auto" }}
            w="100%"
            maxW={{ lg: "100%", base: "350px" }}
            src={product.images}
          />
        </Box>

        <Box flex="1" p="30px">
          <DetailHeader product={product} />
          <hr style={{ marginTop: "10px" }} />

          <Flex direction={{ sm: "row", base: "column" }} mt="20px" mb="10px">
            <Box flex="1">
              <Text
                color="teal"
                fontSize={{ md: "14px", base: "13px" }}
                mt={{ xl: "10px" }}
                ml={{ xl: "-160px", sm: "-40px" }}>
                <span style={{ marginRight: "5px" }} color="teal">
                  MRP
                </span>
                <span style={{ textDecoration: "line-through" }} color="teal">
                  {" "}
                  {product.strike_price}
                </span>
                <span
                  className="taxes"
                  style={{ marginLeft: "5px" }}
                  color="teal">
                  (Inclusive of all Taxes)
                </span>
              </Text>
              <Box display="flex" mt={{ xl: "40px" }} ml={{ xl: "10px" }}>
                <Box mr="10px">
                  <Text
                    color="#FF2341"
                    fontSize={{ md: "22px", base: "18px", lg: "25px" }}
                    fontWeight={{ lg: "bold" }}>
                    RS. {product.price}
                  </Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <Tag >{product.discount}</Tag>
                </Box>
              </Box>
            </Box>

            <Box flex="1" display="flex" justifyContent="flex-end">
              <Box width={{ xl: "80%", lg: "100%", md: "90%", base: "100%" }}>
                <Box mb="7px">
                  <Text
                    fontSize={{
                      xl: "15px",
                      lg: "14px",
                      md: "14px",
                      base: "11px",
                    }}
                    color="#747774">
                    (2) Offers | Applicable on Cart
                  </Text>
                </Box>
                <Box
                  border="2px solid #747774"
                  p="10px 10px"
                  borderStyle="dashed"
                  color="teal">
                  <Flex mb="5px" pb="5px" borderBottom="1px solid #747774">
                    <Box flex="0.20">
                      <Tag
                        size={{ xl: "md", lg: "sm", md: "md", base: "xs" }}
                        bgColor="#5EA8C8"
                        p={{
                          xl: "4px 4px",
                          lg: "2px 2px",
                          md: "4px 4px",
                          base: "2px 2px",
                        }}>
                        <AiFillTag color="white" fontSize={20} />
                      </Tag>
                    </Box>
                    <Box flex="1">
                      <Text
                        lineHeight={1.3}
                        color="#747774"
                        fontSize={{
                          xl: "15px",
                          lg: "14px",
                          md: "14px",
                          base: "11px",
                        }}>
                        15% Instant Discount Using AU Small Finance Bank Debit &
                        Credit Cards.
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>
                    <Box flex="0.20">
                      <Tag
                        size={{ xl: "md", lg: "sm", md: "md", base: "xs" }}
                        bgColor="#5EA8C8"
                        p={{
                          xl: "4px 4px",
                          lg: "2px 2px",
                          md: "4px 4px",
                          base: "2px 2px",
                        }}>
                        <AiFillTag color="white" fontSize={20} />
                      </Tag>
                    </Box>
                    <Box flex="1">
                      <Text
                        lineHeight={1.3}
                        color="#747774"
                        fontSize={{
                          xl: "15px",
                          lg: "14px",
                          md: "14px",
                          base: "11px",
                        }}>
                        Apply for a Boat BOB Credit Card & get 5% Unlimited
                        Cashback.
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Flex>

          <Box p="20px 0px">
            <Box
              h={{ xl: "125px", lg: "105px", md: "105px", base: "75px" }}
              alignItems="center">
              <Box
                flex={{ md: "0.15", sm: "0.25", base: "0" }}
                display={{ md: "block", base: "block" }}></Box>
              <Box flex="1">
                {
                  <Button
                    colorScheme="red"
                    ml={{ xl: "-410px", lg: "-410px" }}
                    w={{ sm: "100%", lg: "50%", xl: "50%" }}
                    _hover={{
                      bgColor: "white",
                      color: "#333333",
                      border: "2px solid #333333",
                    }}
                    onClick={handleClick}>
                    <BsBag />
                    <span>-</span> ADD TO CART
                  </Button>
                }
              </Box>
              <Box flex="0.2" display={{ md: "block", base: "none" }}></Box>
            </Box>

            <Badge
              w={{ base: "90%", sm: "100%", lg: "100%", xl: "100%" }}
              borderRadius="full"
              p={2}
              px="2"
              colorScheme="teal">
              You will receive cashback worth ₹76 on this purchase
            </Badge>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}>
              <MdLocalShipping />
              <Text> delivery within 1 week</Text>
            </Stack>

            <Box display="flex">
              <Box
                flex={{ xl: "0.15", lg: "0.2", md: "0.2", base: "0.25" }}
                display="flex"
                alignItems="center"></Box>
              <Box flex="1"></Box>
              <Box
                flex={{ md: "0.2", base: "0.3" }}
                display={{ md: "flex", base: "none" }}></Box>
            </Box>

            {/* <Box display="flex"   >
        <Box flex={{xl:"0.15",lg:"0.2",md:"0.2",base:"0.25"}}></Box>
        <Box flex="1" >
        <Box>
         <UnorderedList>
          <ListItem fontSize={{md:"16px",base:"13px"}}>Delivery in 4-6 days</ListItem>
          <ListItem fontSize={{md:"16px",base:"13px"}} >Cash on Delivery also available for this location</ListItem>
         </UnorderedList>
        </Box>
        </Box>
        
        <Box flex={{md:"0.2",base:"0.3"}} display={{md:"flex",base:"none"}} ></Box>
       </Box> */}
          </Box>
        </Box>
      </Box>

      <Box>
        <Image
          w={{ sm: "100%", lg: "100%", xl: "100%" }}
         src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD175-web_718c99fd-75ff-45bb-b448-4166822698c3.png?v=1653473462"/>
      </Box>

      <Box>
        <TrendingSlider />
      </Box>
      
    </>
  );
};

export default SingleProduct;
