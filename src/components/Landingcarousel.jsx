import { AspectRatio, Box, Heading, Image, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Pagination } from "swiper";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const collections = [
  {
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/stone_1_445x.png?v=1670244742",
    path: "/speaker",
    title: "Powerful Speakers",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/446_380_445x.png?v=1676388029",
    path: "/headphone",
    title: "Everyday Headphones",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/carousel_banner_445x.png?v=1671097960",
    path: "/earbuds",
    title: "Wireless Earbuds",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Bring_Your_World_On_Your_Wrist_446x360_66921214-c5ee-4bda-a433-f52b1c2124d4_445x.jpg?v=1672749745",
    path: "/watch",
    title: "Smart Watches",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/newsletter_carousel-banner_445x.png?v=1672738706",
    path: "/bluetoothHeadphone",
    title: "Wireless Audio",
  },
];

export default function Landingcarousel() {
  return (
    <Box as="section" py={{ base: "9", md: "14" }}>
      <Heading size={{ base: "lg", md: "xl" }}>Explore More</Heading>
      <Text mt="1" mb="6" color="gray.600" fontSize="sm">
        Find the right sound and wearable for your lifestyle.
      </Text>
      <Swiper
        slidesPerView={1.15}
        spaceBetween={14}
        freeMode
        mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
        pagination={{ clickable: true }}
        modules={[FreeMode, Mousewheel, Pagination]}
        breakpoints={{
          520: { slidesPerView: 2, spaceBetween: 18 },
          900: { slidesPerView: 3, spaceBetween: 22 },
        }}
      >
        {collections.map((collection) => (
          <SwiperSlide key={collection.title}>
            <Box
              as={Link}
              to={collection.path}
              display="block"
              mb="10"
              bg="white"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="sm"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
            >
              <AspectRatio ratio={445 / 360}>
                <Image
                  src={collection.image}
                  fallbackSrc="/musicose-mark.svg"
                  alt={collection.title}
                  objectFit="cover"
                />
              </AspectRatio>
              <Text p="4" fontWeight="700" textAlign="left">
                {collection.title}
              </Text>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}