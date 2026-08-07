import type { ReviewStatus } from "@/types/review";

export const READY_TO_FINALISE_STATUSES: ReviewStatus[] = [
  "Manager Submitted",
  "Awaiting Discussion",
  "Awaiting HR Review",
  "Awaiting Management Review",
];

export const IN_PROGRESS_STATUSES: ReviewStatus[] = [
  "Not Started",
  "Self-Assessment In Progress",
  "Employee Submitted",
  "Manager Reviewing",
  "Overdue",
];
