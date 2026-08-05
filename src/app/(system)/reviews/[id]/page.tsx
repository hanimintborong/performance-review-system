import { notFound } from "next/navigation";
import NextLink from "next/link";

import { Flex, Grid, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import { EmployeeInfoCard } from "@/components/common/EmployeeInfoCard";
import { ScoreBadge } from "@/components/common/ScoreBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import { getReviewRowById } from "@/data/queries";

type ReviewDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { id } = await params;
  const row = await getReviewRowById(id);

  if (!row) notFound();

  return (
    <Flex direction="column" gap="14px">
      <NextLink href="/reviews" style={{ textDecoration: "none" }}>
        <Flex align="center" gap="6px" color="brand.50" fontSize="13px" fontWeight="700">
          <FiArrowLeft size={14} /> Back to reviews
        </Flex>
      </NextLink>

      <EmployeeInfoCard employee={row.employee} />

      <AppCard p="16px 20px">
        <Grid templateColumns="repeat(4, 1fr)" gap="16px">
          <Field label="Review plan" value={row.planTitle} />
          <Field label="Manager" value={row.managerName} />
          <Field label="Deadline" value={row.deadline} />
          <Flex direction="column" gap="4px">
            <Text fontSize="11px" fontWeight="600" color="grey.60">Status</Text>
            <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />
          </Flex>
        </Grid>
      </AppCard>

      <Grid templateColumns="repeat(2, 1fr)" gap="14px">
        <AppCard p="16px 20px">
          <Text fontSize="12px" fontWeight="600" color="grey.60" mb="8px">Employee self-score</Text>
          <ScoreBadge score={row.employeeScore} />
        </AppCard>

        <AppCard p="16px 20px">
          <Text fontSize="12px" fontWeight="600" color="grey.60" mb="8px">Manager score</Text>
          <ScoreBadge score={row.managerScore} />
        </AppCard>
      </Grid>

      <AppCard p="16px 20px" bg="info.10" borderColor="info.50">
        <Text fontSize="12px" color="info.70">
          Full KPI/OKR responses, core-value ratings and manager feedback for {row.planTitle} will
          appear here once the self-assessment and evaluation forms are wired up in a later batch.
        </Text>
      </AppCard>
    </Flex>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Flex direction="column" gap="4px">
      <Text fontSize="11px" fontWeight="600" color="grey.60">{label}</Text>
      <Text fontSize="13px" fontWeight="600" color="grey.80">{value}</Text>
    </Flex>
  );
}
