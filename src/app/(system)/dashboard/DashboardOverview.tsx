import { Grid } from "@chakra-ui/react";

import { DashboardStatCards } from "@/app/(system)/dashboard/DashboardStatCards";
import { DepartmentProgress } from "@/app/(system)/dashboard/DepartmentProgress";
import { StatusBucketBreakdown } from "@/components/common/StatusBucketBreakdown";
import type { ReviewRow } from "@/data/queries";
import { bucketCounts } from "@/lib/teamProgressStats";

export function DashboardOverview({ rows }: { rows: ReviewRow[] }) {
  const counts = bucketCounts(rows);
  const departmentCount = new Set(rows.map((r) => r.employee.department)).size;

  return (
    <>
      <DashboardStatCards counts={counts} total={rows.length} departmentCount={departmentCount} />
      <Grid templateColumns="1fr 1.3fr" gap="12px">
        <StatusBucketBreakdown counts={counts} total={rows.length} />
        <DepartmentProgress rows={rows} />
      </Grid>
    </>
  );
}
