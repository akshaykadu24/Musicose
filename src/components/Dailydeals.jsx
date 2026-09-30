import {
  AspectRatio,
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { Daily_deals } from "./HomeData/Data";
import { Timer } from "./Timer";
import { Ratings } from "./Carousal/Carousal/Ratings";

// Pixels moved per frame (about 25px per second). Lower = slower.
const SCROLL_SPEED = 0.4;

// Show the list twice so the row can loop without a visible jump.
const loopDeals = [...Daily_deals, ...Daily_deals];

export function Dailydeals() {
  const rowRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const row = rowRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!row || reduceMotion) return;

    let position = row.scrollLeft;
    let frame;

    const move = () => {
      // If the user scrolled by hand, continue from their position
      if (Math.abs(row.scrollLeft - position) > 2) {
        position = row.scrollLeft;
      }

      if (!isPaused.current) {
        position += SCROLL_SPEED;

        // Start of the second copy = where the loop begins again
        const loopPoint = row.children[Daily_deals.length].offsetLeft - row.children[0].offsetLeft;
        if (position >= loopPoint) {
          position -= loopPoint;
        }

        row.scrollLeft = position;
      }

      frame = requestAnimationFrame(move);
    };

    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, []);

  const pause = () => {
    isPaused.current = true;
  };

  const resume = () => {
    isPaused.current = false;
  };

  return (
    <Box as="section" pt={{ base: "9", md: "14" }} pb={{ base: "4", md: "8" }}>
      <Flex
        mb={{ base: "5", md: "7" }}
        align={{ base: "flex-start", sm: "center" }}
        justify="space-between"
        direction={{ base: "column", sm: "row" }}
        gap="3"
      >
        <Box>
          <Badge colorScheme="red" mb="2" px="2" borderRadius="full">
            Limited-time offers
          </Badge>
          <Heading size={{ base: "lg", md: "xl" }}>Daily Deals</Heading>
          <Text mt="1" color="gray.600" fontSize="sm">
            Popular audio products at prices you will love.
          </Text>
        </Box>
        <Timer />
      </Flex>

      <Flex
        ref={rowRef}
        gap={{ base: "3", md: "5" }}
        py="2"
        overflowX="auto"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        sx={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {loopDeals.map((item, index) => {
          const price = Number(String(item.price).replace(/[^0-9]/g, ""));
          const mrp = Number(String(item.strprice).replace(/[^0-9]/g, ""));
          const saving = mrp - price;
          const discount = mrp > 0 ? Math.round((saving * 100) / mrp) : 0;
          const [rating, reviews] = String(item.rating).split("|");
          const isCopy = index >= Daily_deals.length;

          return (
            <Card
              key={`${item.id}-${index}`}
              aria-hidden={isCopy}
              flexShrink="0"
              w={{ base: "62%", sm: "40%", md: "28%", lg: "22%", xl: "18.5%" }}
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="sm"
              textAlign="left"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg", borderColor: "red.100" }}
            >
              <Box position="relative" bg="gray.50" px={{ base: "4", md: "6" }} py={{ base: "3", md: "4" }}>
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={item.image}
                    fallbackSrc="/musicose-mark.svg"
                    alt={item.pname || item.title || "Musicose deal"}
                    objectFit="contain"
                    draggable="false"
                  />
                </AspectRatio>
                {discount > 0 && (
                  <Badge
                    position="absolute"
                    top="3"
                    left="3"
                    colorScheme="red"
                    borderRadius="full"
                    px="2"
                  >
                    {discount}% off
                  </Badge>
                )}
              </Box>

              <CardBody p={{ base: "3", md: "4" }} display="flex" flexDirection="column">
                <Text fontWeight="700" fontSize={{ base: "sm", md: "md" }} lineHeight="short" noOfLines={2}>
                  {item.pname || item.title || "Musicose Product"}
                </Text>

                <HStack mt="1.5" spacing="2">
                  <Ratings rating={rating?.trim()} />
                  {reviews && (
                    <Text fontSize="xs" color="gray.500">
                      ({reviews.replace(/reviews?/i, "").trim()})
                    </Text>
                  )}
                </HStack>

                <Box mt="auto" pt="4">
                  <HStack align="baseline" spacing="2">
                    <Text fontSize={{ base: "md", md: "lg" }} fontWeight="800" color="gray.900">
                      ₹{price.toLocaleString("en-IN")}
                    </Text>
                    {mrp > price && (
                      <Text color="gray.500" fontSize="sm" textDecoration="line-through">
                        ₹{mrp.toLocaleString("en-IN")}
                      </Text>
                    )}
                  </HStack>
                  {saving > 0 && (
                    <Text mt="1" color="green.600" fontSize="xs" fontWeight="700">
                      You save ₹{saving.toLocaleString("en-IN")}
                    </Text>
                  )}
                </Box>
              </CardBody>
            </Card>
          );
        })}
      </Flex>
    </Box>
  );
}
