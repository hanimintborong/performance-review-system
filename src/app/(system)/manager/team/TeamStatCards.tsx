import { Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { FiAlertTriangle, FiCheckCircle, FiClock, FiFlag } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import { RingProgress } from "@/components/common/RingProgress";
import { StatCard } from "@/components/common/StatCard";
import type { StatusBucket } from "@/lib/teamProgressStats";

type TeamStatCardsProps = {
  counts: Record<StatusBucket, number>;
  total: number;
};

export function TeamStatCards({ counts, total }: TeamStatCardsProps) {
  const completionPercent = total > 0 ? (counts.completed / total) * 100 : 0;

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap="12px">
      <AppCard p="14px 16px" borderTopWidth="3px" borderTopColor="brand.50">
        <Flex align="center" gap="12px">
          <RingProgress percent={completionPercent} size={52} />
          <Flex direction="column">
            <Text fontSize="12px" fontWeight="600" color="grey.60">Overall completion</Text>
            <Text fontSize="13px" fontWeight="700" color="grey.80">{counts.completed} of {total}</Text>
          </Flex>
        </Flex>
      </AppCard>

      <StatCard label="In progress" value={counts.inProgress} valueColor="warning.70" accentColor="warning.50" icon={<Icon as={FiClock} color="warning.70" boxSize="15px" />} />
      <StatCard label="Ready to finalise" value={counts.readyToFinalise} valueColor="info.70" accentColor="info.50" icon={<Icon as={FiFlag} color="info.70" boxSize="15px" />} />
      <StatCard label="Overdue" value={counts.overdue} valueColor="error.70" accentColor="error.50" icon={<Icon as={FiAlertTriangle} color="error.70" boxSize="15px" />} />
      <StatCard label="Completed" value={counts.completed} valueColor="success.70" accentColor="success.50" icon={<Icon as={FiCheckCircle} color="success.70" boxSize="15px" />} />
    </Grid>
  );
}
