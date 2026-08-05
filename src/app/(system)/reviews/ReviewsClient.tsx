"use client";

import { useMemo, useState } from "react";
import { Flex, Grid, NativeSelect, Text } from "@chakra-ui/react";

import { reviewColumns } from "@/app/(system)/reviews/columns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { ReviewStatusPipeline, type PipelineStage } from "@/components/common/ReviewStatusPipeline";
import { SearchInput } from "@/components/common/SearchInput";
import { StatCard } from "@/components/common/StatCard";
import type { ReviewRow } from "@/data/queries";
import type { ReviewPlan, ReviewStatus } from "@/types/review";

const ALL = "All";
const PIPELINE_GROUPS: { label: string; statuses: ReviewStatus[] }[] = [
  { label: "Not started", statuses: ["Not Started"] },
  { label: "Self-assessment", statuses: ["Self-Assessment In Progress", "Employee Submitted"] },
  { label: "Manager review", statuses: ["Manager Reviewing", "Manager Submitted"] },
  { label: "Discussion & sign-off", statuses: ["Awaiting Discussion", "Awaiting HR Review", "Awaiting Management Review"] },
  { label: "Finalised", statuses: ["Finalised"] },
];

export function ReviewsClient({ allRows, plans }: { allRows: ReviewRow[]; plans: ReviewPlan[] }) {
  const [search, setSearch] = useState("");
  const [planId, setPlanId] = useState(ALL);
  const [department, setDepartment] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState("all");

  const departments = useMemo(() => [ALL, ...new Set(allRows.map((r) => r.employee.department))], [allRows]);

  const scopedRows = allRows.filter(
    (row) => (planId === ALL || row.planId === planId) && (department === ALL || row.employee.department === department),
  );

  const statusOptions: FilterOption[] = useMemo(() => {
    const counts = new Map<string, number>();
    scopedRows.forEach((row) => counts.set(row.status, (counts.get(row.status) ?? 0) + 1));

    return [
      { key: "all", label: `All (${scopedRows.length})` },
      ...Array.from(counts.entries()).map(([status, count]) => ({ key: status, label: `${status} (${count})` })),
    ];
  }, [scopedRows]);

  const tableRows = scopedRows.filter((row) => {
    const matchesStatus = statusFilter === "all" || row.status === statusFilter;
    const matchesSearch = row.employee.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const completed = scopedRows.filter((r) => r.status === "Finalised").length;
  const overdue = scopedRows.filter((r) => r.status === "Overdue").length;
  const pending = scopedRows.length - completed - overdue;
  const awaitingAck = scopedRows.filter((r) => r.status === "Finalised" && !r.acknowledged).length;

  const stages: PipelineStage[] = PIPELINE_GROUPS.map((group) => ({
    label: group.label,
    count: scopedRows.filter((r) => group.statuses.includes(r.status)).length,
  }));

  return (
    <Flex direction="column" gap="14px">
      <Flex gap="10px" flexWrap="wrap" align="center">
        <SearchInput placeholder="Search staff…" value={search} onValueChange={setSearch} w="200px" h="34px" />

        <FilterSelect
          label="Review plan"
          value={planId}
          onChange={setPlanId}
          options={[{ value: ALL, label: "Review plan: All" }, ...plans.map((p) => ({ value: p.planId, label: p.title }))]}
        />
        <FilterSelect
          label="Department"
          value={department}
          onChange={setDepartment}
          options={departments.map((d) => ({ value: d, label: d === ALL ? "Department: All" : d }))}
        />
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap="12px">
        <StatCard label="Completed" value={completed} valueColor="success.70" />
        <StatCard label="Pending" value={pending} valueColor="warning.70" />
        <StatCard label="Overdue" value={overdue} valueColor="error.70" />
        <StatCard label="Awaiting acknowledgement" value={awaitingAck} valueColor="grey.80" />
      </Grid>

      <AppCard p="16px 20px">
        <Text fontSize="13px" fontWeight="700" color="grey.80" mb="6px">Review status pipeline</Text>
        <ReviewStatusPipeline stages={stages} />
      </AppCard>

      <AppCard>
        <Flex direction="column" gap="10px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
          <Text fontSize="15px" fontWeight="700" color="grey.80">Reviews</Text>
          <FilterBar options={statusOptions} activeKey={statusFilter} onChange={setStatusFilter} />
        </Flex>

        <DataTable
          columns={reviewColumns}
          rows={tableRows}
          rowKey={(row) => row.assignmentId}
          emptyMessage="No reviews match your filters."
        />
      </AppCard>
    </Flex>
  );
}

type SelectOption = { value: string; label: string };

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: SelectOption[] }) {
  return (
    <NativeSelect.Root w="200px" size="sm">
      <NativeSelect.Field value={value} onChange={(e) => onChange(e.target.value)} fontSize="12px" aria-label={label}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}
