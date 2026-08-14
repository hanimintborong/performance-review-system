import { Flex } from "@chakra-ui/react";

import { DashboardOverview } from "@/app/(system)/dashboard/DashboardOverview";
import { RecentActivity } from "@/app/(system)/dashboard/RecentActivity";
import { RequiredActions } from "@/app/(system)/dashboard/RequiredActions";
import { getNotificationHistory, getReviewPlans, getReviewRows } from "@/data/queries";

export default async function DashboardPage() {
  const [plans, allRows, history] = await Promise.all([getReviewPlans(), getReviewRows(), getNotificationHistory()]);

  const activePlanIds = new Set(plans.filter((p) => p.status === "Active").map((p) => p.planId));
  const rows = activePlanIds.size > 0 ? allRows.filter((r) => activePlanIds.has(r.planId)) : allRows;

  return (
    <Flex direction="column" gap="14px">
      <DashboardOverview allRows={allRows} plans={plans} />
      <RecentActivity history={history} />
      <RequiredActions rows={rows} />
    </Flex>
  );
}
