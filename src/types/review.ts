export type ReviewStatus =
  | "Not Started"
  | "Self-Assessment"
  | "Employee Submitted"
  | "Manager Reviewing"
  | "Manager Submitted"
  | "Finalised";

export type ReviewPlanStatus = "Draft" | "Active" | "Closed";

export type ReviewTemplateStatus = "Active" | "Inactive";

export type ReviewPlan = {
  planId: string;
  title: string;
  description: string;
  templateId: string;
  departments: string[];
  participantCount: number;
  status: ReviewPlanStatus;
  createdAt: string;
  activatedAt: string | null;
  closedAt: string | null;
};

export type FinalOutcome = "Promoted" | "Increment" | "Maintained" | "Performance Improvement Plan" | "On Hold" | "Exempted";

export type ReviewAssignment = {
  assignmentId: string;
  planId: string;
  employeeId: string;
  managerId: string;
  status: ReviewStatus;
  employeeScore: number | null;
  managerScore: number | null;
  acknowledged: boolean;
  finalOutcome: FinalOutcome | null;
  finalOutcomeNotes: string | null;
  incrementPercentage: number | null;
  incrementEffectiveDate: string | null;
  finalizedAt: string | null;
};
