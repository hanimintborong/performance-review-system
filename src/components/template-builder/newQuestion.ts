import type { TemplateQuestion } from "@/types/template";

export function newQuestion(sectionId: string): TemplateQuestion {
  return {
    questionId: `${sectionId}-Q-${crypto.randomUUID()}`,
    type: "short_text",
    text: "",
    required: false,
    respondent: "employee",
  };
}
