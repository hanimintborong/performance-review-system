import "server-only";

import { cache } from "react";
import { eq } from "drizzle-orm";

import { reviewTemplates as reviewTemplatesTable } from "@/db/schema";
import { db } from "@/lib/db";
import type { ReviewTemplate } from "@/types/template";

export const getReviewTemplates = cache(async (): Promise<ReviewTemplate[]> => {
  return db.select().from(reviewTemplatesTable);
});

export const getReviewTemplateById = cache(async (templateId: string): Promise<ReviewTemplate | undefined> => {
  const [record] = await db
    .select()
    .from(reviewTemplatesTable)
    .where(eq(reviewTemplatesTable.templateId, templateId))
    .limit(1);
  return record ?? undefined;
});

export const getTemplateTitle = cache(async (templateId: string): Promise<string> => {
  const template = await getReviewTemplateById(templateId);
  return template?.title ?? "Unassigned";
});

export async function saveReviewTemplate(template: ReviewTemplate): Promise<void> {
  await db.insert(reviewTemplatesTable).values(template).onConflictDoUpdate({
    target: reviewTemplatesTable.templateId,
    set: template,
  });
}

export async function deleteReviewTemplate(templateId: string): Promise<void> {
  await db.delete(reviewTemplatesTable).where(eq(reviewTemplatesTable.templateId, templateId));
}
