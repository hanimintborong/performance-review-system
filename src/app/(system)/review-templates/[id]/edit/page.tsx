import { notFound } from "next/navigation";

import { TemplateBuilder } from "@/components/template-builder/TemplateBuilder";
import { getReviewPlans, getReviewTemplateById } from "@/data/queries";

type EditTemplatePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditReviewTemplatePage({ params }: EditTemplatePageProps) {
  const { id } = await params;
  const [template, plans] = await Promise.all([getReviewTemplateById(id), getReviewPlans()]);

  if (!template) notFound();

  const workflowLocked = plans.some((plan) => plan.templateId === id);

  return <TemplateBuilder initialTemplate={template} mode="edit" workflowLocked={workflowLocked} />;
}
