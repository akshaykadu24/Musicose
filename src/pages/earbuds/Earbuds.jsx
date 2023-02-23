import {
  Box,
  // Drawer,
  // DrawerBody,
  // DrawerCloseButton,
  // DrawerContent,
  // DrawerHeader,
  // DrawerOverlay,
  Text,
  useDisclosure,
  Grid,
  GridItem,
  Image,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getearbudproduct } from "../../redux/product/product.action";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const EarbudProducts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");

  const dispatch = useDispatch();
  const products = useSelector((store) => {
    return store.productManager;
  });
  console.log(products.data);

  useEffect(() => {
    dispatch(getearbudproduct());
  }, []);

  return (
    <>
      <Box
        display={{ base: "block", lg: "flex" }}
        p="10px"
        position="relative"
        style={{ border: "1px solid red" }}
      >
        {/* <Box
          flex={0.27}
          display={{ base: "none", lg: "block" }}
          style={{ border: "1px solid black", height: "450px" }}>
          <Box
            pl="12px"
            display={{ base: "flex", lg: "none" }}
            alignItems="center">
            <BsFillFilterSquareFill onClick={onOpen} fontSize={20} color="#E40046"/>
            <Text onClick={onOpen} cursor="pointer" fontSize="20px" fontWeight="bold" ml="7px" color={"black"}>
              Filter
            </Text>
            <Drawer  placement={placement}  onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Filter</DrawerHeader>
                <DrawerBody>
                  






                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Box> */}

        <Box flex={1} p="15px 15px" style={{ border: "1px solid red" }}>
          {products.data.length === 0 && (
            <Box>
              <Image
                width="600px"
                h="500px"
                m="auto"
                src="https://media.tenor.com/unvXyxtdn3oAAAAC/no-result.gif"
              />
            </Box>
          )}

          <Grid
            templateColumns={{
              base: "repeat(1,1fr)",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
              lg: "repeat(3,1fr)",
              xl: "repeat(4,1fr)",
            }}
            rowGap="20px"
            mt="15px"
          >
            {products.data?.map((item) => {
              return (
                <Link to={`/products/${item.id}`}>
                  <GridItem
                    m="auto"
                    p="15px 7px"
                    minW="210px"
                    maxWidth="260px"
                    key={item.id}
                    position="relative"
                    className="product-card"
                  >
                    <Image
                      m="auto"
                      src={item.images}
                      width="200px"
                      height="230px"
                      alt="image"
                    />
                    <Text color="#748A9C" fontSize="14px" mt={2}>
                      {item.subtitle}
                    </Text>
                    <Text color="#748A9C" fontSize="14px">
                      {item.title}
                    </Text>
                    <HStack
                      display="flex"
                      h="30px"
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Text
                        fontSize="13px"
                        color="#D6D0DB"
                        textDecoration="line-through"
                      >
                        Rs. {item.strike_price}
                      </Text>
                      <b fontSize="13px">Rs. {item.price}</b>

                      <Tag size="xs" fontSize="12px" colorScheme="gray">
                        {item.discount}
                      </Tag>
                    </HStack>

                    <Box display="flex" alignItems="center">
                      {Array(5)
                        .fill("")
                        .map((e, i) => (
                          <StarIcon
                            boxSize={3}
                            key={i}
                            color={
                              i < Math.floor(item.rating)
                                ? "yellow.400"
                                : "gray.300"
                            }
                          />
                        ))}
                      <Box as="span" ml="2" color="#D6D0DB" fontSize="sm">
                        ({item.rating})
                      </Box>
                    </Box>
                  </GridItem>
                </Link>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default EarbudProducts;
