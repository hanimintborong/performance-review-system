import { TemplateBuilder } from "@/components/template-builder/TemplateBuilder";
import { getReviewTemplates } from "@/data/queries";
import type { ReviewTemplate } from "@/types/template";

export default async function NewReviewTemplatePage() {
  const templates = await getReviewTemplates();
  const templateId = `TPL${String(templates.length + 1).padStart(3, "0")}`;

  const blankTemplate: ReviewTemplate = {
    templateId,
    title: "",
    description: "",
    assignedDepartments: [],
    status: "Inactive",
    workflowType: "full",
    sections: [],
    createdAt: "",
  };

  return <TemplateBuilder initialTemplate={blankTemplate} mode="create" />;
}
