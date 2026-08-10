import { Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { TrendLineChart } from "@/components/common/TrendLineChart";
import type { TrendPoint } from "@/lib/completionTrend";

type TrendCardProps = {
  points: TrendPoint[];
  title?: string;
};

export function TrendCard({ points, title = "Progress over time" }: TrendCardProps) {
  return (
    <AppCard p="16px 20px">
      <Text fontSize="13px" fontWeight="700" color="grey.80" mb="12px">{title}</Text>
      <TrendLineChart points={points} />
    </AppCard>
  );
}
