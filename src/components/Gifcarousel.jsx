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
import Iframe from "react-iframe";

export default function Gifcarousel() {
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
          <Iframe
            src="https://giphy.com/embed/26tPjZyjJQH8t3xsY"
            width="450"
            height="880"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          />
        </SwiperSlide>
        <SwiperSlide>
          <Iframe
            src="https://giphy.com/embed/gnbMNq43THFAXsukem"
            width="450"
            height="880"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          />
        </SwiperSlide>
        <SwiperSlide>
          <Iframe
            src="https://giphy.com/embed/mCbhenyAxo3oytYHan"
            width="450"
            height="880"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
