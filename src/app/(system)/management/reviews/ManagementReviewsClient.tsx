"use client";

import { useMemo, useState } from "react";
import { Flex, NativeSelect } from "@chakra-ui/react";

import { managementReviewColumns } from "@/app/(system)/management/reviews/columns";
import { DepartmentSummary } from "@/app/(system)/management/reviews/DepartmentSummary";
import { ManagementOverview } from "@/app/(system)/management/reviews/ManagementOverview";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { SearchInput } from "@/components/common/SearchInput";
import { IN_PROGRESS_STATUSES, READY_TO_FINALISE_STATUSES } from "@/constants/reviewStatusGroups";
import type { ReviewRow } from "@/data/queries";
import type { ReviewPlan } from "@/types/review";

const ALL = "All plans";

export function ManagementReviewsClient({ allRows, plans }: { allRows: ReviewRow[]; plans: ReviewPlan[] }) {
  const [planId, setPlanId] = useState(ALL);
  const [search, setSearch] = useState("");
  const planRows = allRows.filter((r) => planId === ALL || r.planId === planId);

  const readyToFinalise = planRows.filter((r) => READY_TO_FINALISE_STATUSES.includes(r.status)).length;
  const [statusFilter, setStatusFilter] = useState(readyToFinalise > 0 ? "ready" : "all");

  const statusOptions: FilterOption[] = useMemo(() => {
    const inProgress = planRows.filter((r) => IN_PROGRESS_STATUSES.includes(r.status)).length;
    const finalisedCount = planRows.filter((r) => r.status === "Finalised").length;

    return [
      { key: "ready", label: `Ready to finalise (${readyToFinalise})` },
      { key: "in_progress", label: `In progress (${inProgress})` },
      { key: "finalised", label: `Finalised (${finalisedCount})` },
      { key: "all", label: `All (${planRows.length})` },
    ];
  }, [planRows, readyToFinalise]);

  const rows = planRows.filter((r) => {
    const matchesStatus = statusFilter === "ready" ? READY_TO_FINALISE_STATUSES.includes(r.status)
      : statusFilter === "in_progress" ? IN_PROGRESS_STATUSES.includes(r.status)
      : statusFilter === "finalised" ? r.status === "Finalised"
      : true;
    const matchesSearch = r.employee.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Flex direction="column" gap="14px">
      <Flex justify="flex-end">
        <NativeSelect.Root w="220px" size="sm">
          <NativeSelect.Field value={planId} onChange={(e) => setPlanId(e.target.value)} fontSize="12px" pl="12px" pr="30px">
            <option value={ALL}>{ALL}</option>
            {plans.map((p) => <option key={p.planId} value={p.planId}>{p.title}</option>)}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>

      <ManagementOverview rows={planRows} />

      <DepartmentSummary rows={planRows} />

      <AppCard>
        <Flex p="14px 20px" borderBottomWidth="1px" borderColor="grey.20" justify="space-between" gap="10px" flexWrap="wrap">
          <FilterBar options={statusOptions} activeKey={statusFilter} onChange={setStatusFilter} />
          <SearchInput placeholder="Search employee…" value={search} onValueChange={setSearch} w="220px" h="34px" />
        </Flex>
        <DataTable columns={managementReviewColumns} rows={rows} rowKey={(r) => r.assignmentId} emptyMessage="No reviews match this filter." />
      </AppCard>
    </Flex>
  );
}
