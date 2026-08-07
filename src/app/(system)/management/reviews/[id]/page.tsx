import { notFound, redirect } from "next/navigation";
import NextLink from "next/link";

import { Flex, Grid, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { FinalizeReviewDialog } from "@/app/(system)/management/reviews/[id]/FinalizeReviewDialog";
import { AppCard } from "@/components/common/AppCard";
import { EmployeeInfoCard } from "@/components/common/EmployeeInfoCard";
import { ScoreBadge } from "@/components/common/ScoreBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ReviewFormSection } from "@/components/review-form/ReviewFormSection";
import { READY_TO_FINALISE_STATUSES } from "@/constants/reviewStatusGroups";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import { getEmployees, getReviewPlanById, getReviewResponse, getReviewRowById, getReviewTemplateById } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";
import { isVisibleToTopManagement } from "@/lib/managementVisibility";

type PageProps = { params: Promise<{ id: string }> };

export default async function ManagementReviewDetailPage({ params }: PageProps) {
  const { id } = await params;
  const systemUser = await getCurrentSystemUser();
  const row = await getReviewRowById(id);

  if (!row) notFound();

  const employees = await getEmployees();
  if (!systemUser || !isVisibleToTopManagement(row, employees, systemUser.employeeId)) redirect("/management/reviews");

  const plan = await getReviewPlanById(row.planId);
  const template = plan ? await getReviewTemplateById(plan.templateId) : undefined;
  const response = await getReviewResponse(id);
  const answers = Object.fromEntries(response.answers.map((a) => [a.questionId, a.value]));

  return (
    <Flex direction="column" gap="14px">
      <NextLink href="/management/reviews" style={{ textDecoration: "none" }}>
        <Flex align="center" gap="6px" color="brand.50" fontSize="13px" fontWeight="700">
          <FiArrowLeft size={14} /> Back to review summary
        </Flex>
      </NextLink>

      <EmployeeInfoCard employee={row.employee} />

      <AppCard p="16px 20px">
        <Flex align="center" justify="space-between" flexWrap="wrap" gap="12px">
          <Grid templateColumns="repeat(3, 1fr)" gap="16px" flex="1">
            <Field label="Review plan" value={row.planTitle} />
            <Field label="Manager" value={row.managerName} />
            <Field label="Deadline" value={row.deadline} />
          </Grid>
          <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />
        </Flex>
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

      {template?.sections.map((section) => (
        <ReviewFormSection key={section.sectionId} section={section} answers={answers} />
      ))}

      {response.employeeComment && (
        <AppCard p="16px 20px">
          <Text fontSize="12px" fontWeight="700" color="grey.80" mb="6px">Employee comments</Text>
          <Text fontSize="13px" color="grey.70">{response.employeeComment}</Text>
        </AppCard>
      )}

      {response.managerComment && (
        <AppCard p="16px 20px">
          <Text fontSize="12px" fontWeight="700" color="grey.80" mb="6px">Manager feedback / meeting notes</Text>
          <Text fontSize="13px" color="grey.70">{response.managerComment}</Text>
        </AppCard>
      )}

      {row.status === "Finalised" && row.finalOutcome && (
        <AppCard p="16px 20px" bg="success.10" borderColor="success.50">
          <Text fontSize="12px" fontWeight="700" color="success.70" mb="4px">
            Finalised · {row.finalOutcome} · {row.finalizedAt?.slice(0, 10)}
          </Text>
          {row.finalOutcomeNotes && <Text fontSize="13px" color="grey.70">{row.finalOutcomeNotes}</Text>}
        </AppCard>
      )}

      {READY_TO_FINALISE_STATUSES.includes(row.status) && (
        <Flex justify="flex-end">
          <FinalizeReviewDialog assignmentId={row.assignmentId} />
        </Flex>
      )}
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
