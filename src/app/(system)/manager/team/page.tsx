import { TeamClient } from "@/app/(system)/manager/team/TeamClient";
import { getReviewPlans, getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

export default async function ManagerTeamPage() {
  const systemUser = await getCurrentSystemUser();
  const [allRows, allPlans] = await Promise.all([getReviewRows(), getReviewPlans()]);
  const rows = allRows.filter((r) => r.managerId === systemUser?.employeeId);

  const relevantPlanIds = new Set(rows.map((r) => r.planId));
  const plans = allPlans.filter((p) => relevantPlanIds.has(p.planId));

  return <TeamClient rows={rows} plans={plans} />;
}
