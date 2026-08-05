import type { TemplateSection } from "@/types/template";

export function newSection(templateId: string, existingCount = 0): TemplateSection {
  const sectionId = `${templateId}-S${existingCount + 1}`;

  return {
    sectionId,
    title: "",
    description: "",
    questions: [],
  };
}
