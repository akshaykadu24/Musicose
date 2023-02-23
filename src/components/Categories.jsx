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
        top="100px"
        p="40px"
        alignItems={"center"}
        listStyleType={"none"}
        bg="white"
      >
        <Grid templateColumns="repeat(2, 1fr)" alignItems={"center"} gap={6}>
          <GridItem>
            <Link to={"#"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/dropdown-TWS_100x.png?v=1663752600"
                alt="hello"
                width={100}
              />
              <p>AirDops True Wireless</p>
            </Link>
          </GridItem>
          <GridItem>
            <Link to={"#"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/Rectangle271_100x.png?v=1663752867"
                alt="hello"
                width={100}
              />
              <p>Rockerzz Wireless</p>
            </Link>
          </GridItem>
          <GridItem>
            <Link to={"#"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/latest_background_b4f773ca-05d9-41cc-a7cf-3104993ae895_100x.png?v=1663753167"
                alt="hello"
                width={100}
              />
              <p>Basshead Wired</p>
            </Link>
          </GridItem>
          <GridItem>
            <Link to={"#"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/box-5_100x.png?v=1663753243"
                alt="hello"
                width={100}
              />
              <p>Stone Speakers</p>
            </Link>
          </GridItem>
          <GridItem>
            <Link to={"#"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/New-Category-Banners_with-Trebal_09_100x.png?v=1663755824"
                alt="hello"
                width={100}
              />
              <p>Trebal for Women</p>
            </Link>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
