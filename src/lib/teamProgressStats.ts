import type { ReviewRow } from "@/data/queries";
import type { ReviewStatus } from "@/types/review";

export const STATUS_PROGRESS: Record<ReviewStatus, number> = {
  "Not Started": 0,
  "Self-Assessment In Progress": 25,
  "Employee Submitted": 45,
  "Manager Reviewing": 60,
  "Manager Submitted": 80,
  "Awaiting Discussion": 88,
  "Awaiting HR Review": 92,
  "Awaiting Management Review": 96,
  Finalised: 100,
  Overdue: 10,
};

export type StatusBucket = "notStarted" | "inProgress" | "awaitingDiscussion" | "overdue" | "completed";

const BUCKET_STATUSES: Record<StatusBucket, ReviewStatus[]> = {
  notStarted: ["Not Started"],
  inProgress: ["Self-Assessment In Progress", "Employee Submitted", "Manager Reviewing", "Manager Submitted"],
  awaitingDiscussion: ["Awaiting Discussion", "Awaiting HR Review", "Awaiting Management Review"],
  overdue: ["Overdue"],
  completed: ["Finalised"],
};

export function bucketCounts(rows: ReviewRow[]): Record<StatusBucket, number> {
  const counts: Record<StatusBucket, number> = { notStarted: 0, inProgress: 0, awaitingDiscussion: 0, overdue: 0, completed: 0 };

  rows.forEach((row) => {
    (Object.keys(BUCKET_STATUSES) as StatusBucket[]).forEach((bucket) => {
      if (BUCKET_STATUSES[bucket].includes(row.status)) counts[bucket] += 1;
    });
  });

  return counts;
}
