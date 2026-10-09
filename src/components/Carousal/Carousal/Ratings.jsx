import { HStack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export const Ratings = ({ rating }) => {
  const safeRating = Number.isFinite(Number(rating))
    ? Math.min(5, Math.max(0, Number(rating)))
    : 0;

  return (
    <HStack spacing="1">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon
          key={index}
          boxSize="12px"
          color={index < Math.round(safeRating) ? "yellow.400" : "gray.200"}
        />
      ))}
      <Text color="gray.500" fontSize="xs" ml="1">
        {safeRating.toFixed(1)}
      </Text>
    </HStack>
  );
};