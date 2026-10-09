import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import { Dailydeals } from "../components/Dailydeals";
import Gifs from "../components/Gifs";
import Landingcarousel from "../components/Landingcarousel";
import { ProductCarousel } from "../components/Carousal/Carousal/ProductCarousel";
import { getwatchproduct } from "../redux/product/product.action";

const Home = () => {
  const dispatch = useDispatch();
  const watchProducts = useSelector(
    (store) => store.productManager.watch?.products || []
  );

  useEffect(() => {
    dispatch(getwatchproduct());
  }, [dispatch]);

  return (
    <Box bg="#f8fafc" overflow="hidden">
      <Carousel />
      <Box maxW="1400px" mx="auto" px={{ base: "4", md: "6" }}>
        <Dailydeals />
        <ProductCarousel data={watchProducts} />
        <Landingcarousel />
        <Gifs />
      </Box>
    </Box>
  );
};

export default Home;