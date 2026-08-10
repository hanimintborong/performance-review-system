import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewRow } from "@/data/queries";
import { BUCKET_STATUSES, STATUS_BUCKET_META, type StatusBucket } from "@/lib/teamProgressStats";
import type { ReviewStatus } from "@/types/review";

export type QuickFilter =
  | { kind: "statuses"; statuses: ReviewStatus[]; label: string }
  | { kind: "needsAck"; label: string };

export function readQuickFilter(searchParams: URLSearchParams): QuickFilter | null {
  const group = searchParams.get("statusGroup");
  if (group && group in BUCKET_STATUSES) {
    const bucket = group as StatusBucket;
    return { kind: "statuses", statuses: BUCKET_STATUSES[bucket], label: STATUS_BUCKET_META[bucket].label };
  }

  const raw = searchParams.get("status");
  if (raw) {
    const statuses = raw.split(",").filter((s): s is ReviewStatus => s in REVIEW_STATUS_STYLE);
    if (statuses.length > 0) return { kind: "statuses", statuses, label: statuses.join(", ") };
  }

  if (searchParams.get("needsAck") === "1") {
    return { kind: "needsAck", label: "Awaiting acknowledgement" };
  }

  return null;
}

export function matchesQuickFilter(row: ReviewRow, filter: QuickFilter | null): boolean {
  if (!filter) return true;
  if (filter.kind === "needsAck") return row.status === "Finalised" && !row.acknowledged;
  return filter.statuses.includes(row.status);
}
