import { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  HStack,
  Image,
  Input,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Categories } from "./Categories";
// import { MenuDrop } from "./MenuDrop";
import LoginPopup from "./LoginPopup";
// import { CartPopup } from "./CartPopup";
import "./Navbar.css";
import { NavSlider } from "./NavSlider";

function Navbar() {
  const [login, setLogin] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState(false);

  const cartCount = {
    height: "20px",
    width: "20px",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    fontSize: "11px",
    position: "absolute",
    right: "40px",
    top: "10px",
    color: "white",
    paddingTop: "1px",
  };

  const handleDrop = () => {
    setShow(!show);
  };

  const removeDrop = () => {
    setShow(!show);
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  const removeMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      {/* <Stack
        w={"100%"}
        color={"white"}
        bg="black"
        textAlign={"center"}
        p="7px 20px"
      >
        Plug in to festivities with 75% OFF! Come Sail with boAt 💃{" "}
      </Stack> */}

      <Flex
        justify={"flex-start"}
        align={"center"}
        bg="white"
        color={"black"}
        mb={"5px"}
        position={"sticky"}
        zIndex={"10"}
        top="0px"
        boxShadow={" rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;"}
      >
        <HStack w={"68%"} justify={"flex-start"} align={"center"}>
          <Box>
            <Link to={"/"}>
              <Image
                padding={"15px"}
                width={"100px"}
                marginLeft={"20px"}
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Asset_2_288x-8_5_small.png?v=1661838672"
                alt="boAt"
              />
            </Link>
          </Box>

          <UnorderedList
            mr={"10px"}
            alignItems={"center"}
            listStyleType={"none"}
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
          >
            <HStack justify={"center"} align={"center"}>
              <ListItem
                onMouseEnter={handleDrop}
                onMouseLeave={removeDrop}
                cursor="pointer"
                p={"10px 5px"}
                _hover={{ textDecoration: "underline" }}
                fontSize={{ base: "13px", sm: "14px", md: "14px", lg: "15px" }}
              >
                CATEGORIES <ChevronDownIcon />
                {show && <Categories />}
              </ListItem>

              <Link to={"/sailwithboAt"}>
                <ListItem
                  cursor="pointer"
                  p={"10px 5px"}
                  _hover={{ textDecoration: "underline" }}
                  fontSize={{
                    base: "13px",
                    sm: "14px",
                    md: "14px",
                    lg: "15px",
                  }}
                >
                  SAIL WITH BOAT
                </ListItem>
              </Link>

              <Link to={"/offerZone"}>
                <ListItem
                  _hover={{ textDecoration: "underline" }}
                  cursor="pointer"
                  p={"10px 5px"}
                  fontSize={{
                    base: "13px",
                    sm: "14px",
                    md: "14px",
                    lg: "15px",
                  }}
                >
                  Offer Zone
                </ListItem>
              </Link>

              <ListItem
                onMouseEnter={handleMenu}
                onMouseLeave={removeMenu}
                cursor="pointer"
                p={"10px 5px"}
                _hover={{ textDecoration: "underline" }}
                fontSize={{ base: "13px", sm: "14px", md: "14px", lg: "15px" }}
              >
                More <ChevronDownIcon />
                {/* {menu && <MenuDrop />} */}
              </ListItem>
            </HStack>
          </UnorderedList>
        </HStack>

        <HStack
          mr={"10px"}
          w={{ base: "80%", sm: "80%", md: "32%", lg: "32%" }}
          justify={"flex-end"}
          align={"center"}
        >
          <UnorderedList
            display={{ base: "none", sm: "block", md: "block", lg: "block" }}
          >
            <Stack w={"100%"} justify={"center"} align={"center"}>
              <HStack
                w={"70%"}
                minW="200px"
                p={"0px 20px"}
                justify={"center"}
                align={"center"}
                borderRadius={"25px"}
                bg="#EAEAEA"
              >
                <SearchIcon alignItems={"center"} zIndex="5" color={"black"} />
                <Input
                  outline={"none"}
                  border={"none"}
                  p={"0px"}
                  w={"100%"}
                  focusBorderColor={"transparent"}
                  placeholder="Search..."
                  color={"black"}
                />
              </HStack>
            </Stack>
          </UnorderedList>

          <HStack
            p={"10px"}
            color="black"
            position={"relative"}
            justify={"space-between"}
            align={"center"}
          >
            <Box>
              <FaUser cursor={"pointer"} onClick={() => setLogin(!login)} />
              {login ? <LoginPopup setLogin={setLogin} login={login} /> : null}
            </Box>

            <Box fontSize={"20px"}>
              <Text
                color={"orangered"}
                position={"absolute"}
                top={"-5px"}
                left={"45px"}
                onClick={() => setCartShow(!cartShow)}
              >
                0
              </Text>
              <IoMdCart
                cursor={"pointer"}
                onClick={() => setCartShow(!cartShow)}
              />
            </Box>
          </HStack>

          <UnorderedList
            display={{ base: "block", sm: "block", md: "none", lg: "none" }}
          >
            <NavSlider />
          </UnorderedList>
        </HStack>
      </Flex>
    </>
  );
}
export default Navbar;
