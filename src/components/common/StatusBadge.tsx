import { Flex, Text } from "@chakra-ui/react";
import type { StatusStyle } from "@/constants/statusColors";

type StatusBadgeProps = {
  label: string;
  style: StatusStyle;
};

export function StatusBadge({ label, style }: StatusBadgeProps) {
  return (
    <Flex
      as="span"
      display="inline-flex"
      align="center"
      gap="6px"
      px="9px"
      py="1px"
      bg={style.bg}
      color={style.fg}
      borderRadius="full"
      fontSize="11px"
      fontWeight="600"
      lineHeight="17px"
      whiteSpace="nowrap"
      w="fit-content"
    >
      <Text as="span" w="6px" h="6px" borderRadius="full" bg={style.dot} />
      {label}
    </Flex>
  );
}
