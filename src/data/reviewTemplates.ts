import "server-only";

import { cache } from "react";
import { getDb } from "@/lib/firebaseAdmin";
import type { ReviewTemplate } from "@/types/template";

const COLLECTION = "reviewTemplates";

export const getReviewTemplates = cache(
  async (): Promise<ReviewTemplate[]> => {
    const snapshot = await getDb()
      .collection(COLLECTION)
      .get();

    return snapshot.docs.map(
      (doc) => doc.data() as ReviewTemplate,
    );
  },
);

export const getReviewTemplateById = cache(
  async (
    templateId: string,
  ): Promise<ReviewTemplate | undefined> => {
    const document = await getDb()
      .collection(COLLECTION)
      .doc(templateId)
      .get();

    return document.exists
      ? (document.data() as ReviewTemplate)
      : undefined;
  },
);

export const getTemplateTitle = cache(
  async (templateId: string): Promise<string> => {
    const template = await getReviewTemplateById(templateId);

    return template?.title ?? "Unassigned";
  },
);

export async function saveReviewTemplate(
  template: ReviewTemplate,
): Promise<void> {
  await getDb()
    .collection(COLLECTION)
    .doc(template.templateId)
    .set(template);
}

export async function deleteReviewTemplate(
  templateId: string,
): Promise<void> {
  await getDb()
    .collection(COLLECTION)
    .doc(templateId)
    .delete();
}