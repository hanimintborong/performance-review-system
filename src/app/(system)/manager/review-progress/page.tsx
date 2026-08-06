import { Flex, Grid } from "@chakra-ui/react";

import { ProgressTable } from "@/app/(system)/manager/review-progress/ProgressTable";
import { StatCard } from "@/components/common/StatCard";
import { getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

export default async function TeamReviewProgressPage() {
  const systemUser = await getCurrentSystemUser();
  const allRows = await getReviewRows();
  const rows = allRows.filter((r) => r.managerId === systemUser?.employeeId);

  const submitted = rows.filter((r) => r.status === "Employee Submitted").length;
  const overdue = rows.filter((r) => r.status === "Overdue").length;
  const awaitingDiscussion = rows.filter((r) => r.status === "Awaiting Discussion").length;
  const completed = rows.filter((r) => r.status === "Finalised").length;
  const pending = rows.length - submitted - overdue - awaitingDiscussion - completed;

  return (
    <Flex direction="column" gap="14px">
      <Grid templateColumns="repeat(5, 1fr)" gap="12px">
        <StatCard label="Submitted" value={submitted} valueColor="info.70" />
        <StatCard label="Pending" value={pending} valueColor="warning.70" />
        <StatCard label="Overdue" value={overdue} valueColor="error.70" />
        <StatCard label="Awaiting discussion" value={awaitingDiscussion} valueColor="brand.70" />
        <StatCard label="Completed" value={completed} valueColor="success.70" />
      </Grid>

      <ProgressTable rows={rows} />
    </Flex>
  );
}
