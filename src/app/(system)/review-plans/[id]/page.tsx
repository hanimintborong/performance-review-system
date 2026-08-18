import { notFound } from "next/navigation";
import NextLink from "next/link";

import { Flex } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { PlanDetailActions } from "@/app/(system)/review-plans/[id]/PlanDetailActions";
import { PlanInfoGrid } from "@/app/(system)/review-plans/[id]/PlanInfoGrid";
import { getReviewPlanById, getTemplateTitle } from "@/data/queries";

type PlanDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReviewPlanDetailPage({ params }: PlanDetailPageProps) {
  const { id } = await params;
  const plan = await getReviewPlanById(id);

  if (!plan) notFound();

  const templateTitle = await getTemplateTitle(plan.templateId);

  return (
    <Flex direction="column" gap="14px">
      <NextLink href="/review-plans" style={{ textDecoration: "none" }}>
        <Flex align="center" gap="6px" color="brand.50" fontSize="13px" fontWeight="700">
          <FiArrowLeft size={14} /> Back to review cycles
        </Flex>
      </NextLink>

      <PlanDetailActions planId={plan.planId} title={plan.title} description={plan.description} initialStatus={plan.status} />

      <PlanInfoGrid
        templateTitle={templateTitle}
        departments={plan.departments.join(", ")}
        participantCount={String(plan.participantCount)}
        activatedAt={plan.activatedAt}
        closedAt={plan.closedAt}
      />
    </Flex>
  );
}
