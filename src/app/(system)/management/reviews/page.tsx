import { ManagementReviewsClient } from "@/app/(system)/management/reviews/ManagementReviewsClient";
import { getEmployees, getReviewPlans, getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";
import { isVisibleToTopManagement } from "@/lib/managementVisibility";

export default async function ManagementReviewsPage() {
  const systemUser = await getCurrentSystemUser();
  const [rows, plans, employees] = await Promise.all([getReviewRows(), getReviewPlans(), getEmployees()]);

  const allRows = systemUser
    ? rows.filter((row) => isVisibleToTopManagement(row, employees, systemUser.employeeId))
    : [];

  return <ManagementReviewsClient allRows={allRows} plans={plans} />;
}
