"use client";

import { Flex, Text } from "@chakra-ui/react";

import { selfAssessmentColumns } from "@/app/(system)/employee/evaluation/columns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import type { ReviewRow } from "@/data/queries";

export function SelfAssessmentTable({ rows }: { rows: ReviewRow[] }) {
  return (
    <AppCard>
      <Flex direction="column" gap="2px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Text fontSize="15px" fontWeight="700" color="grey.80">My self-assessment</Text>
        <Text fontSize="12px" color="grey.60">
          You have {rows.length} self-assessment{rows.length === 1 ? "" : "s"} to complete — pick one to get started.
        </Text>
      </Flex>

      <DataTable columns={selfAssessmentColumns} rows={rows} rowKey={(r) => r.assignmentId} emptyMessage="No self-assessment pending." />
    </AppCard>
  );
}
