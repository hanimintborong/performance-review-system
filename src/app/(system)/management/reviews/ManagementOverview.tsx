import { Grid } from "@chakra-ui/react";

import { ManagementStatCards } from "@/app/(system)/management/reviews/ManagementStatCards";
import { ManagementStatusBreakdown } from "@/app/(system)/management/reviews/ManagementStatusBreakdown";
import { TrendCard } from "@/components/common/TrendCard";
import type { ReviewRow } from "@/data/queries";
import { buildCompletionTrend } from "@/lib/completionTrend";
import { managementBucketCounts } from "@/lib/managementProgressStats";

type ManagementOverviewProps = {
  rows: ReviewRow[];
  avgScore: number | null;
};

export function ManagementOverview({ rows, avgScore }: ManagementOverviewProps) {
  const counts = managementBucketCounts(rows);
  const trend = buildCompletionTrend(rows.filter((r) => r.finalizedAt).map((r) => r.finalizedAt as string));

  return (
    <>
      <ManagementStatCards counts={counts} total={rows.length} avgScore={avgScore} />
      <Grid templateColumns="1fr 1.3fr" gap="12px">
        <ManagementStatusBreakdown counts={counts} total={rows.length} />
        <TrendCard points={trend} />
      </Grid>
    </>
  );
}
