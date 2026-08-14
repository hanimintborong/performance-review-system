"use client";

import { useMemo, useState } from "react";
import { Flex, Grid, NativeSelect } from "@chakra-ui/react";

import { DashboardStatCards } from "@/app/(system)/dashboard/DashboardStatCards";
import { DepartmentProgress } from "@/app/(system)/dashboard/DepartmentProgress";
import { StatusBucketBreakdown } from "@/components/common/StatusBucketBreakdown";
import type { ReviewRow } from "@/data/queries";
import { bucketCounts } from "@/lib/teamProgressStats";
import type { ReviewPlan } from "@/types/review";

const ALL = "All plans";

export function DashboardOverview({ allRows, plans }: { allRows: ReviewRow[]; plans: ReviewPlan[] }) {
  const [planId, setPlanId] = useState(ALL);

  const activePlanIds = useMemo(() => new Set(plans.filter((p) => p.status === "Active").map((p) => p.planId)), [plans]);
  const rows = planId !== ALL
    ? allRows.filter((r) => r.planId === planId)
    : activePlanIds.size > 0
      ? allRows.filter((r) => activePlanIds.has(r.planId))
      : allRows;

  const counts = bucketCounts(rows);
  const departmentCount = new Set(rows.map((r) => r.employee.department)).size;

  return (
    <Flex direction="column" gap="12px">
      <Flex justify="flex-end">
        <NativeSelect.Root w="220px" size="sm">
          <NativeSelect.Field value={planId} onChange={(e) => setPlanId(e.target.value)} fontSize="12px" pl="12px" pr="26px">
            <option value={ALL}>{ALL}</option>
            {plans.map((p) => <option key={p.planId} value={p.planId}>{p.title}</option>)}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>

      <DashboardStatCards counts={counts} total={rows.length} departmentCount={departmentCount} />
      <Grid templateColumns="1fr 1.3fr" gap="12px">
        <StatusBucketBreakdown counts={counts} total={rows.length} title="Evaluation progress by status" />
        <DepartmentProgress rows={rows} />
      </Grid>
    </Flex>
  );
}
