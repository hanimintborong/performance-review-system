import { error, grey, info, success, warning } from "@/constants/colors";
import type { ReviewRow } from "@/data/queries";
import type { ReviewStatus } from "@/types/review";

export const STATUS_PROGRESS: Record<ReviewStatus, number> = {
  "Not Started": 0,
  "Self-Assessment": 20,
  "Employee Submitted": 40,
  "Manager Reviewing": 55,
  "Manager Submitted": 70,
  "P&C Review": 85,
  "Management Review": 95,
  Finalised: 100,
  Overdue: 10,
};

export type StatusBucket = "notStarted" | "inProgress" | "pendingReview" | "overdue" | "completed";

export const BUCKET_STATUSES: Record<StatusBucket, ReviewStatus[]> = {
  notStarted: ["Not Started"],
  inProgress: ["Self-Assessment", "Employee Submitted", "Manager Reviewing", "Manager Submitted"],
  pendingReview: ["P&C Review", "Management Review"],
  overdue: ["Overdue"],
  completed: ["Finalised"],
};

export const STATUS_BUCKET_META: Record<StatusBucket, { label: string; color: string }> = {
  notStarted: { label: "Not started", color: grey[30] },
  inProgress: { label: "In progress", color: warning[50] },
  pendingReview: { label: "Pending HR/Management review", color: info[50] },
  overdue: { label: "Overdue", color: error[50] },
  completed: { label: "Completed", color: success[50] },
};

export function bucketCounts(rows: ReviewRow[]): Record<StatusBucket, number> {
  const counts: Record<StatusBucket, number> = { notStarted: 0, inProgress: 0, pendingReview: 0, overdue: 0, completed: 0 };

  rows.forEach((row) => {
    (Object.keys(BUCKET_STATUSES) as StatusBucket[]).forEach((bucket) => {
      if (BUCKET_STATUSES[bucket].includes(row.status)) counts[bucket] += 1;
    });
  });

  return counts;
}
