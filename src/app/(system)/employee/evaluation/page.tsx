import { redirect } from "next/navigation";
import { Flex, Text } from "@chakra-ui/react";

import { SelfAssessmentTable } from "@/app/(system)/employee/evaluation/SelfAssessmentTable";
import { AppCard } from "@/components/common/AppCard";
import { getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

const PENDING_STATUSES = ["Not Started", "Self-Assessment In Progress", "Overdue"];

export default async function EmployeeEvaluationEntryPage() {
  const systemUser = await getCurrentSystemUser();
  const rows = await getReviewRows();

  const pendingRows = rows.filter(
    (r) => r.employee.employeeId === systemUser?.employeeId && PENDING_STATUSES.includes(r.status),
  );

  if (pendingRows.length === 1) redirect(`/employee/evaluation/${pendingRows[0].assignmentId}`);

  if (pendingRows.length === 0) {
    return (
      <AppCard p="24px">
        <Flex direction="column" gap="6px">
          <Text fontSize="15px" fontWeight="700" color="grey.80">No self-assessment pending</Text>
          <Text fontSize="13px" color="grey.60">
            You don&apos;t have an open self-assessment right now. Check My Reviews for past results.
          </Text>
        </Flex>
      </AppCard>
    );
  }

  return <SelfAssessmentTable rows={pendingRows} />;
}
