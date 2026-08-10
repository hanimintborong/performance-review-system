import { Grid } from "@chakra-ui/react";

import { DashboardStatCards } from "@/app/(system)/dashboard/DashboardStatCards";
import { StatusBucketBreakdown } from "@/components/common/StatusBucketBreakdown";
import { TrendCard } from "@/components/common/TrendCard";
import type { ReviewRow } from "@/data/queries";
import { buildCompletionTrend } from "@/lib/completionTrend";
import { bucketCounts } from "@/lib/teamProgressStats";

export function DashboardOverview({ rows }: { rows: ReviewRow[] }) {
  const counts = bucketCounts(rows);
  const departmentCount = new Set(rows.map((r) => r.employee.department)).size;
  const trend = buildCompletionTrend(rows.filter((r) => r.finalizedAt).map((r) => r.finalizedAt as string));

  return (
    <>
      <DashboardStatCards counts={counts} total={rows.length} departmentCount={departmentCount} />
      <Grid templateColumns="1fr 1.3fr" gap="12px">
        <StatusBucketBreakdown counts={counts} total={rows.length} />
        <TrendCard points={trend} title="Completions over time" />
      </Grid>
    </>
  );
}
