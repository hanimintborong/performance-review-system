"use client";

import { Flex, Text } from "@chakra-ui/react";

import { employeeReviewColumns } from "@/app/(system)/employee/reviews/columns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import type { ReviewRow } from "@/data/queries";

type ReviewsTableProps = {
  rows: ReviewRow[];
  latestScore: number | null;
  title?: string;
  description?: string;
};

export function ReviewsTable({ rows, latestScore, title = "My reviews", description }: ReviewsTableProps) {
  const subtitle = description ?? (rows.length === 0
    ? "No reviews yet"
    : `${rows.length} review${rows.length === 1 ? "" : "s"} on record${latestScore !== null ? ` · latest score ${latestScore.toFixed(1)} / 5` : ""}`);

  return (
    <AppCard>
      <Flex direction="column" gap="2px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Text fontSize="15px" fontWeight="700" color="grey.80">{title}</Text>
        <Text fontSize="12px" color="grey.60">{subtitle}</Text>
      </Flex>

      <DataTable columns={employeeReviewColumns} rows={rows} rowKey={(r) => r.assignmentId} emptyMessage="No reviews yet." />
    </AppCard>
  );
}
