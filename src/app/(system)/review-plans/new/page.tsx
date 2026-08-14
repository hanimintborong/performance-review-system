import NextLink from "next/link";
import { Flex } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { PlanForm } from "@/app/(system)/review-plans/PlanForm";
import { nextPlanId } from "@/app/(system)/review-plans/nextPlanId";
import { DEPARTMENTS } from "@/constants/departments";
import { getEmployees, getReviewAssignments, getReviewPlans, getReviewTemplates } from "@/data/queries";
import { addDays } from "@/lib/date";
import type { ReviewPlan } from "@/types/review";

export default async function NewReviewPlanPage() {
  const [plans, assignments, employees, templates] = await Promise.all([
    getReviewPlans(),
    getReviewAssignments(),
    getEmployees(),
    getReviewTemplates(),
  ]);

  const planId = nextPlanId(plans.map((p) => p.planId), assignments.map((a) => a.planId));
  const today = new Date().toISOString().slice(0, 10);

  const blankPlan: ReviewPlan = {
    planId,
    title: "",
    description: "",
    templateId: "",
    reviewPeriod: "",
    createdAt: "",
    startDate: "",
    employeeDeadline: "",
    managerDeadline: "",
    hrReviewDeadline: "",
    managementReviewPeriod: "",
    departments: [...DEPARTMENTS],
    participantCount: 0,
    status: "Draft",
  };

  return (
    <Flex direction="column" gap="14px">
      <NextLink href="/review-plans" style={{ textDecoration: "none" }}>
        <Flex align="center" gap="6px" color="brand.50" fontSize="13px" fontWeight="700">
          <FiArrowLeft size={14} /> Back to cycles
        </Flex>
      </NextLink>

      <PlanForm
        initialPlan={blankPlan}
        initialStart={today}
        initialEnd={addDays(today, 29)}
        mode="create"
        employees={employees}
        templates={templates}
      />
    </Flex>
  );
}
