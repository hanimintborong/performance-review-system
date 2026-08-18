"use client";

import { Flex, Text } from "@chakra-ui/react";

type RatingButtonsProps = {
  max: number;
  value: number | null;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  compact?: boolean;
};

const SCALE_LABELS: Record<number, string[]> = {
  3: ["Low", "Medium", "High"],
  4: ["Poor", "Fair", "Good", "Excellent"],
  5: ["Does not meet", "Below expectations", "Meets expectations", "Exceeds expectations", "Outstanding"],
};

const ZERO_TO_FIVE_COLORS = ["error.50", "orange.50", "warning.50", "success.50", "success.70", "info.50"] as const;

export function RatingButtons({ max, value, onChange, readOnly, compact }: RatingButtonsProps) {
  const labels = SCALE_LABELS[max];
  const withZero = max === 5;
  const options = withZero ? Array.from({ length: max + 1 }, (_, i) => i) : Array.from({ length: max }, (_, i) => i + 1);
  const size = compact ? "22px" : "34px";

  return (
    <Flex justify="center" align="center" w="100%" gap={compact ? "10px" : "10px"} wrap={compact ? "nowrap" : "wrap"} rowGap="8px">
      {options.map((n) => {
        const selected = value === n;
        const swatch = withZero ? ZERO_TO_FIVE_COLORS[n] : "brand.50";
        const labelText = withZero ? (n === 0 ? "Not rated" : labels?.[n - 1]) : labels?.[n - 1];
        return (
          <Flex key={n} direction="column" align="center" gap="4px" w={compact ? size : "56px"}>
            <Flex
              as={readOnly ? "div" : "button"}
              onClick={readOnly ? undefined : () => onChange?.(n)}
              w={size}
              h={size}
              borderRadius="full"
              borderWidth="1.5px"
              borderColor={selected ? swatch : "grey.20"}
              bg={selected ? swatch : "grey.10"}
              color={selected ? "white" : "grey.60"}
              align="center"
              justify="center"
              fontSize={compact ? "9px" : "13px"}
              fontWeight="700"
              cursor={readOnly ? "default" : "pointer"}
              boxShadow={selected ? "0 1px 3px rgba(20,16,40,0.18)" : "none"}
              flexShrink="0"
            >
              {n}
            </Flex>
            {!compact && labelText && (
              <Text fontSize="9px" color="grey.50" textAlign="center" lineHeight="1.2">{labelText}</Text>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
