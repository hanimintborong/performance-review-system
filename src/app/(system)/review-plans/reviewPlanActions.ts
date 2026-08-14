"use server";

import { revalidatePath } from "next/cache";

import { generateAssignmentsForPlan, syncAssignmentDeadlines } from "@/data/assignmentGeneration";
import { deleteReviewPlan, getReviewPlanById, saveReviewPlan } from "@/data/queries";
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

export async function saveReviewPlanAction(plan: ReviewPlan): Promise<number> {
  await saveReviewPlan(plan);
  const createdCount = plan.status === "Active" ? await generateAssignmentsForPlan(plan) : 0;
  await syncAssignmentDeadlines(plan);
  revalidateAssignmentPaths(plan.planId);
  return createdCount;
}

export async function toggleReviewPlanStatusAction(planId: string): Promise<ReviewPlan["status"] | null> {
  const plan = await getReviewPlanById(planId);
  if (!plan) return null;

  const nextStatus = plan.status === "Archived" ? "Active" : "Archived";
  const updatedPlan: ReviewPlan = { ...plan, status: nextStatus };
  await saveReviewPlan(updatedPlan);

  if (nextStatus === "Active") await generateAssignmentsForPlan(updatedPlan);
  revalidateAssignmentPaths(planId);

  return nextStatus;
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
  };
  await saveReviewPlan(copy);
  revalidateAssignmentPaths(copy.planId);

  return copy;
}

export async function deletePlanAction(planId: string): Promise<void> {
  await deleteReviewPlan(planId);
  revalidatePath("/review-plans");
}
