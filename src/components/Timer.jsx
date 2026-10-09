import { HStack, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiZap } from "react-icons/fi";

const getEndOfDay = () => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end;
};

const getTimeLeft = (deadline) => {
  const difference = Math.max(0, deadline.getTime() - Date.now());

  return {
    hours: Math.floor(difference / 3600000),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export function Timer() {
  const [deadline] = useState(getEndOfDay);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(deadline));
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const twoDigits = (value) => String(value).padStart(2, "0");

  return (
    <HStack
      bg="yellow.100"
      color="yellow.900"
      px="4"
      py="2"
      borderRadius="full"
      spacing="2"
      whiteSpace="nowrap"
    >
      <Icon as={FiZap} color="red.500" />
      <Text fontSize="sm" fontWeight="700">
        Ends in {twoDigits(timeLeft.hours)}:{twoDigits(timeLeft.minutes)}:{twoDigits(timeLeft.seconds)}
      </Text>
    </HStack>
  );
}