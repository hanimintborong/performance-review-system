import { grey, info, success, warning } from "@/constants/colors";
import type { ReviewRow } from "@/data/queries";
import type { ReviewStatus } from "@/types/review";

export const STATUS_PROGRESS: Record<ReviewStatus, number> = {
  "Not Started": 0,
  "Self-Assessment": 25,
  "Employee Submitted": 45,
  "Manager Reviewing": 65,
  "Manager Submitted": 85,
  Finalised: 100,
};

export type StatusBucket = "notStarted" | "inProgress" | "readyToFinalise" | "completed";

export const BUCKET_STATUSES: Record<StatusBucket, ReviewStatus[]> = {
  notStarted: ["Not Started"],
  inProgress: ["Self-Assessment", "Employee Submitted", "Manager Reviewing"],
  readyToFinalise: ["Manager Submitted"],
  completed: ["Finalised"],
};

export const STATUS_BUCKET_META: Record<StatusBucket, { label: string; color: string }> = {
  notStarted: { label: "Not started", color: grey[30] },
  inProgress: { label: "In progress", color: warning[50] },
  readyToFinalise: { label: "Ready to finalise", color: info[50] },
  completed: { label: "Completed", color: success[50] },
};

export function bucketCounts(rows: ReviewRow[]): Record<StatusBucket, number> {
  const counts: Record<StatusBucket, number> = { notStarted: 0, inProgress: 0, readyToFinalise: 0, completed: 0 };

  rows.forEach((row) => {
    (Object.keys(BUCKET_STATUSES) as StatusBucket[]).forEach((bucket) => {
      if (BUCKET_STATUSES[bucket].includes(row.status)) counts[bucket] += 1;
    });
  });

  return counts;
}
