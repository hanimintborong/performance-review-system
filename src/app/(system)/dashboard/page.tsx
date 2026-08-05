import { Flex, Grid } from "@chakra-ui/react";

import { CycleBanner } from "@/app/(system)/dashboard/CycleBanner";
import { DepartmentProgress } from "@/app/(system)/dashboard/DepartmentProgress";
import { RecentActivity } from "@/app/(system)/dashboard/RecentActivity";
import { RequiredActions } from "@/app/(system)/dashboard/RequiredActions";
import { StatCard } from "@/components/common/StatCard";
import { getNotificationHistory, getReviewPlans, getReviewRows } from "@/data/queries";

export default async function DashboardPage() {
  const [plans, allRows, history] = await Promise.all([getReviewPlans(), getReviewRows(), getNotificationHistory()]);

  const activePlan = plans.find((p) => p.status === "Active");
  const rows = activePlan ? allRows.filter((r) => r.planId === activePlan.planId) : allRows;

  const completed = rows.filter((r) => r.status === "Finalised").length;
  const overdue = rows.filter((r) => r.status === "Overdue").length;
  const pending = rows.length - completed - overdue;
  const departmentCount = new Set(rows.map((r) => r.employee.department)).size;
  const completionRate = rows.length > 0 ? Math.round((completed / rows.length) * 100) : 0;

  return (
    <Flex direction="column" gap="14px">
      <CycleBanner plan={activePlan} />

      <Grid templateColumns="repeat(4, 1fr)" gap="12px">
        <StatCard label="Total reviews" value={rows.length} helperText={`Across ${departmentCount} departments`} />
        <StatCard label="Completed" value={completed} valueColor="success.70" helperText={`${completionRate}% completion rate`} />
        <StatCard label="Pending" value={pending} valueColor="warning.70" />
        <StatCard label="Overdue" value={overdue} valueColor="error.70" />
      </Grid>

      <Grid templateColumns="1.4fr 1fr" gap="12px">
        <DepartmentProgress rows={rows} />
        <RecentActivity history={history} />
      </Grid>

      <RequiredActions rows={rows} />
    </Flex>
  );
}
