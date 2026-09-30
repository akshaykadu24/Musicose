import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  { image: "/carousel/all.jpg", path: "/" },
  { image: "/carousel/earbuds.jpg", path: "/earbuds" },
  { image: "/carousel/headphone.jpg", path: "/headphone" },
  { image: "/carousel/speaker.jpg", path: "/speaker" },
  { image: "/carousel/watch.jpg", path: "/watch" },
];

export default function Carousel() {
  return (
    <Box
      w="100%"
      bg="gray.900"
      sx={{
        ".swiper-button-next, .swiper-button-prev": {
          color: "white",
          transform: "scale(0.7)",
          display: { base: "none", md: "flex" },
        },
        ".swiper-pagination-bullet": { bg: "white", opacity: 0.7 },
        ".swiper-pagination-bullet-active": { bg: "red.500", opacity: 1 },
      }}
    >
      <Swiper
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.image}>
            <Box
              as={Link}
              to={banner.path}
              position="relative"
              display="block"
              w="100%"
              h={{ base: "56vw", md: "42vw", xl: "520px" }}
              maxH="560px"
              overflow="hidden"
              bg="gray.900"
              _before={{
                content: '""',
                position: "absolute",
                inset: "0",
                bgImage: `linear-gradient(rgba(17, 24, 39, 0.18), rgba(17, 24, 39, 0.18)), url(${banner.image})`,
                bgSize: "cover",
                bgPosition: "center",
                filter: "blur(12px)",
                transform: "scale(1.08)",
              }}
            >
              <Image
                src={banner.image}
                fallbackSrc="/musicose-logo-white.svg"
                alt={`Musicose featured offer ${index + 1}`}
                position="relative"
                zIndex="1"
                display="block"
                w="100%"
                h="100%"
                objectFit="contain"
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
