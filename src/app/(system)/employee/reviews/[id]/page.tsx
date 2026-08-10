import { notFound, redirect } from "next/navigation";
import NextLink from "next/link";
import { Flex, Grid, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { AcknowledgeButton } from "@/app/(system)/employee/reviews/[id]/AcknowledgeButton";
import { AppCard } from "@/components/common/AppCard";
import { DiscussionGuidanceBanner } from "@/components/common/DiscussionGuidanceBanner";
import { ScoreBadge } from "@/components/common/ScoreBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ReviewFormSection } from "@/components/review-form/ReviewFormSection";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import { getReviewPlanById, getReviewResponse, getReviewRowById, getReviewTemplateById } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

type PageProps = { params: Promise<{ id: string }> };

export default async function EmployeeReviewResultPage({ params }: PageProps) {
  const { id } = await params;
  const systemUser = await getCurrentSystemUser();
  const row = await getReviewRowById(id);

  if (!row) notFound();
  if (!systemUser || row.employee.employeeId !== systemUser.employeeId) redirect("/employee/reviews");

  const plan = await getReviewPlanById(row.planId);
  const template = plan ? await getReviewTemplateById(plan.templateId) : undefined;
  const response = await getReviewResponse(id);
  const answers = Object.fromEntries(response.answers.map((a) => [a.questionId, a.value]));

  return (
    <Flex direction="column" gap="14px">
      <NextLink href="/employee/reviews" style={{ textDecoration: "none" }}>
        <Flex align="center" gap="6px" color="brand.50" fontSize="13px" fontWeight="700">
          <FiArrowLeft size={14} /> Back to my reviews
        </Flex>
      </NextLink>

      <AppCard p="16px 20px">
        <Flex align="center" justify="space-between" flexWrap="wrap" gap="10px">
          <Flex direction="column" gap="4px">
            <Text fontSize="17px" fontWeight="700" color="grey.80">{row.planTitle}</Text>
            <Text fontSize="12px" color="grey.60">Reviewer: {row.managerName} · Deadline: {row.deadline}</Text>
          </Flex>
          <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />
        </Flex>
      </AppCard>

      {row.status === "Finalised" && row.finalOutcome && (
        <AppCard p="16px 20px" bg="success.10" borderColor="success.50">
          <Text fontSize="12px" fontWeight="700" color="success.70" mb="4px">
            Outcome: {row.finalOutcome}
          </Text>
          {row.finalOutcomeNotes && <Text fontSize="13px" color="grey.70">{row.finalOutcomeNotes}</Text>}
        </AppCard>
      )}

      {row.status === "Finalised" && !row.acknowledged && <AcknowledgeButton assignmentId={row.assignmentId} />}

      {row.status === "Manager Submitted" && <DiscussionGuidanceBanner audience="employee" />}

      <Grid templateColumns="repeat(2, 1fr)" gap="12px">
        <AppCard p="16px 20px">
          <Text fontSize="12px" fontWeight="600" color="grey.60" mb="8px">Your self-score</Text>
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
          <Text fontSize="12px" fontWeight="700" color="grey.80" mb="6px">Your comments</Text>
          <Text fontSize="13px" color="grey.70">{response.employeeComment}</Text>
        </AppCard>
      )}

      {response.managerComment && (
        <AppCard p="16px 20px">
          <Text fontSize="12px" fontWeight="700" color="grey.80" mb="6px">Manager feedback</Text>
          <Text fontSize="13px" color="grey.70">{response.managerComment}</Text>
        </AppCard>
      )}
    </Flex>
  );
}
