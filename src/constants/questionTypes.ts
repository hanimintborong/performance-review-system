import type { QuestionType } from "@/types/template";

export type QuestionTypeMeta = {
  value: QuestionType;
  label: string;
  hasOptions: boolean;
  hasRatingScale: boolean;
  hasWeightage: boolean;
};

export const QUESTION_TYPES: QuestionTypeMeta[] = [
  { value: "short_text", label: "Short text", hasOptions: false, hasRatingScale: false, hasWeightage: false },
  { value: "long_text", label: "Long text", hasOptions: false, hasRatingScale: false, hasWeightage: false },
  { value: "rating_scale", label: "Rating scale", hasOptions: false, hasRatingScale: true, hasWeightage: false },
  { value: "number", label: "Number", hasOptions: false, hasRatingScale: false, hasWeightage: false },
  { value: "percentage", label: "Percentage", hasOptions: false, hasRatingScale: false, hasWeightage: false },
  { value: "dropdown", label: "Dropdown", hasOptions: true, hasRatingScale: false, hasWeightage: false },
  { value: "file_upload", label: "File upload", hasOptions: false, hasRatingScale: false, hasWeightage: false },
  { value: "kpi_okr", label: "KPI / OKR row", hasOptions: false, hasRatingScale: false, hasWeightage: true },
  { value: "okr_list", label: "KPI / OKR list (employee adds own objectives)", hasOptions: false, hasRatingScale: false, hasWeightage: false },
  { value: "core_value_rating", label: "Core value rating", hasOptions: false, hasRatingScale: true, hasWeightage: false },
  { value: "core_value_list", label: "Core value list (HR defines values)", hasOptions: true, hasRatingScale: true, hasWeightage: false },
];

// "core_value_rating" behaves identically to "rating_scale" everywhere (rendering + scoring) — retired from
// new-question selection to avoid the duplicate choice, but kept in QUESTION_TYPES so existing questions
// of this type still resolve correctly in the builder.
export const SELECTABLE_QUESTION_TYPES: QuestionTypeMeta[] = QUESTION_TYPES.filter((t) => t.value !== "core_value_rating");

export function getQuestionTypeMeta(type: QuestionType): QuestionTypeMeta {
  return QUESTION_TYPES.find((meta) => meta.value === type) ?? QUESTION_TYPES[0];
}
