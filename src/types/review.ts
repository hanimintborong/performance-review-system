export type ReviewStatus =
  | "Not Started"
  | "Self-Assessment"
  | "Employee Submitted"
  | "Manager Reviewing"
  | "Manager Submitted"
  | "P&C Review"
  | "Management Review"
  | "Finalised"
  | "Overdue";

export type ReviewPlanStatus = "Draft" | "Active" | "Inactive" | "Archived";

export type ReviewTemplateStatus = "Active" | "Inactive";

export type ReviewPlan = {
  planId: string;
  title: string;
  description: string;
  templateId: string;
  reviewPeriod: string;
  employeeDeadline: string;
  managerDeadline: string;
  hrReviewDeadline: string;
  managementReviewPeriod: string;
  departments: string[];
  participantCount: number;
  status: ReviewPlanStatus;
};

export type FinalOutcome = "Promoted" | "Increment" | "Maintained" | "Performance Improvement Plan";

export type ReviewAssignment = {
  assignmentId: string;
  planId: string;
  employeeId: string;
  managerId: string;
  status: ReviewStatus;
  employeeScore: number | null;
  managerScore: number | null;
  deadline: string;
  acknowledged: boolean;
  finalOutcome: FinalOutcome | null;
  finalOutcomeNotes: string | null;
  finalizedAt: string | null;
};
