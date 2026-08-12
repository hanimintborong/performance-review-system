import { getWorkflowPreset } from "@/constants/workflowPresets";
import type { ReviewTemplate, WorkflowType } from "@/types/template";

export function countIncompatibleQuestions(template: ReviewTemplate, next: WorkflowType): number {
  const preset = getWorkflowPreset(next);
  let count = 0;

  template.sections.forEach((section) => {
    section.questions.forEach((question) => {
      const excluded = preset.excludedQuestionTypes.includes(question.type);
      const badRespondent = !preset.allowedRespondents.includes(question.respondent);
      if (excluded || badRespondent) count += 1;
    });
  });

  return count;
}

export function applyWorkflowChange(template: ReviewTemplate, next: WorkflowType): ReviewTemplate {
  const preset = getWorkflowPreset(next);

  return {
    ...template,
    workflowType: next,
    sections: template.sections.map((section) => ({
      ...section,
      questions: section.questions
        .filter((question) => !preset.excludedQuestionTypes.includes(question.type))
        .map((question) => (
          preset.allowedRespondents.includes(question.respondent)
            ? question
            : { ...question, respondent: preset.allowedRespondents[0] }
        )),
    })),
  };
}
