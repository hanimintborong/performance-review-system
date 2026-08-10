import type { ReviewStatus } from "@/types/review";

export const READY_TO_FINALISE_STATUSES: ReviewStatus[] = ["Manager Submitted"];

export const IN_PROGRESS_STATUSES: ReviewStatus[] = [
  "Not Started",
  "Self-Assessment",
  "Employee Submitted",
  "Manager Reviewing",
  "Overdue",
];
