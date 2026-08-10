import { Flex } from "@chakra-ui/react";

import { DashboardOverview } from "@/app/(system)/dashboard/DashboardOverview";
import { RecentActivity } from "@/app/(system)/dashboard/RecentActivity";
import { RequiredActions } from "@/app/(system)/dashboard/RequiredActions";
import { getNotificationHistory, getReviewPlans, getReviewRows } from "@/data/queries";

export default async function DashboardPage() {
  const [plans, allRows, history] = await Promise.all([getReviewPlans(), getReviewRows(), getNotificationHistory()]);

  const activePlan = plans.find((p) => p.status === "Active");
  const rows = activePlan ? allRows.filter((r) => r.planId === activePlan.planId) : allRows;

  return (
    <Flex direction="column" gap="14px">
      <DashboardOverview rows={rows} />
      <RecentActivity history={history} />
      <RequiredActions rows={rows} />
    </Flex>
  );
}
