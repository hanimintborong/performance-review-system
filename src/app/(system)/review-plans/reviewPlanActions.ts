"use server";

import { revalidatePath } from "next/cache";

import { generateAssignmentsForPlan } from "@/data/assignmentGeneration";
import { deleteReviewAssignmentsByPlan, deleteReviewPlan, getReviewPlanById, saveReviewPlan } from "@/data/queries";
import type { ReviewPlan } from "@/types/review";

function revalidateAssignmentPaths(planId: string) {
  revalidatePath("/review-plans");
  revalidatePath(`/review-plans/${planId}`);
  revalidatePath("/reviews");
  revalidatePath("/dashboard");
  revalidatePath("/employee/evaluation");
  revalidatePath("/employee/reviews");
  revalidatePath("/manager/team");
  revalidatePath("/manager/review-progress");
  revalidatePath("/employee/notifications");
}

export async function saveReviewPlanAction(plan: ReviewPlan): Promise<void> {
  await saveReviewPlan(plan);
  revalidateAssignmentPaths(plan.planId);
}

export async function activateReviewPlanAction(planId: string): Promise<number> {
  const plan = await getReviewPlanById(planId);
  if (!plan || plan.status !== "Draft") return 0;

  const updatedPlan: ReviewPlan = { ...plan, status: "Active", activatedAt: new Date().toISOString() };
  await saveReviewPlan(updatedPlan);
  const createdCount = await generateAssignmentsForPlan(updatedPlan);
  revalidateAssignmentPaths(planId);

  return createdCount;
}

export async function closeReviewPlanAction(planId: string): Promise<void> {
  const plan = await getReviewPlanById(planId);
  if (!plan || plan.status !== "Active") return;

  await saveReviewPlan({ ...plan, status: "Closed", closedAt: new Date().toISOString() });
  revalidateAssignmentPaths(planId);
}

export async function duplicatePlanAction(planId: string): Promise<ReviewPlan | null> {
  const plan = await getReviewPlanById(planId);
  if (!plan) return null;

  const copy: ReviewPlan = {
    ...plan,
    planId: `${plan.planId}-COPY-${Math.random().toString(36).slice(2, 7)}`,
    title: `${plan.title} (Copy)`,
    status: "Draft",
    createdAt: new Date().toISOString(),
    activatedAt: null,
    closedAt: null,
  };
  await saveReviewPlan(copy);
  revalidateAssignmentPaths(copy.planId);

  return copy;
}

export async function deletePlanAction(planId: string): Promise<void> {
  await deleteReviewAssignmentsByPlan(planId);
  await deleteReviewPlan(planId);
  revalidateAssignmentPaths(planId);
}
