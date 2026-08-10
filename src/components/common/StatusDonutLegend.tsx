import { Flex, Text } from "@chakra-ui/react";

export type LegendItem = { label: string; value: number; color: string; percent: number };

export function StatusDonutLegend({ items }: { items: LegendItem[] }) {
  return (
    <Flex direction="column" gap="8px">
      {items.map((item) => (
        <Flex key={item.label} align="center" gap="8px" fontSize="12px">
          <Flex w="10px" h="10px" borderRadius="full" bg={item.color} flexShrink="0" />
          <Text color="grey.70" flex="1">{item.label}</Text>
          <Text fontWeight="700" color="grey.80">{item.value}</Text>
          <Text color="grey.50" w="42px" textAlign="right">{item.percent}%</Text>
        </Flex>
      ))}
    </Flex>
  );
}
