import { IN_PROGRESS_STATUSES, READY_TO_FINALISE_STATUSES } from "@/constants/reviewStatusGroups";
import type { ReviewRow } from "@/data/queries";

export type ManagementBucket = "readyToFinalise" | "inProgress" | "finalised";

export function managementBucketCounts(rows: ReviewRow[]): Record<ManagementBucket, number> {
  return {
    readyToFinalise: rows.filter((r) => READY_TO_FINALISE_STATUSES.includes(r.status)).length,
    inProgress: rows.filter((r) => IN_PROGRESS_STATUSES.includes(r.status)).length,
    finalised: rows.filter((r) => r.status === "Finalised").length,
  };
}
