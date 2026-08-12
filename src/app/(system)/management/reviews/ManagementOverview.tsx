import { Grid } from "@chakra-ui/react";

import { ManagementStatusBreakdown } from "@/app/(system)/management/reviews/ManagementStatusBreakdown";
import { TrendCard } from "@/components/common/TrendCard";
import type { ReviewRow } from "@/data/queries";
import { buildCompletionTrend } from "@/lib/completionTrend";
import { managementBucketCounts } from "@/lib/managementProgressStats";

export function ManagementOverview({ rows }: { rows: ReviewRow[] }) {
  const counts = managementBucketCounts(rows);
  const trend = buildCompletionTrend(rows.filter((r) => r.finalizedAt).map((r) => r.finalizedAt as string));

  return (
    <Grid templateColumns="1fr 1.3fr" gap="12px">
      <ManagementStatusBreakdown counts={counts} total={rows.length} />
      <TrendCard points={trend} />
    </Grid>
  );
}
