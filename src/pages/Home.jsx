import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import { Dailydeals } from "../components/Dailydeals";
import Footer from "../components/Footer";
import Gifcarousel from "../components/Gifcarousel";
import Gifs from "../components/Gifs";
import Landingcarousel from "../components/Landingcarousel";
import { useDispatch, useSelector } from "react-redux";
import { getwatchproduct } from "../redux/product/product.action";
import { ProductCarousel } from "../components/Carousal/Carousal/ProductCarousel";
// import { Dailydeals } from "../components/Dailydeals";
// import Header from "../components/Header";
// import { Dailydeals } from "../components/Dailydeals";
const Home = () => {

  let dispatch = useDispatch()
  let data = useSelector((store=>store.productManager))
  console.log(data)

  useEffect(()=>{
    dispatch(getwatchproduct())
  },[])

  return (
    <div>
      {/* <Header />; */}
      
      <Carousel />
      {/* <Dailydeals /> */}
      <Dailydeals />

  
          <ProductCarousel  data={data.watch.products}/>
 

      <Landingcarousel />
      <Gifcarousel />
      <Gifs/>
      <Dailydeals />
    </div>
  );
};

export default Home;
