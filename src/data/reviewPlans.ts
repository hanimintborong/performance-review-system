import "server-only";

import { cache } from "react";
import { desc, eq } from "drizzle-orm";

import { reviewPlans as reviewPlansTable } from "@/db/schema";
import { getReviewTemplates } from "@/data/reviewTemplates";
import { db } from "@/lib/db";
import type { ReviewPlan } from "@/types/review";

export const getReviewPlans = cache(async (): Promise<ReviewPlan[]> => {
  return db.select().from(reviewPlansTable).orderBy(desc(reviewPlansTable.createdAt));
});

export const getReviewPlanById = cache(async (planId: string): Promise<ReviewPlan | undefined> => {
  const [record] = await db.select().from(reviewPlansTable).where(eq(reviewPlansTable.planId, planId)).limit(1);
  return record ?? undefined;
});

export async function saveReviewPlan(plan: ReviewPlan): Promise<void> {
  await db.insert(reviewPlansTable).values(plan).onConflictDoUpdate({
    target: reviewPlansTable.planId,
    set: plan,
  });
}

export async function deleteReviewPlan(planId: string): Promise<void> {
  await db.delete(reviewPlansTable).where(eq(reviewPlansTable.planId, planId));
}

export type ReviewPlanRow = ReviewPlan & { templateTitle: string };

export const getReviewPlanRows = cache(async (): Promise<ReviewPlanRow[]> => {
  const [plans, templates] = await Promise.all([getReviewPlans(), getReviewTemplates()]);
  const titleById = new Map(templates.map((template) => [template.templateId, template.title]));

  return plans.map((plan) => ({
    ...plan,
    templateTitle: titleById.get(plan.templateId) ?? "Unassigned",
  }));
});
