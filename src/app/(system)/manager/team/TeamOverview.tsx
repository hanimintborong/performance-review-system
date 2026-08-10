import { Grid } from "@chakra-ui/react";

import { TeamStatCards } from "@/app/(system)/manager/team/TeamStatCards";
import { TeamStatusBreakdown } from "@/app/(system)/manager/team/TeamStatusBreakdown";
import { TrendCard } from "@/components/common/TrendCard";
import type { ReviewRow } from "@/data/queries";
import { buildCompletionTrend } from "@/lib/completionTrend";
import { bucketCounts } from "@/lib/teamProgressStats";

export function TeamOverview({ rows }: { rows: ReviewRow[] }) {
  const counts = bucketCounts(rows);
  const trend = buildCompletionTrend(rows.filter((r) => r.finalizedAt).map((r) => r.finalizedAt as string));

  return (
    <>
      <TeamStatCards counts={counts} total={rows.length} />
      <Grid templateColumns="1fr 1.3fr" gap="12px">
        <TeamStatusBreakdown counts={counts} total={rows.length} />
        <TrendCard points={trend} />
      </Grid>
    </>
  );
}
