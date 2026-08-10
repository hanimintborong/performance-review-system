import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { StatusDonut, type DonutSegment } from "@/components/common/StatusDonut";
import { StatusDonutLegend } from "@/components/common/StatusDonutLegend";

type StatusBreakdownCardProps = {
  segments: DonutSegment[];
  total: number;
  title?: string;
};

export function StatusBreakdownCard({ segments, total, title = "Progress by status" }: StatusBreakdownCardProps) {
  const legendItems = segments.map((s) => ({ ...s, percent: total > 0 ? Math.round((s.value / total) * 100) : 0 }));

  return (
    <AppCard p="16px 20px">
      <Text fontSize="13px" fontWeight="700" color="grey.80" mb="12px">{title}</Text>
      <Flex align="center" gap="20px" wrap="wrap">
        <Flex position="relative" align="center" justify="center">
          <StatusDonut segments={segments} />
          <Flex position="absolute" direction="column" align="center">
            <Text fontSize="20px" fontWeight="800" color="grey.80">{total}</Text>
            <Text fontSize="10px" color="grey.50">Total</Text>
          </Flex>
        </Flex>
        <StatusDonutLegend items={legendItems} />
      </Flex>
    </AppCard>
  );
}
