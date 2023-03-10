import { Container, Grid, Image, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Categories() {
  return (
    <>
      <Container
        borderBottomRadius={"1rem"}
        zIndex={10}
        width="100%"
        margin="auto"
        boxSize="border-box"
        border={"1px solid lightgrey"}
        position="absolute"
        top="58px"
        left={"20px"}
        p="40px"
        alignItems={"center"}
        listStyleType={"none"}
        bg="white"
      >
        <Grid templateColumns="repeat(2, 1fr)" alignItems={"center"} gap={5}>
          <GridItem>
            <Link to={"/earbuds"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/dropdown-TWS_100x.png?v=1663752600"
                alt="hello"
                width={100}
              />
              <p>AirDops True Wireless</p>
            </Link>
          </GridItem>
          <GridItem>
            <Link to={"/bluetoothHeadphone"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main-img-R333_300x.png?v=1671194172"
                alt="hello"
                width={100}
              />
              <p>Rockerzz Wireless</p>
            </Link>
          </GridItem>
          <GridItem>
            <Link to={"/headphone"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/latest_background_b4f773ca-05d9-41cc-a7cf-3104993ae895_100x.png?v=1663753167"
                alt="hello"
                width={100}
              />
              <p>Basshead Wired</p>
            </Link>
          </GridItem>
          <GridItem>
            <Link to={"/speaker"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/box-5_100x.png?v=1663753243"
                alt="hello"
                width={100}
              />
              <p>Stone Speakers</p>
            </Link>
          </GridItem>
          <GridItem>
            <Link to={"/watch"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main-image-1_600x.png?v=1661272676
                "
                alt="hello"
                width={100}
              />
              <p>Watch</p>
            </Link>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}

