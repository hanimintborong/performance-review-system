import { redirect } from "next/navigation";
import NextLink from "next/link";
import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
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

  return (
    <Flex direction="column" gap="14px">
      <AppCard p="16px 20px">
        <Text fontSize="15px" fontWeight="700" color="grey.80">You have {pendingRows.length} self-assessments to complete</Text>
        <Text fontSize="12px" color="grey.60" mt="2px">Pick one to get started.</Text>
      </AppCard>

      {pendingRows.map((row) => (
        <AppCard key={row.assignmentId} p="16px 20px">
          <Flex align="center" justify="space-between" flexWrap="wrap" gap="10px">
            <Flex direction="column" gap="4px">
              <Text fontSize="14px" fontWeight="700" color="grey.80">{row.planTitle}</Text>
              <Text fontSize="12px" color="grey.60">Deadline: {row.deadline}</Text>
            </Flex>
            <Flex align="center" gap="10px">
              <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />
              <NextLink href={`/employee/evaluation/${row.assignmentId}`}>
                <PrimaryButton>{row.status === "Not Started" ? "Start" : "Continue"}</PrimaryButton>
              </NextLink>
            </Flex>
          </Flex>
        </AppCard>
      ))}
    </Flex>
  );
}
