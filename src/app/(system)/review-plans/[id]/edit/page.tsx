import { notFound } from "next/navigation";
import NextLink from "next/link";
import { Flex } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { PlanForm } from "@/app/(system)/review-plans/PlanForm";
import { getEmployees, getReviewPlanById, getReviewTemplates } from "@/data/queries";

type EditPlanPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditReviewPlanPage({ params }: EditPlanPageProps) {
  const { id } = await params;
  const [plan, employees, templates] = await Promise.all([
    getReviewPlanById(id),
    getEmployees(),
    getReviewTemplates(),
  ]);

  if (!plan) notFound();

  return (
    <Flex direction="column" gap="14px">
      <NextLink href={`/review-plans/${plan.planId}`} style={{ textDecoration: "none" }}>
        <Flex align="center" gap="6px" color="brand.50" fontSize="13px" fontWeight="700">
          <FiArrowLeft size={14} /> Back to cycle
        </Flex>
      </NextLink>

      <PlanForm
        initialPlan={plan}
        mode="edit"
        employees={employees}
        templates={templates}
      />
    </Flex>
  );
}
