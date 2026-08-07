"use client";

import { useMemo, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { teamColumns } from "@/app/(system)/manager/team/columns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import type { ReviewRow } from "@/data/queries";

const IN_PROGRESS_STATUSES = ["Not Started", "Self-Assessment In Progress"];

export function TeamClient({ rows, planTitle }: { rows: ReviewRow[]; planTitle: string }) {
  const needsAction = rows.filter((r) => r.status === "Employee Submitted").length;
  const [filter, setFilter] = useState(needsAction > 0 ? "action" : "all");

  const options: FilterOption[] = useMemo(() => {
    const inProgress = rows.filter((r) => IN_PROGRESS_STATUSES.includes(r.status)).length;
    const overdue = rows.filter((r) => r.status === "Overdue").length;
    const completed = rows.filter((r) => r.status === "Finalised").length;

    return [
      { key: "action", label: `Needs your review (${needsAction})` },
      { key: "in_progress", label: `In progress (${inProgress})` },
      { key: "overdue", label: `Overdue (${overdue})` },
      { key: "completed", label: `Completed (${completed})` },
      { key: "all", label: `All (${rows.length})` },
    ];
  }, [rows, needsAction]);

  const filtered = rows.filter((r) => {
    if (filter === "action") return r.status === "Employee Submitted";
    if (filter === "in_progress") return IN_PROGRESS_STATUSES.includes(r.status);
    if (filter === "overdue") return r.status === "Overdue";
    if (filter === "completed") return r.status === "Finalised";
    return true;
  });

  return (
    <AppCard>
      <Flex direction="column" gap="10px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Flex direction="column" gap="2px">
          <Text fontSize="15px" fontWeight="700" color="grey.80">My Team</Text>
          <Text fontSize="12px" color="grey.60">{planTitle}</Text>
        </Flex>
        <FilterBar options={options} activeKey={filter} onChange={setFilter} />
      </Flex>

      <DataTable columns={teamColumns} rows={filtered} rowKey={(r) => r.assignmentId} emptyMessage="No team members in this view." />
    </AppCard>
  );
}
