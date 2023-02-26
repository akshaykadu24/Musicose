import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { Link } from "react-router-dom";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Categories } from "./Categories";
import { AppContext } from "../Context/AppContext";
import { useContext } from "react";
import LoginPopup from "./LoginPopup";
import { CartPopup } from "./CartPopup";
import logo from "./logo.gif";
import {
  Box,
  Container,
  Image,
  Input,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

function Navbar() {
  const [isLargerThan1280] = useMediaQuery("(min-width: 992px)");
  const [isLargerThan576] = useMediaQuery("(min-width: 576px)");
  const [isLargerThan460] = useMediaQuery("(min-width: 460px)");

  const hoverColor = "#3182ce";
  const [login, setLogin] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState(false);

  const { cartData } = useContext(AppContext);

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
      <Box
        bgColor="white"
        boxShadow=" rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;"
        w="100%"
        zIndex={10}
        borderBottom="1px"
        borderBottomColor="#c5c7cc"
        position="sticky"
        top="0"
        mb="5px"
      >
        {isLargerThan460 ? (
          <Box color={"white"} bg="black" textAlign={"center"} p="7px 20px">
            Plug in to festivities with 75% OFF! Come Sail with boAt 💃{" "}
          </Box>
        ) : (
          <Box color={"white"} bg="black" textAlign={"center"} p="7px 20px">
            Come Sail with boAt 💃
          </Box>
        )}

        <Container maxW="container.xl">
          <Stack direction="row">
            <Box p="3">
              <Stack direction="row" spacing={8}>
                <Link to="/">
                  <Image
                    w="90px"
                    height="70px"
                    src={logo}
                    alt="boAt"
                    borderRadius={10}
                  />
                </Link>
                {isLargerThan576 ? (
                  <Stack
                    direction="row"
                    spacing={8}
                    fontSize="18px"
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text
                      onMouseEnter={handleDrop}
                      onMouseLeave={removeDrop}
                      cursor="pointer"
                      _hover={{
                        color: hoverColor,
                        textDecoration: "underline",
                      }}
                    >
                      CATEGORIES <ChevronDownIcon />
                      {show && <Categories />}
                    </Text>

                    <Link to={"/sailwithboAt"}>
                      <Text
                        cursor="pointer"
                        _hover={{
                          color: hoverColor,
                          textDecoration: "underline",
                        }}
                      >
                        SAIL WITH BOAT
                      </Text>
                    </Link>
                    <Link to={"/offerZone"}>
                      <Text
                        _hover={{
                          color: hoverColor,
                          textDecoration: "underline",
                        }}
                        cursor="pointer"
                      >
                        Offer Zone
                      </Text>
                    </Link>
                  </Stack>
                ) : (
                  <Menu>
                    <MenuButton
                      _hover={{
                        color: hoverColor,
                        textDecoration: "underline",
                      }}
                      fontSize="14px"
                      fontWeight="500"
                      onMouseEnter={handleMenu}
                      onMouseLeave={removeMenu}
                      cursor="pointer"
                    >
                      More <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                      <Link to="/sailwithboAt">
                        <MenuItem
                          _hover={{
                            color: hoverColor,
                            textDecoration: "underline",
                          }}
                        >
                          Gift WITH BOAT
                        </MenuItem>
                      </Link>

                      <Link to="/offerZone">
                        <MenuItem
                          _hover={{
                            color: hoverColor,
                            textDecoration: "underline",
                          }}
                        >
                          Offer Zone
                        </MenuItem>
                      </Link>
                      <Link to="/">
                        <MenuItem
                          _hover={{
                            color: hoverColor,
                            textDecoration: "underline",
                          }}
                        >
                          About Us
                        </MenuItem>
                      </Link>
                    </MenuList>
                  </Menu>
                )}
              </Stack>
            </Box>
            <Spacer />
            <Box p="6">
              {isLargerThan1280 ? (
                <Stack direction="row" spacing={8} align="center">
                  <SearchIcon
                    alignItems={"center"}
                    position={"absolute"}
                    zIndex="5"
                    color={"black"}
                    top="75px"
                    ml="40px"
                  />
                  <Input
                    w="350px"
                    p="0px 35px"
                    placeholder="Search..."
                    color={"black"}
                    borderRadius={"20px"}
                    bg="#EAEAEA"
                    top="0px"
                  />
                  <FaUser
                    fontSize={24}
                    cursor={"pointer"}
                    onClick={() => setLogin(!login)}
                  />
                  {login ? (
                    <LoginPopup setLogin={setLogin} login={login} />
                  ) : null}
                  <Box>
                    <p
                      onClick={() => setCartShow(!cartShow)}
                      style={{
                        height: "20px",
                        width: "20px",
                        backgroundColor: "red",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        fontSize: "11px",
                        position: "absolute",
                        marginLeft: "12px",
                        top: "57px",
                        color: "white",
                      }}
                    >
                      {cartData.length}
                    </p>
                    <IoMdCart
                      fontSize={26}
                      cursor={"pointer"}
                      onClick={() => setCartShow(!cartShow)}
                    />
                  </Box>
                  <CartPopup show={cartShow} setCartShow={setCartShow} />
                </Stack>
              ) : (
                <Stack direction="row" spacing={8} align="center" p="1">
                  {isLargerThan576 ? null : (
                    <Menu>
                      <MenuButton>
                        <ImSearch />
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          _hover={{
                            color: hoverColor,
                            textDecoration: "underline",
                          }}
                        >
                          Airpods
                        </MenuItem>
                        <MenuItem
                          _hover={{
                            color: hoverColor,
                            textDecoration: "underline",
                          }}
                        >
                          Headphones
                        </MenuItem>
                        <MenuItem
                          _hover={{
                            color: hoverColor,
                            textDecoration: "underline",
                          }}
                        >
                          TRebel Women
                        </MenuItem>
                        <MenuItem
                          _hover={{
                            color: hoverColor,
                            textDecoration: "underline",
                          }}
                        >
                          Speaker
                        </MenuItem>
                        <MenuItem
                          _hover={{
                            color: hoverColor,
                            textDecoration: "underline",
                          }}
                        >
                          Wired Headphones
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                  <FaUser
                    fontSize={24}
                    cursor={"pointer"}
                    onClick={() => setLogin(!login)}
                  />
                  {login ? (
                    <LoginPopup setLogin={setLogin} login={login} />
                  ) : null}
                  <Box>
                    <p
                      onClick={() => setCartShow(!cartShow)}
                      style={{
                        height: "20px",
                        width: "20px",
                        backgroundColor: "red",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        fontSize: "11px",
                        position: "absolute",
                        marginLeft: "12px",
                        top: "57px",
                        color: "white",
                      }}
                    >
                      {cartData.length}
                    </p>
                    <IoMdCart
                      fontSize={26}
                      cursor={"pointer"}
                      onClick={() => setCartShow(!cartShow)}
                    />
                  </Box>
                  <CartPopup show={cartShow} setCartShow={setCartShow} />
                </Stack>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Navbar;
