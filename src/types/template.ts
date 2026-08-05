import type { ReviewTemplateStatus } from "@/types/review";

export type QuestionType =
  | "short_text"
  | "long_text"
  | "rating_scale"
  | "number"
  | "percentage"
  | "dropdown"
  | "file_upload"
  | "kpi_okr"
  | "core_value_rating";

export type Respondent = "employee" | "manager";

export type TemplateQuestion = {
  questionId: string;
  type: QuestionType;
  text: string;
  required: boolean;
  respondent: Respondent;
  weightage?: number;
  ratingScaleMax?: number;
  options?: string[];
};

export type TemplateSection = {
  sectionId: string;
  title: string;
  description?: string;
  questions: TemplateQuestion[];
};

export type ReviewTemplate = {
  templateId: string;
  title: string;
  description: string;
  assignedDepartments: string[];
  status: ReviewTemplateStatus;
  sections: TemplateSection[];
};

export function countSections(template: ReviewTemplate): number {
  return template.sections.length;
}

export function countQuestions(template: ReviewTemplate): number {
  return template.sections.reduce((total, section) => total + section.questions.length, 0);
}
