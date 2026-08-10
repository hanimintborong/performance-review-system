import "server-only";

import { cache } from "react";
import { getDb } from "@/lib/firebaseAdmin";
import { getReviewTemplates } from "@/data/reviewTemplates";
import type { ReviewPlan } from "@/types/review";

const COLLECTION = "reviewPlans";

export const getReviewPlans = cache(
  async (): Promise<ReviewPlan[]> => {
    const snapshot = await getDb()
      .collection(COLLECTION)
      .get();

    return snapshot.docs.map(
      (doc) => doc.data() as ReviewPlan,
    );
  },
);

export const getReviewPlanById = cache(
  async (
    planId: string,
  ): Promise<ReviewPlan | undefined> => {
    const document = await getDb()
      .collection(COLLECTION)
      .doc(planId)
      .get();

    return document.exists
      ? (document.data() as ReviewPlan)
      : undefined;
  },
);

export async function saveReviewPlan(
  plan: ReviewPlan,
): Promise<void> {
  await getDb()
    .collection(COLLECTION)
    .doc(plan.planId)
    .set(plan);
}

export async function deleteReviewPlan(
  planId: string,
): Promise<void> {
  await getDb()
    .collection(COLLECTION)
    .doc(planId)
    .delete();
}

export type ReviewPlanRow = ReviewPlan & {
  templateTitle: string;
};

export const getReviewPlanRows = cache(
  async (): Promise<ReviewPlanRow[]> => {
    const [plans, templates] = await Promise.all([
      getReviewPlans(),
      getReviewTemplates(),
    ]);

    const titleById = new Map(
      templates.map((template) => [
        template.templateId,
        template.title,
      ]),
    );

    return plans.map((plan) => ({
      ...plan,
      templateTitle:
        titleById.get(plan.templateId) ?? "Unassigned",
    }));
  },
);