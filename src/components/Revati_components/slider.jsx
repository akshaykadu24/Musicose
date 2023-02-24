import { Box, Button, Icon } from "@chakra-ui/react";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import styled from "./slider.module.css";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Tag,
  HStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

let data1 = [
  {
    id: 1,
    rating: 4.1,
    "product-ratingsCount": "42k",
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat--black-airdopes-131-m-earbuds/11888942/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/11888942/2022/12/23/22d0b950-306f-4bcc-a1e0-8f623feeadba1671771193272-boAt--Black-Airdopes-131-M-TWS-IWP-Type-C-Port-Earbuds-30416-1.jpg",
    title: "Airdopes 131 M TWS Earbuds",
    price: 1299,
    strike_price: "Rs. 2990",
    discount: "(Rs. 1691 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 2,
    rating: 3.8,
    "product-ratingsCount": "1.4k",
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-airdopes-402-active-black-tws-earbuds-with-touch-controls-immersive-audio/11888918/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/11888918/2021/9/29/9308bbe4-a94b-40d3-8df8-d8dbcdddeacd1632891511478-boAt-Airdopes-402-Active-Black-TWS-Earbuds-with-Touch-Contro-1.jpg",
    title: "Airdopes 402 M TWS Earbuds",
    price: 1999,
    strike_price: "Rs. 5990",
    discount: "(Rs. 3991 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 3,
    rating: 4,
    "product-ratingsCount": 558,
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-airdopes-131-pro-m-tws-with-quad-mic-enx-bluetooth-earbuds---black/19597740/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/19597740/2022/9/2/cb79a95f-3333-48cb-8815-beeec1f54dc01662101395468-boAt-Airdopes-131-Pro-M-with-Quad-Mic-ENx-Bluetooth-Headset--1.jpg",
    title: "Airdopes 131 Pro M TWS Earbuds",
    price: 1299,
    strike_price: "Rs. 2990",
    discount: "(Rs. 1691 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 4,
    rating: 3.7,
    "product-ratingsCount": 502,
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-airdopes-402-m-tws-bold-blue-earbuds-with-touch-controls-immersive-audio/11888902/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/11888902/2021/9/29/00457ef7-e54b-4769-9665-ed11bb6ec9271632891492033-boAt-Airdopes-402-Bold-BlueTWS-Earbuds-with-Touch-Controls-I-1.jpg",
    title: "Airdopes 402 M TWS Earbuds",
    price: 1998,
    strike_price: "Rs. 5990",
    discount: "(Rs. 3992 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 5,
    rating: 4.1,
    "product-ratingsCount": "3k",
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-airdopes-131-m-true-wireless-earbuds---ivory-white/15863074/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/15863074/2022/12/23/7c587a57-c29f-4a60-a53f-cc012bf152911671771295134-boAt-Airdopes-131-M-True-Wireless-Earbuds---Ivory-White-3411-1.jpg",
    title: "Airdopes 131 M TWS Earbuds",
    price: 1299,
    strike_price: "Rs. 2990",
    discount: "(Rs. 1691 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 6,
    rating: 4.2,
    "product-ratingsCount": "22k",
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-unisex-navy-blue-airdopes-131-tws-iwp-type-c-port-earbuds/11888930/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/11888930/2022/12/23/80b8e293-5d6c-4ee3-a031-28e6af85b0da1671771171046-boAt-Unisex-Navy-Blue-Airdopes-131-TWS-IWP-Type-C-Port-Earbu-1.jpg",
    title: "Airdopes 131 M TWS Earbuds",
    price: 1299,
    strike_price: "Rs. 2990",
    discount: "(Rs. 1691 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 7,
    rating: 4.2,
    "product-ratingsCount": "1.6k",
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-airdopes-131-m-true-wireless-earbuds---crimson-cream/16116586/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/16116586/2022/12/23/1fb251a4-119b-4fc4-8063-6e85d84e6b0c1671771315780-boAt-Airdopes-131-M-True-Wireless-Earbuds---Crimson-Cream-46-1.jpg",
    title: "Airdopes 131 M TWS Earbuds",
    price: 1299,
    strike_price: "Rs. 2990",
    discount: "(Rs. 1691 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 8,
    rating: 4.2,
    "product-ratingsCount": 388,
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-lunar-white-airdopes-183-m-enx-tech-and-iwp-true-wireless-earbuds-/20384134/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/20384134/2022/10/17/5951fd80-e59c-4b28-becd-ae1e8ccb94f21665982579704-boAt-Airdopes-183-M-True-Wireless-Earbuds-with-ENx-Tech-and--1.jpg",
    title: "Airdopes 183 Wireless Earbuds",
    price: 1499,
    strike_price: "Rs. 2990",
    discount: "(Rs. 1491 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 9,
    rating: 3.7,
    "product-ratingsCount": 876,
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-airdopes-402-m-tws-rosegold-white-earbuds-with-touch-controls-immersive-audio/11888904/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/11888904/2021/9/29/76841612-695a-48cb-8d75-653a92b2013b1632891507284-boAt-Airdopes-402--Rosegold-White-TWS-Earbuds-with-Touch-Con-1.jpg",
    title: "Airdopes 402 M TWS Earbuds",
    price: 1999,
    strike_price: "Rs. 5990",
    discount: "(Rs. 3991 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 10,
    rating: 4.3,
    "product-ratingsCount": "13.3k",
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-pink-airdopes-131-m-tws-wireless-earbuds/11888916/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/11888916/2022/12/23/9ae0cf7e-391b-4d8c-b140-7b0a3726aab41671771145524-boAt-Pink-Airdopes-131-M-TWS-Wireless-Earbuds-57167177114482-1.jpg",
    title: "Airdopes 131 M TWS Earbuds",
    price: 1299,
    strike_price: "Rs. 2990",
    discount: "(Rs. 1691 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 11,
    rating: 4.2,
    "product-ratingsCount": 158,
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-airdopes-131-pro-m-with-quad-mic-enx-bluetooth-earbuds---pink/19597748/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/19597748/2022/9/2/6557d38e-8a13-4273-9c61-91a37a6748291662101411675-boAt-Airdopes-131-Pro-M-with-Quad-Mic-ENx-Bluetooth-Headset--1.jpg",
    title: "Airdopes 131 Pro M TWS Earbuds",
    price: 1299,
    strike_price: "Rs. 2990",
    discount: "(Rs. 1691 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 12,
    rating: 4.2,
    "product-ratingsCount": 118,
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-black-airdopes-411-anc-m-tws-earbuds-with-upto-175hrs-playback/19597736/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/19597736/2022/9/2/0ffa5a9f-1f3a-4d76-87c4-aacacfc12caf1662101464429-boAt-Airdopes-411-ANC-M-TWS-Earbuds-with-upto-175hrs-Playbac-1.jpg",
    title: "Airdopes 411 ANC M TWS Earbuds",
    price: 2499,
    strike_price: "Rs. 4990",
    discount: "(Rs. 2491 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 13,
    rating: 4.2,
    "product-ratingsCount": 207,
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-airdopes-131-pro-m-with-quad-mic-enx-bluetooth-earbuds---mint-green/19597728/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/19597728/2022/9/2/e9545e37-b1dc-4698-89af-9550d166aa5d1662101363013-boAt-Airdopes-131-Pro-M-with-Quad-Mic-ENx-Bluetooth-Headset--1.jpg",
    title: "Airdopes 131M Pro TWS Earbuds",
    price: 1299,
    strike_price: "Rs. 2990",
    discount: "(Rs. 1691 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 14,
    rating: 4.2,
    "product-ratingsCount": 511,
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-airdopes-381-m-mint-pink-tws-earbuds-with-up-to-20h-playback/13408082/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/13408082/2021/9/30/d5df22a2-03e4-4b50-8785-d8b986b6e2581632992711781-boAt-Airdopes-381-M-Mint-Pink-TWS-Earbuds-with-Up-to-20H-Pla-1.jpg",
    title: "Airdopes 381 M TWS Earbuds",
    price: 2199,
    strike_price: "Rs. 4990",
    discount: "(Rs. 2791 OFF)",
    category: "earbuds",
    quantity: 1,
  },
  {
    id: 15,
    rating: 4,
    "product-ratingsCount": 419,
    "product-base href":
      "https://www.myntra.com/headphones/boat/boat-teal-blue-airdopes-381-m-tws-earbuds-with-up-to-20h-playback/13408070/buy",
    images:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/13408070/2021/9/30/e98ab1ed-56a1-4aab-a15a-ff8bc2d72f2e1632992691331-boAt-Teal-Blue-Airdopes-381-M-TWS-Earbuds-with-Up-to-20H-Pla-1.jpg",
    title: "Airdopes 381 M TWS Earbuds",
    price: 2199,
    strike_price: "Rs. 4990",
    discount: "(Rs. 2791 OFF)",
    category: "earbuds",
    quantity: 1,
  },
];
export const TrendingSlider = () => {
  const btnpressprev = () => {
    let boxel = document.querySelector(`.${styled.product_container}`);
    boxel.scrollLeft -= 270;
    console.log("hek");
    console.log(boxel.scrollLeft);
  };
  const btnpressnext = () => {
    let boxel = document.querySelector(`.${styled.product_container}`);
    boxel.scrollLeft += 270;
    console.log(boxel.scrollLeft);
  };
  return (
    <Box className={styled.carousel}>
      <Text>TRENDING PRODUCTS</Text>
      <Box className={styled.product_container} id="productsss">
        {data1.map((el) => (
          <Cards
            strike_price={el.strike_price}
            image={el.images}
            key={Date.now() + el.id}
            title={el.title}
            discounted_price={el.discounted_price}
            rating={el.rating}
            discount={el.discount}></Cards>
        ))}
      </Box>
      <Box display={"flex"} justifyContent="center">
        <Button onClick={btnpressprev} zIndex="2">
          <Icon as={BsArrowLeftCircle} />
        </Button>
        <Button onClick={btnpressnext} zIndex="2">
          <Icon as={BsArrowRightCircle} />
        </Button>
      </Box>
    </Box>
  );
};

const Cards = ({
  image,
  strike_price,
  rating,
  discount,
  title,
  subtitle,
  discounted_price,
}) => {
  return (
    <Card className={styled.card} minWidth="230px" minHeight="230px">
      <Image m="auto" src={image} width="200px" height="230px" alt="image" />
      <Text color="#748A9C" fontSize="14px" mt={2}>
        {subtitle}
      </Text>
      <Text color="#748A9C" fontSize="14px">
        {title}
      </Text>
      <HStack display="flex" h="30px" alignItems="center" marginLeft="10px">
        <Text fontSize="14px" color="#D6D0DB" textDecoration="line-through">
           {strike_price}
        </Text>
        <b fontSize="14px"> {discounted_price}</b>

        <Tag colorScheme="gray">{discount}</Tag>
      </HStack>

      <Box display="flex" alignItems="center" marginLeft="50px">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
              boxSize={3}
              key={i}
              color={i < Math.floor(rating) ? "yellow.400" : "gray.300"}
            />
          ))}
        <Box as="span" ml="2" color="#D6D0DB" fontSize="sm">
          ({rating})
        </Box>
      </Box>
    </Card>
  );
};
