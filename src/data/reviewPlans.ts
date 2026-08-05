import "server-only";

import { getDb } from "@/lib/firebaseAdmin";
import { getReviewTemplates } from "@/data/reviewTemplates";
import type { ReviewPlan } from "@/types/review";

const COLLECTION = "reviewPlans";

export async function getReviewPlans(): Promise<ReviewPlan[]> {
  const snapshot = await getDb().collection(COLLECTION).get();
  return snapshot.docs.map((doc) => doc.data() as ReviewPlan);
}

export async function getReviewPlanById(planId: string): Promise<ReviewPlan | undefined> {
  const doc = await getDb().collection(COLLECTION).doc(planId).get();
  return doc.exists ? (doc.data() as ReviewPlan) : undefined;
}

export async function saveReviewPlan(plan: ReviewPlan): Promise<void> {
  await getDb().collection(COLLECTION).doc(plan.planId).set(plan);
}

export type ReviewPlanRow = ReviewPlan & { templateTitle: string };

export async function getReviewPlanRows(): Promise<ReviewPlanRow[]> {
  const [plans, templates] = await Promise.all([getReviewPlans(), getReviewTemplates()]);
  const titleById = new Map(templates.map((t) => [t.templateId, t.title]));

  return plans.map((plan) => ({ ...plan, templateTitle: titleById.get(plan.templateId) ?? "Unassigned" }));
}
