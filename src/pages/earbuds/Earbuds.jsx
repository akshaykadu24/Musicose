import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
  Grid,
  GridItem,
  Image,
  HStack,
  Tag,
  Button,
  Center,
  Wrap,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getearbudproduct } from "../../redux/product/product.action";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ProductHeader from "../../components/Revati_components/ProductHeader";
import SideBar from "../../components/Revati_components/SideBar";
import axios from "axios";
import Products_box from "../../components/Revati_components/Products_box";

const EarbudProducts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const [search, setSearch] = useState("");
  const [slider, setSlider] = useState(0);
  const low = Number((slider[0] * 3199) / 100);
  const high = Number((slider[1] * 3199) / 100);
  const [sort, setSort] = useState("");
  const [popularity, setPopularity] = useState("");
  const [alphabet, setAlphabet] = useState("");
  const [ascending, setAscending] = useState("");
  const [descending, setDescending] = useState("");
  const [alphasort, setAlphasort] = useState([]);
  const navigate = useNavigate();

  if (sort == "pop-desc") {
    setSort("");
    setPopularity("desc");
  }

  const dispatch = useDispatch();
  const products = useSelector((store) => {
    return store.productManager;
  });
  console.log(products.data);

  useEffect(() => {
    dispatch(
      getearbudproduct(
        search,
        low,
        high,
        sort,
        popularity,
        alphabet,
        ascending,
        descending
      )
    );
  }, [search, low, high, sort, popularity, alphabet, ascending, descending]);

  // const handleClick=()=>{

  //     dispatch(addCart({...product,size:size}));
  //     toast({
  //       title: 'Add to Cart.',
  //       description: "Item added to Cart Successfully.",
  //       status: 'success',
  //       duration: 3000,
  //       isClosable: true,
  //       position:"top"
  //     })
  // }

  let exist = false;
  // let mySize;
  // cartItems.forEach((e)=>{
  //   if(e.id==id){
  //  exist=true;
  //  mySize=e.size;
  //   }
  // })

  return (
    <>
      <Center py={12} backgroundColor={"rgb(245,245,245)"}>
        <Wrap spacing={"80px"} width={"90%"} justify="center">
          <ProductHeader
            products={products}
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            popularity={popularity}
            setPopularity={setPopularity}
            ascending={ascending}
            setAscending={setAscending}
            descending={descending}
            setDescending={setDescending}
          />

          <Box
            w={{ base: "75%", md: "85%", lg: "95%" }}
            display={"grid"}
            gridTemplateColumns={{
              base: "repeat(1,1fr)",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
              lg: "repeat(3,1fr)",
            }}
            gap={"15px"}
            m={"auto"}
            h={"auto"}
            style={{ marginTop: "-50px" }}
          >
            {products.data.length > 0 &&
              products.data?.map((e, i) => (
                <Link to={`/products/${e.id}`}>
                  <Products_box e={e} />
                </Link>
              ))}
          </Box>
        </Wrap>
      </Center>
    </>
  );
};

export default EarbudProducts;
