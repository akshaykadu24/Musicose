import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { FreeMode, Pagination } from "swiper";

export default function Landingcarousel() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/stone_1_445x.png?v=1670244742"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/446_380_445x.png?v=1676388029"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/carousel_banner_445x.png?v=1671097960"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Bring_Your_World_On_Your_Wrist_446x360_66921214-c5ee-4bda-a433-f52b1c2124d4_445x.jpg?v=1672749745"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/newsletter_carousel-banner_445x.png?v=1672738706"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
