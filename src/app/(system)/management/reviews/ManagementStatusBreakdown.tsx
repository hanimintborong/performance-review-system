import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { StatusDonut, type DonutSegment } from "@/components/common/StatusDonut";
import { StatusDonutLegend } from "@/components/common/StatusDonutLegend";
import { grey, success, warning } from "@/constants/colors";
import type { ManagementBucket } from "@/lib/managementProgressStats";

const BUCKET_META: Record<ManagementBucket, { label: string; color: string }> = {
  readyToFinalise: { label: "Ready to finalise", color: warning[50] },
  inProgress: { label: "In progress", color: grey[30] },
  finalised: { label: "Finalised", color: success[50] },
};

type ManagementStatusBreakdownProps = {
  counts: Record<ManagementBucket, number>;
  total: number;
};

export function ManagementStatusBreakdown({ counts, total }: ManagementStatusBreakdownProps) {
  const segments: DonutSegment[] = (Object.keys(BUCKET_META) as ManagementBucket[]).map((bucket) => ({
    label: BUCKET_META[bucket].label,
    value: counts[bucket],
    color: BUCKET_META[bucket].color,
  }));

  const legendItems = segments.map((s) => ({ ...s, percent: total > 0 ? Math.round((s.value / total) * 100) : 0 }));

  return (
    <AppCard p="16px 20px">
      <Text fontSize="13px" fontWeight="700" color="grey.80" mb="12px">Evaluation progress by status</Text>
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
