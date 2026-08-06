"use client";

import { Flex } from "@chakra-ui/react";

type RatingButtonsProps = {
  max: number;
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
};

export function RatingButtons({ max, value, onChange, readOnly }: RatingButtonsProps) {
  return (
    <Flex gap="6px">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <Flex
          key={n}
          as={readOnly ? "div" : "button"}
          onClick={readOnly ? undefined : () => onChange?.(n)}
          w="30px"
          h="30px"
          borderRadius="full"
          borderWidth="2px"
          borderColor={n <= value ? "brand.50" : "grey.30"}
          bg={n <= value ? "brand.50" : "white"}
          color={n <= value ? "white" : "grey.60"}
          align="center"
          justify="center"
          fontSize="12px"
          fontWeight="700"
          cursor={readOnly ? "default" : "pointer"}
        >
          {n}
        </Flex>
      ))}
    </Flex>
  );
}
