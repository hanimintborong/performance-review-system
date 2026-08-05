export type ReviewStatus =
  | "Not Started"
  | "Self-Assessment In Progress"
  | "Employee Submitted"
  | "Manager Reviewing"
  | "Manager Submitted"
  | "Awaiting Discussion"
  | "Awaiting HR Review"
  | "Awaiting Management Review"
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
};
