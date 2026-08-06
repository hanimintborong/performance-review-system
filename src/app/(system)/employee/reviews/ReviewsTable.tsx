"use client";

import { employeeReviewColumns } from "@/app/(system)/employee/reviews/columns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import type { ReviewRow } from "@/data/queries";

export function ReviewsTable({ rows }: { rows: ReviewRow[] }) {
  return (
    <AppCard>
      <DataTable columns={employeeReviewColumns} rows={rows} rowKey={(r) => r.assignmentId} emptyMessage="No reviews yet." />
    </AppCard>
  );
}
