import { parseOkrList, totalWeightage } from "@/lib/okrList";
import type { TemplateSection } from "@/types/template";

export type WeightageIssue = { questionText: string; used: number; target: number };

export function totalSectionWeightage(sections: TemplateSection[]): number {
  return sections.reduce((sum, s) => sum + (s.weightage ?? 0), 0);
}

export function findOkrWeightageIssues(sections: TemplateSection[], answers: Record<string, string>): WeightageIssue[] {
  const issues: WeightageIssue[] = [];

  sections.forEach((section) => {
    section.questions.forEach((question) => {
      if (question.type !== "okr_list") return;

      const target = section.weightage ?? 100;
      const used = totalWeightage(parseOkrList(answers[question.questionId]));
      if (used !== target) issues.push({ questionText: question.text, used, target });
    });
  });

  return issues;
}
