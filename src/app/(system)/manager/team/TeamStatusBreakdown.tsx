import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { StatusDonut, type DonutSegment } from "@/components/common/StatusDonut";
import { StatusDonutLegend } from "@/components/common/StatusDonutLegend";
import { error, grey, info, success, warning } from "@/constants/colors";
import type { StatusBucket } from "@/lib/teamProgressStats";

const BUCKET_META: Record<StatusBucket, { label: string; color: string }> = {
  notStarted: { label: "Not started", color: grey[30] },
  inProgress: { label: "In progress", color: warning[50] },
  awaitingDiscussion: { label: "Awaiting discussion", color: info[50] },
  overdue: { label: "Overdue", color: error[50] },
  completed: { label: "Completed", color: success[50] },
};

type TeamStatusBreakdownProps = {
  counts: Record<StatusBucket, number>;
  total: number;
};

export function TeamStatusBreakdown({ counts, total }: TeamStatusBreakdownProps) {
  const segments: DonutSegment[] = (Object.keys(BUCKET_META) as StatusBucket[]).map((bucket) => ({
    label: BUCKET_META[bucket].label,
    value: counts[bucket],
    color: BUCKET_META[bucket].color,
  }));

  const legendItems = segments.map((s) => ({ ...s, percent: total > 0 ? Math.round((s.value / total) * 100) : 0 }));

  return (
    <AppCard p="16px 20px">
      <Text fontSize="13px" fontWeight="700" color="grey.80" mb="12px">Progress by status</Text>
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
