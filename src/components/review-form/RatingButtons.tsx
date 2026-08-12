"use client";

import { Flex, Text } from "@chakra-ui/react";

type RatingButtonsProps = {
  max: number;
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
};

const SCALE_LABELS: Record<number, string[]> = {
  3: ["Low", "Medium", "High"],
  4: ["Poor", "Fair", "Good", "Excellent"],
  5: ["Very Low", "Low", "Neutral", "High", "Excellent"],
};

export function RatingButtons({ max, value, onChange, readOnly }: RatingButtonsProps) {
  const labels = SCALE_LABELS[max];

  return (
    <Flex gap="10px">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <Flex key={n} direction="column" align="center" gap="4px" w="50px">
          <Flex
            as={readOnly ? "div" : "button"}
            onClick={readOnly ? undefined : () => onChange?.(n)}
            w="34px"
            h="34px"
            borderRadius="full"
            borderWidth="1.5px"
            borderColor={n <= value ? "brand.50" : "brand.20"}
            bg={n <= value ? "brand.50" : "brand.10"}
            color={n <= value ? "white" : "brand.70"}
            align="center"
            justify="center"
            fontSize="13px"
            fontWeight="700"
            cursor={readOnly ? "default" : "pointer"}
          >
            {n}
          </Flex>
          {labels?.[n - 1] && (
            <Text fontSize="9px" color="grey.50" textAlign="center" lineHeight="1.2">{labels[n - 1]}</Text>
          )}
        </Flex>
      ))}
    </Flex>
  );
}
