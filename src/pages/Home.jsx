import React from "react";
import Carousel from "../components/Carousel";
import { Dailydeals } from "../components/Dailydeals";
import Footer from "../components/Footer";
import Gifcarousel from "../components/Gifcarousel";
import Gifs from "../components/Gifs";
import Landingcarousel from "../components/Landingcarousel";
// import { Dailydeals } from "../components/Dailydeals";
// import Header from "../components/Header";
// import { Dailydeals } from "../components/Dailydeals";
const Home = () => {
  return (
    <div>
      {/* <Header />; */}
      
      <Carousel />
      {/* <Dailydeals /> */}
      <Dailydeals />
      <Landingcarousel />
      <Gifcarousel />
      <Gifs/>
      <Dailydeals />
    </div>
  );
};

export default Home;
