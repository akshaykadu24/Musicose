import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Divider,
  Image,
  useToast,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export function CartPopup({ show, setCartShow }) {
  const toast = useToast();
  const navigate = useNavigate();

  const { cartData, handleQunatity, handleDelete, total } =
    useContext(AppContext);

  const handleClose1 = () => {
    const credData = JSON.parse(localStorage.getItem("LoginCreds")) || [];
    if (credData.length === 0) {
      toast({
        title: `Please login first !!!`,
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true,
      });
      setCartShow(!show);
      navigate("/login");
    } else {
      setCartShow(!show);
      navigate("/checkout");
    }
  };

  const handleClose = () => {
    setCartShow(!show);
  };

  return (
    <Box>
      <Drawer
        size={"sm"}
        width="1000px"
        isOpen={show}
        placement="right"
        onClose={handleClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Box bg="red" height={"42px"}>
            <Flex color={"white"} p="7px" alignItems={"center"}>
              <Text fontSize={"lg"} fontWeight={"700"} ml="20px">
                Your Cart
              </Text>
              <Spacer />
              <Box>
                <DrawerCloseButton mt={"-4px"} onClick={handleClose} />
              </Box>
            </Flex>
          </Box>

          <Box bg="black">
            <Text ml="10px" p="7px" fontSize={"sm"} color={"white"}>
              Free Shipping sitewide | Cash On Delivery available for order
              value upto ₹3000
            </Text>
          </Box>

          <DrawerBody>
            {cartData.length === 0 && (
              <Flex
                gap="1rem"
                mt="250px"
                alignItems="center"
                flexDirection={"column"}
              >
                <Text fontSize={"lg"} fontWeight={"700"}>
                  {" "}
                  Your Cart is Empty{" "}
                </Text>
                <Button
                  _hover={{ bg: "red" }}
                  color={"white"}
                  bg="tomato"
                  onClick={handleClose}
                  padding={"25px"}
                >
                  Start Shopping
                </Button>
              </Flex>
            )}

            <Box border={""}>
              {cartData.map((item) => (
                <>
                  <Flex alignItems={"center"} mb="5px">
                    <Image w="130px" src={item.image} alt={item.pname} />
                    <Box w="100%" ml="10px">
                      <Text
                        fontWeight={"bold"}
                        fontSize={"15px"}
                        noOfLines={"1"}
                      >
                        {item.pname || item.title}
                      </Text>
                      <Flex gap="2rem">
                        <Text ml="5px" fontWeight={"bold"} color={"red"}>
                          RS. {item.price}
                        </Text>
                        <Text textDecoration={"line-through"}>
                          RS. {item.strprice || item.strike_price}
                        </Text>
                      </Flex>
                      <Flex ml="5px" mt="10px">
                        <Button
                          disabled={item.quantity === 1}
                          onClick={() => handleQunatity(item.id, -1)}
                          p="0"
                          alignItems={"center"}
                          fontSize={"18px"}
                          justifyContent={"center"}
                          textAlign={"center"}
                          fontWeight={"1000"}
                          color="red"
                          size={"xs"}
                          borderRadius={"50%"}
                          border={"1px solid black"}
                          bg="white"
                          pb={"2px"}
                        >
                          -
                        </Button>
                        <Text p="0px 15px">{item.quantity}</Text>
                        <Button
                          disabled={item.quantity === 10}
                          onClick={() => handleQunatity(item.id, 1)}
                          fontSize={"18px"}
                          p="0"
                          justifyContent={"center"}
                          alignItems={"center"}
                          textAlign={"center"}
                          fontWeight={"1000"}
                          color="red"
                          size="xs"
                          borderRadius={"50%"}
                          border={"1px solid black"}
                          bg="white"
                          pb={"2px"}
                        >
                          +
                        </Button>
                        <Spacer />
                        <FaTrashAlt
                          onClick={() => handleDelete(item.id)}
                          color="grey"
                          cursor={"pointer"}
                        />
                      </Flex>
                    </Box>
                  </Flex>
                  <Divider borderColor="black" />
                </>
              ))}
            </Box>
          </DrawerBody>

          {cartData.length !== 0 && (
            <DrawerFooter h="270px">
              <Box w="100%">
                <Divider borderColor="grey" border={"1px solid black"} />
                <Flex fontWeight={"bold"} color="black" p="0 10px">
                  <Text> Shipping :</Text>
                  <Spacer />
                  <Text> Free</Text>
                </Flex>
                <Flex fontWeight={"bold"} color="black" p="0 10px">
                  <Text>Total</Text>
                  <Spacer />
                  <Text> RS. {total}</Text>
                </Flex>
                <Link to="/">
                  <Text
                    mt="20px"
                    mb="10px"
                    fontWeight={"bold"}
                    color="red"
                    p="5px"
                    textAlign={"center"}
                  >
                    Continue Shopping
                  </Text>
                </Link>

                <Button
                  _hover={"none"}
                  p="5px"
                  w="100%"
                  m="auto"
                  display={"block"}
                  bg="red"
                  color="white"
                  b="20px"
                  onClick={handleClose1}
                >
                  CASH ON DELIVERY/UPI
                </Button>

                <Button
                  border={"2px solid red"}
                  _hover={"none"}
                  w="100%"
                  m="auto"
                  mt="15px"
                  bg="white"
                  color="red"
                  p="5px"
                  onClick={handleClose1}
                >
                  PAY VIA CARD/OTHERS
                </Button>
              </Box>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
