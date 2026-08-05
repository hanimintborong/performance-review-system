import { notFound } from "next/navigation";

import { TemplateBuilder } from "@/components/template-builder/TemplateBuilder";
import { getReviewTemplateById } from "@/data/queries";

type EditTemplatePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditReviewTemplatePage({ params }: EditTemplatePageProps) {
  const { id } = await params;
  const template = await getReviewTemplateById(id);

  if (!template) notFound();

  return <TemplateBuilder initialTemplate={template} />;
}
