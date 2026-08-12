import { Grid } from "@chakra-ui/react";

import { StatusBucketBreakdown } from "@/components/common/StatusBucketBreakdown";
import { TrendCard } from "@/components/common/TrendCard";
import type { ReviewRow } from "@/data/queries";
import { buildCompletionTrend } from "@/lib/completionTrend";
import { bucketCounts } from "@/lib/teamProgressStats";

export function TeamOverview({ rows }: { rows: ReviewRow[] }) {
  const counts = bucketCounts(rows);
  const trend = buildCompletionTrend(rows.filter((r) => r.finalizedAt).map((r) => r.finalizedAt as string));

  return (
    <Grid templateColumns="1fr 1.3fr" gap="12px">
      <StatusBucketBreakdown counts={counts} total={rows.length} title="Evaluation progress by status" />
      <TrendCard points={trend} />
    </Grid>
  );
}
