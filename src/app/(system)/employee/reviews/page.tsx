import { Flex, Grid } from "@chakra-ui/react";

import { ReviewsTable } from "@/app/(system)/employee/reviews/ReviewsTable";
import { StatCard } from "@/components/common/StatCard";
import { getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

export default async function EmployeeReviewsPage() {
  const systemUser = await getCurrentSystemUser();
  const allRows = await getReviewRows();
  const rows = allRows.filter((r) => r.employee.employeeId === systemUser?.employeeId);

  const finalised = rows.filter((r) => r.status === "Finalised" && r.employeeScore !== null);
  const latestScore = finalised.length > 0 ? finalised[finalised.length - 1].employeeScore : null;
  const current = rows.find((r) => r.status !== "Finalised");

  return (
    <Flex direction="column" gap="14px">
      <Grid templateColumns="repeat(3, 1fr)" gap="12px">
        <StatCard label="Latest overall score" value={latestScore?.toFixed(1) ?? "—"} valueColor="brand.70" />
        <StatCard label="Reviews on record" value={rows.length} />
        <StatCard label="Current cycle status" value={current?.status ?? "None active"} />
      </Grid>

      <ReviewsTable rows={rows} />
    </Flex>
  );
}
