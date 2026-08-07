"use server";

import { revalidatePath } from "next/cache";

import { generateAssignmentsForPlan } from "@/data/assignmentGeneration";
import { getReviewPlanById, saveReviewPlan } from "@/data/queries";
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
}

export async function saveReviewPlanAction(plan: ReviewPlan): Promise<number> {
  await saveReviewPlan(plan);
  const createdCount = plan.status === "Active" ? await generateAssignmentsForPlan(plan) : 0;
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
