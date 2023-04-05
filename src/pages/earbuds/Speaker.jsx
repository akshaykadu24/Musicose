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
    Img,
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
  console.log(products)
  
    
  
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
                
                  products.loading? <Box  width='100%' margin={'auto'} marginTop="30px" >
                
                    <Img  margin='auto' marginLeft={{base:"0%",sm: "50%",md: "100%",lg: "100%" ,xl:"100%"}}  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a2c21d7e-02b8-430c-b6a8-255189077a5a/d6i89u6-1957aee4-8182-4a53-8df5-a8a300498751.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EyYzIxZDdlLTAyYjgtNDMwYy1iNmE4LTI1NTE4OTA3N2E1YVwvZDZpODl1Ni0xOTU3YWVlNC04MTgyLTRhNTMtOGRmNS1hOGEzMDA0OTg3NTEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.6JT-iH4XiEArLL2pStH73HKWHnUqVNrSDiCTlkQFZqA"/>
                  </Box>
                :
                products.speaker.products?.map((e, i) => ( 
                
                  <Products_box e={e}/>
                 
                ))
              }
            </Box>
          </Wrap>
  
        </Center>
      </>
    );
  };
  
  export default Speaker;
  