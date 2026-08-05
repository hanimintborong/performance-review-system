"use server";

import { revalidatePath } from "next/cache";

import { deleteReviewTemplate, getReviewTemplateById, saveReviewTemplate } from "@/data/queries";
import type { ReviewTemplate } from "@/types/template";

export async function saveReviewTemplateAction(template: ReviewTemplate) {
  await saveReviewTemplate(template);
  revalidatePath("/review-templates");
  revalidatePath(`/review-templates/${template.templateId}`);
}

export async function deleteReviewTemplateAction(templateId: string) {
  await deleteReviewTemplate(templateId);
  revalidatePath("/review-templates");
}

export async function toggleTemplateStatusAction(templateId: string): Promise<ReviewTemplate["status"] | null> {
  const template = await getReviewTemplateById(templateId);
  if (!template) return null;

  const nextStatus = template.status === "Active" ? "Inactive" : "Active";
  await saveReviewTemplate({ ...template, status: nextStatus });
  revalidatePath("/review-templates");

  return nextStatus;
}

export async function duplicateTemplateAction(templateId: string): Promise<ReviewTemplate | null> {
  const template = await getReviewTemplateById(templateId);
  if (!template) return null;

  const copy: ReviewTemplate = {
    ...template,
    templateId: `${template.templateId}-COPY-${Math.random().toString(36).slice(2, 7)}`,
    title: `${template.title} (Copy)`,
    status: "Inactive",
  };
  await saveReviewTemplate(copy);
  revalidatePath("/review-templates");

  return copy;
}
