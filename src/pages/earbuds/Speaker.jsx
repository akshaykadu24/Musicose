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
    useToast,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { StarIcon } from "@chakra-ui/icons";
  import { useDispatch, useSelector } from "react-redux";
  import { getearbudproduct, getSingleData, getspeakerproduct } from "../../redux/product/product.action";
  import { BsFillFilterSquareFill } from "react-icons/bs";
  import { Link, useNavigate } from "react-router-dom";
  import ProductHeader from "../../components/Revati_components/ProductHeader";
  import SideBar from "../../components/Revati_components/SideBar";
  import axios from "axios";
  import Products_box from "../../components/Revati_components/Products_box";
  import { addCart, getCartItems } from "../../redux/cart/cart.action";
  //import { store } from "../../redux/store";
  
  const Speaker = () => {
    
    const [slider, setSlider] = useState(0);
    const low = Number((slider[0] * 3199) / 100);
    const high = Number((slider[1] * 3199) / 100);
    const [sort, setSort] = useState("");
    const [popularity, setPopularity] = useState("");
    const [alphabet, setAlphabet] = useState("");
    const [ascending, setAscending] = useState("");
    const [descending, setDescending] = useState("");
    const [alphasort, setAlphasort] = useState([]);
    const navigate = useNavigate()
    
  
    if (sort == "pop-desc") {
      setSort("");
      setPopularity("desc");
    }
  
    const dispatch = useDispatch();
  
    const products = useSelector((store) => {
      return store.productManager
    });
    // console.log(products.data.products);
    // console.log("revati")
  
  
    
  
    useEffect(() => {
      dispatch(getspeakerproduct( low,high,sort));
      
    }, [ low, high, sort]);
  
    
  
    
  
    return (
  
      
      <>
       <Center py={12} backgroundColor={"rgb(245,245,245)"} >
         <Wrap spacing={"80px"} width={"90%"} justify="center">
           <ProductHeader products={products.speaker.products} category={"Speaker"}  sort={sort}setSort={setSort}
              
            />
       
            <Box w={{ base: "75%", md: "85%", lg: "95%" }} display={"grid"}
              gridTemplateColumns={{
                base: "repeat(1,1fr)",
                sm:"repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(3,1fr)",
              }}
              gap={"15px"}
              m={"auto"}
              h={"auto"}
              style={{marginTop:"-50px"}}
            >
             
  
              {
              // products.data.products.length > 0 &&
                products.speaker.products?.map((e, i) => ( 
                
                  <Products_box e={e}/>
                  
                ))}
            </Box>
          </Wrap>
  
        </Center>
      </>
    );
  };
  
  export default Speaker;
  