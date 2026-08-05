import "server-only";

import { getDb } from "@/lib/firebaseAdmin";
import type { ReviewTemplate } from "@/types/template";

const COLLECTION = "reviewTemplates";

export async function getReviewTemplates(): Promise<ReviewTemplate[]> {
  const snapshot = await getDb().collection(COLLECTION).get();
  return snapshot.docs.map((doc) => doc.data() as ReviewTemplate);
}

export async function getReviewTemplateById(templateId: string): Promise<ReviewTemplate | undefined> {
  const doc = await getDb().collection(COLLECTION).doc(templateId).get();
  return doc.exists ? (doc.data() as ReviewTemplate) : undefined;
}

export async function getTemplateTitle(templateId: string): Promise<string> {
  const template = await getReviewTemplateById(templateId);
  return template?.title ?? "Unassigned";
}

export async function saveReviewTemplate(template: ReviewTemplate): Promise<void> {
  await getDb().collection(COLLECTION).doc(template.templateId).set(template);
}

export async function deleteReviewTemplate(templateId: string): Promise<void> {
  await getDb().collection(COLLECTION).doc(templateId).delete();
}
