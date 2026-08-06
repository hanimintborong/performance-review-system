import { TeamClient } from "@/app/(system)/manager/team/TeamClient";
import { getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

export default async function ManagerTeamPage() {
  const systemUser = await getCurrentSystemUser();
  const allRows = await getReviewRows();
  const rows = allRows.filter((r) => r.managerId === systemUser?.employeeId);
  const planTitle = rows[0]?.planTitle ?? "No active review cycle";

  return <TeamClient rows={rows} planTitle={planTitle} />;
}
