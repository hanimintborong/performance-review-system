"use server";

import { revalidatePath } from "next/cache";

import { getReviewPlanById, saveReviewPlan } from "@/data/queries";
import type { ReviewPlan } from "@/types/review";

export async function saveReviewPlanAction(plan: ReviewPlan) {
  await saveReviewPlan(plan);
  revalidatePath("/review-plans");
  revalidatePath(`/review-plans/${plan.planId}`);
}

export async function toggleReviewPlanStatusAction(planId: string): Promise<ReviewPlan["status"] | null> {
  const plan = await getReviewPlanById(planId);
  if (!plan) return null;

  const nextStatus = plan.status === "Archived" ? "Active" : "Archived";
  await saveReviewPlan({ ...plan, status: nextStatus });
  revalidatePath("/review-plans");
  revalidatePath(`/review-plans/${planId}`);

  return nextStatus;
}
