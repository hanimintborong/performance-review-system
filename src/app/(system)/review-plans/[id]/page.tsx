import { notFound } from "next/navigation";
import NextLink from "next/link";

import { Flex, Grid, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { PlanDetailActions } from "@/app/(system)/review-plans/[id]/PlanDetailActions";
import { AppCard } from "@/components/common/AppCard";
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

      <AppCard p="16px 20px">
        <Flex align="center" justify="space-between" gap="12px" flexWrap="wrap">
          <Flex direction="column" gap="4px">
            <Text fontSize="17px" fontWeight="700" color="grey.80">{plan.title}</Text>
            <Text fontSize="12px" color="grey.60">{plan.description}</Text>
          </Flex>
          <PlanDetailActions planId={plan.planId} title={plan.title} initialStatus={plan.status} />
        </Flex>
      </AppCard>

      <AppCard p="16px 20px">
        <Grid templateColumns="repeat(3, 1fr)" gap="16px">
          <Field label="Template" value={templateTitle} />
          <Field label="Review period" value={plan.reviewPeriod} />
          <Field label="Departments" value={plan.departments.join(", ")} />
          <Field label="Employee deadline" value={plan.employeeDeadline} />
          <Field label="Manager deadline" value={plan.managerDeadline} />
          <Field label="HR review deadline" value={plan.hrReviewDeadline} />
          <Field label="Management review period" value={plan.managementReviewPeriod} />
          <Field label="Participants" value={String(plan.participantCount)} />
        </Grid>
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
