// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Carousel.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Carousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/999-Store-Desktop_1_1600x.jpg?v=1677239714"
            alt=""
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/DD-Desktop_1600x.jpg?v=1676020067"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/DC-Desktop-Banner_1600x.jpg?v=1676607577"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Desktop-192_55738f37-c97c-4e73-874a-dd117eb9a9a2_1600x.jpg?v=1676466626"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/trinity-web_c5e16c27-35b7-498b-a046-bdec250d517b_1600x.jpg?v=1676960518"
            alt=""
          />
        </SwiperSlide>
        {/* <SwiperSlide>
          {" "}
          <img
            src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/84_inr.jpg"
            alt=""
          />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
