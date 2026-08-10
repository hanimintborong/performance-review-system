import { Flex, Grid } from "@chakra-ui/react";

import { CycleBanner } from "@/app/(system)/dashboard/CycleBanner";
import { DashboardOverview } from "@/app/(system)/dashboard/DashboardOverview";
import { DepartmentProgress } from "@/app/(system)/dashboard/DepartmentProgress";
import { RecentActivity } from "@/app/(system)/dashboard/RecentActivity";
import { RequiredActions } from "@/app/(system)/dashboard/RequiredActions";
import { getNotificationHistory, getReviewPlans, getReviewRows } from "@/data/queries";

export default async function DashboardPage() {
  const [plans, allRows, history] = await Promise.all([getReviewPlans(), getReviewRows(), getNotificationHistory()]);

  const activePlan = plans.find((p) => p.status === "Active");
  const rows = activePlan ? allRows.filter((r) => r.planId === activePlan.planId) : allRows;

  return (
    <Flex direction="column" gap="14px">
      <CycleBanner plan={activePlan} />

      <DashboardOverview rows={rows} />

      <Grid templateColumns="1.4fr 1fr" gap="12px">
        <DepartmentProgress rows={rows} />
        <RecentActivity history={history} />
      </Grid>

      <RequiredActions rows={rows} />
    </Flex>
  );
}
