import React from "react";
import Carousel from "../components/Carousel";
import { Dailydeals } from "../components/Dailydeals";
// import Header from "../components/Header";
// import { Dailydeals } from "../components/Dailydeals";
const Home = () => {
  return (
    <div>
      {/* <Header />; */}
      <Carousel />
      <Dailydeals />
    </div>
  );
};

export default Home;
