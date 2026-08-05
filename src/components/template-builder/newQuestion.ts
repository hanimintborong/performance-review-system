import type { TemplateQuestion } from "@/types/template";

export function newQuestion(sectionId: string, existingCount = 0): TemplateQuestion {
  return {
    questionId: `${sectionId}-Q${existingCount + 1}-${existingCount}`,
    type: "short_text",
    text: "",
    required: false,
    respondent: "employee",
  };
}
