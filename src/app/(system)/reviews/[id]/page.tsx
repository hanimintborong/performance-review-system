import { notFound } from "next/navigation";
import NextLink from "next/link";

import { Flex, Grid, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import { DiscussionGuidanceBanner } from "@/components/common/DiscussionGuidanceBanner";
import { EmployeeInfoCard } from "@/components/common/EmployeeInfoCard";
import { FinalOutcomeBanner } from "@/components/common/FinalOutcomeBanner";
import { ScoreBadge } from "@/components/common/ScoreBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ReviewFormSection } from "@/components/review-form/ReviewFormSection";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import { getReviewPlanById, getReviewResponse, getReviewRowById, getReviewTemplateById } from "@/data/queries";
import { computeFinalWeightedScore } from "@/lib/reviewScoring";

type ReviewDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { id } = await params;
  const row = await getReviewRowById(id);

  if (!row) notFound();

  const plan = await getReviewPlanById(row.planId);
  const template = plan ? await getReviewTemplateById(plan.templateId) : undefined;
  const response = await getReviewResponse(id);
  const answers = Object.fromEntries(response.answers.map((a) => [a.questionId, a.value]));
  const finalScore = template ? computeFinalWeightedScore(template.sections, response.answers) : null;
  const hasWeightedSections = template?.sections.some((s) => (s.weightage ?? 0) > 0) ?? false;

  return (
    <Flex direction="column" gap="14px">
      <NextLink href="/reviews" style={{ textDecoration: "none" }}>
        <Flex align="center" gap="6px" color="brand.50" fontSize="13px" fontWeight="700">
          <FiArrowLeft size={14} /> Back to reviews
        </Flex>
      </NextLink>

      <EmployeeInfoCard employee={row.employee} />

      <AppCard p="16px 20px">
        <Flex align="center" justify="space-between" flexWrap="wrap" gap="12px">
          <Grid templateColumns="repeat(3, 1fr)" gap="16px" flex="1">
            <Field label="Review plan" value={row.planTitle} />
            <Field label="Manager" value={row.managerName} />
            <Field label="Cycle status" value={row.planStatus} />
          </Grid>
          <Flex direction="column" gap="4px" align="flex-end">
            <Text fontSize="11px" fontWeight="600" color="grey.60">Status</Text>
            <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />
          </Flex>
        </Flex>
      </AppCard>

      {row.status === "Finalised" && row.finalOutcome && (
        <FinalOutcomeBanner
          outcome={row.finalOutcome}
          finalizedAt={row.finalizedAt}
          notes={row.finalOutcomeNotes}
          incrementPercentage={row.incrementPercentage}
          incrementEffectiveDate={row.incrementEffectiveDate}
        />
      )}

      <AppCard p="16px 20px">
        <Grid templateColumns={hasWeightedSections ? "repeat(3, 1fr)" : "repeat(2, 1fr)"} gap="16px">
          <Flex direction="column" gap="8px">
            <Text fontSize="12px" fontWeight="600" color="grey.60">Employee self-score</Text>
            <ScoreBadge score={row.employeeScore} />
          </Flex>

          <Flex direction="column" gap="8px">
            <Text fontSize="12px" fontWeight="600" color="grey.60">Manager score</Text>
            <ScoreBadge score={row.managerScore} />
          </Flex>

          {hasWeightedSections && (
            <Flex direction="column" gap="8px">
              <Text fontSize="12px" fontWeight="600" color="grey.60">Total score</Text>
              <ScoreBadge score={finalScore} max={100} />
            </Flex>
          )}
        </Grid>
      </AppCard>

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

      {row.status === "Manager Submitted" && <DiscussionGuidanceBanner audience="hr" />}
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
