import { AspectRatio, Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const motionCards = [
  {
    image: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Audio/Boat/450pro/4_05.gif",
    path: "/bluetoothHeadphone",
    title: "Wireless Freedom",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD_191_Gf_800x800_px.gif?v=1654758949",
    path: "/earbuds",
    title: "Music Everywhere",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/2_3d583989-3aab-4622-91cd-f256b3007d7b.gif?v=1658570608",
    path: "/bluetoothHeadphone",
    title: "Made to Move",
  },
];

const Gifs = () => (
  <Box as="section" py={{ base: "9", md: "14" }}>
    <Heading size={{ base: "lg", md: "xl" }}>Sound in Motion</Heading>
    <Text mt="1" mb="6" color="gray.600" fontSize="sm">
      Audio products designed for work, workouts and everything between.
    </Text>

    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: "4", md: "6" }}>
      {motionCards.map((card) => (
        <Box
          as={Link}
          to={card.path}
          key={card.title}
          position="relative"
          display="block"
          borderRadius="xl"
          overflow="hidden"
          bg="gray.900"
          boxShadow="md"
        >
          <AspectRatio ratio={1}>
            <Image
              src={card.image}
              fallbackSrc="/musicose-mark.svg"
              alt={card.title}
              objectFit="cover"
            />
          </AspectRatio>
          <Box
            position="absolute"
            left="0"
            right="0"
            bottom="0"
            p="5"
            bgGradient="linear(to-t, blackAlpha.800, transparent)"
          >
            <Text color="white" fontSize="lg" fontWeight="800">
              {card.title}
            </Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  </Box>
);

export default Gifs;