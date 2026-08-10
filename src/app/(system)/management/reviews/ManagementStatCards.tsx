import { Flex, Grid, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { RingProgress } from "@/components/common/RingProgress";
import { StatCard } from "@/components/common/StatCard";
import type { ManagementBucket } from "@/lib/managementProgressStats";

type ManagementStatCardsProps = {
  counts: Record<ManagementBucket, number>;
  total: number;
  avgScore: number | null;
};

export function ManagementStatCards({ counts, total, avgScore }: ManagementStatCardsProps) {
  const completionPercent = total > 0 ? (counts.finalised / total) * 100 : 0;

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap="12px">
      <AppCard p="14px 16px" borderTopWidth="3px" borderTopColor="brand.50">
        <Flex align="center" gap="12px">
          <RingProgress percent={completionPercent} size={52} />
          <Flex direction="column">
            <Text fontSize="12px" fontWeight="600" color="grey.60">Overall completion</Text>
            <Text fontSize="13px" fontWeight="700" color="grey.80">{counts.finalised} of {total}</Text>
          </Flex>
        </Flex>
      </AppCard>

      <StatCard label="Ready to finalise" value={counts.readyToFinalise} valueColor="warning.70" accentColor="warning.50" />
      <StatCard label="In progress" value={counts.inProgress} valueColor="grey.70" accentColor="grey.40" />
      <StatCard label="Finalised" value={counts.finalised} valueColor="success.70" accentColor="success.50" />
      <StatCard label="Average final score" value={avgScore !== null ? avgScore.toFixed(1) : "—"} valueColor="info.70" accentColor="info.50" />
    </Grid>
  );
}
