import type { QuestionType, Respondent, WorkflowType } from "@/types/template";

export type WorkflowPreset = {
  value: WorkflowType;
  label: string;
  description: string;
  hasManagerStage: boolean;
  hasFinalStep: "management" | "auto";
  allowedRespondents: Respondent[];
  excludedQuestionTypes: QuestionType[];
};

export const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    value: "full",
    label: "Full Performance Review",
    description: "Employee → Manager → Top Management. Formal outcome set at the end.",
    hasManagerStage: true,
    hasFinalStep: "management",
    allowedRespondents: ["employee", "manager"],
    excludedQuestionTypes: [],
  },
  {
    value: "employee_manager",
    label: "Employee + Manager Evaluation",
    description: "Employee → Manager. Completes automatically once the manager submits.",
    hasManagerStage: true,
    hasFinalStep: "auto",
    allowedRespondents: ["employee", "manager"],
    excludedQuestionTypes: [],
  },
  {
    value: "employee_only",
    label: "Employee-only Evaluation / Survey",
    description: "Employee only. Completes automatically once the employee submits.",
    hasManagerStage: false,
    hasFinalStep: "auto",
    allowedRespondents: ["employee"],
    excludedQuestionTypes: ["okr_list", "core_value_list"],
  },
];

export function getWorkflowPreset(type: WorkflowType): WorkflowPreset {
  return WORKFLOW_PRESETS.find((preset) => preset.value === type) ?? WORKFLOW_PRESETS[0];
}
