import type { TemplateSection } from "@/types/template";

export function newSection(templateId: string): TemplateSection {
  return {
    sectionId: `${templateId}-S-${crypto.randomUUID()}`,
    title: "",
    description: "",
    questions: [],
  };
}
