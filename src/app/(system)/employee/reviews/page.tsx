import { Flex } from "@chakra-ui/react";

import { ReviewsTable } from "@/app/(system)/employee/reviews/ReviewsTable";
import { getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

export default async function EmployeeReviewsPage() {
  const systemUser = await getCurrentSystemUser();
  const allRows = await getReviewRows();
  const rows = allRows.filter((r) => r.employee.employeeId === systemUser?.employeeId);

  const finalised = rows.filter((r) => r.status === "Finalised" && r.employeeScore !== null);
  const latestScore = finalised.length > 0 ? finalised[finalised.length - 1].employeeScore : null;
  const isManager = systemUser?.role === "manager";

  return (
    <Flex direction="column" gap="14px">
      <ReviewsTable
        rows={rows}
        latestScore={latestScore}
        title={isManager ? "My review results" : "My reviews"}
        description={isManager ? "Your own performance history, evaluated by your manager — separate from the staff you evaluate under My team" : undefined}
      />
    </Flex>
  );
}
