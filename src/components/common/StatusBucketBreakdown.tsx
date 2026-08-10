import { StatusBreakdownCard } from "@/components/common/StatusBreakdownCard";
import type { DonutSegment } from "@/components/common/StatusDonut";
import { STATUS_BUCKET_META, type StatusBucket } from "@/lib/teamProgressStats";

type StatusBucketBreakdownProps = {
  counts: Record<StatusBucket, number>;
  total: number;
  title?: string;
};

export function StatusBucketBreakdown({ counts, total, title }: StatusBucketBreakdownProps) {
  const segments: DonutSegment[] = (Object.keys(STATUS_BUCKET_META) as StatusBucket[]).map((bucket) => ({
    label: STATUS_BUCKET_META[bucket].label,
    value: counts[bucket],
    color: STATUS_BUCKET_META[bucket].color,
  }));

  return <StatusBreakdownCard segments={segments} total={total} title={title} />;
}
