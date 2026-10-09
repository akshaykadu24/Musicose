import { Box, Grid, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const categoryLinks = [
  {
    title: "True Wireless Earbuds",
    path: "/earbuds",
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/dropdown-TWS_100x.png?v=1663752600",
  },
  {
    title: "Bluetooth Headphones",
    path: "/bluetoothHeadphone",
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main-img-R333_300x.png?v=1671194172",
  },
  {
    title: "Wired Headphones",
    path: "/headphone",
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/17f83a1f-c928-47ab-8338-5fdcf072a96c_300x.png?v=1625046149",
  },
  {
    title: "Speakers",
    path: "/speaker",
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/box-5_100x.png?v=1663753243",
  },
  {
    title: "Smart Watches",
    path: "/watch",
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main-image-1_600x.png?v=1661272676",
  },
];

export function Categories() {
  return (
    <Box
      position="absolute"
      top="64px"
      left="0"
      w="560px"
      p="4"
      bg="white"
      color="gray.800"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="xl"
      boxShadow="2xl"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap="3">
        {categoryLinks.map((category) => (
          <Box
            as={Link}
            to={category.path}
            key={category.path}
            display="flex"
            alignItems="center"
            gap="3"
            p="3"
            borderRadius="lg"
            textAlign="left"
            _hover={{ bg: "red.50", color: "red.500" }}
          >
            <Image
              src={category.image}
              fallbackSrc="/musicose-mark.svg"
              alt={category.title}
              boxSize="64px"
              objectFit="contain"
            />
            <Text fontSize="sm" fontWeight="600">
              {category.title}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}