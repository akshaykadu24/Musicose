import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Products } from "./Products";
import { scrollRowProps, scrollRowStyles } from "../../scrollRow";

export const ProductCarousel = ({ data = [] }) => {
  const products = data.slice(0, 10);

  return (
    <Box as="section" pt={{ base: "9", md: "14" }} pb={{ base: "4", md: "8" }}>
      <Flex align="flex-end" justify="space-between" mb="5">
        <Box>
          <Heading size={{ base: "lg", md: "xl" }}>Smart Watches</Heading>
          <Text mt="1" color="gray.600" fontSize="sm">
            Smart style from our wearable partner collection.
          </Text>
        </Box>
        <Text
          as={Link}
          to="/watch"
          color="red.500"
          fontSize="sm"
          fontWeight="700"
          whiteSpace="nowrap"
        >
          View all
        </Text>
      </Flex>

      {products.length > 0 ? (
        <Box sx={scrollRowStyles}>
          <Swiper {...scrollRowProps}>
            {products.map((item, index) => (
              <SwiperSlide key={item._id || index}>
                <Products product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) : (
        <Box py="12" bg="white" borderRadius="xl" textAlign="center">
          <Text color="gray.500">Watch products will appear here.</Text>
        </Box>
      )}
    </Box>
  );
};
