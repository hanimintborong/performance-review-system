"use client";

import { useMemo, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { teamColumns } from "@/app/(system)/manager/team/columns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import type { ReviewRow } from "@/data/queries";

export function TeamClient({ rows, planTitle }: { rows: ReviewRow[]; planTitle: string }) {
  const [filter, setFilter] = useState("all");

  const options: FilterOption[] = useMemo(() => {
    const completed = rows.filter((r) => r.status === "Finalised").length;
    const overdue = rows.filter((r) => r.status === "Overdue").length;
    const pending = rows.length - completed - overdue;

    return [
      { key: "all", label: `All (${rows.length})` },
      { key: "completed", label: `Completed (${completed})` },
      { key: "pending", label: `Pending (${pending})` },
      { key: "overdue", label: `Overdue (${overdue})` },
    ];
  }, [rows]);

  const filtered = rows.filter((r) => {
    if (filter === "completed") return r.status === "Finalised";
    if (filter === "overdue") return r.status === "Overdue";
    if (filter === "pending") return r.status !== "Finalised" && r.status !== "Overdue";
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
