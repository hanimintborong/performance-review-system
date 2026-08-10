"use client";

import { useMemo, useState } from "react";
import { Flex, Grid, Icon, NativeSelect, Text } from "@chakra-ui/react";
import { FiAlertTriangle, FiBell, FiCheckCircle, FiClock } from "react-icons/fi";

import { reviewColumns } from "@/app/(system)/reviews/columns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { SearchInput } from "@/components/common/SearchInput";
import { StatCard } from "@/components/common/StatCard";
import type { ReviewRow } from "@/data/queries";
import type { ReviewPlan } from "@/types/review";

const ALL = "All";

export function ReviewsClient({ allRows, plans }: { allRows: ReviewRow[]; plans: ReviewPlan[] }) {
  const [search, setSearch] = useState("");
  const [planId, setPlanId] = useState(ALL);
  const [department, setDepartment] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState("all");

  const departments = useMemo(() => [ALL, ...new Set(allRows.map((r) => r.employee.department))], [allRows]);

  const scopedRows = allRows.filter(
    (row) => (planId === ALL || row.planId === planId) && (department === ALL || row.employee.department === department),
  );

  const statusCounts = useMemo(() => {
    const counts = new Map<string, number>();
    scopedRows.forEach((row) => counts.set(row.status, (counts.get(row.status) ?? 0) + 1));
    return counts;
  }, [scopedRows]);

  const tableRows = scopedRows
    .filter((row) => {
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      const matchesSearch = row.employee.name.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => (a.deadline < b.deadline ? 1 : a.deadline > b.deadline ? -1 : 0));

  const completed = scopedRows.filter((r) => r.status === "Finalised").length;
  const overdue = scopedRows.filter((r) => r.status === "Overdue").length;
  const pending = scopedRows.length - completed - overdue;
  const awaitingAck = scopedRows.filter((r) => r.status === "Finalised" && !r.acknowledged).length;

  return (
    <Flex direction="column" gap="14px">
      <Flex gap="10px" flexWrap="wrap" align="center">
        <SearchInput placeholder="Search staff…" value={search} onValueChange={setSearch} w="200px" h="36px" />

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
        <FilterSelect
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "all", label: `Status: All (${scopedRows.length})` },
            ...Array.from(statusCounts.entries()).map(([status, count]) => ({ value: status, label: `${status} (${count})` })),
          ]}
        />
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap="12px">
        <StatCard
          label="Completed"
          value={completed}
          valueColor="success.70"
          accentColor="success.50"
          icon={<Icon as={FiCheckCircle} color="success.70" boxSize="15px" />}
        />
        <StatCard
          label="Pending"
          value={pending}
          valueColor="warning.70"
          accentColor="warning.50"
          icon={<Icon as={FiClock} color="warning.70" boxSize="15px" />}
        />
        <StatCard
          label="Overdue"
          value={overdue}
          valueColor="error.70"
          accentColor="error.50"
          icon={<Icon as={FiAlertTriangle} color="error.70" boxSize="15px" />}
        />
        <StatCard
          label="Awaiting acknowledgement"
          value={awaitingAck}
          valueColor="grey.80"
          accentColor="grey.40"
          icon={<Icon as={FiBell} color="grey.70" boxSize="15px" />}
        />
      </Grid>

      <AppCard>
        <Flex direction="column" gap="2px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
          <Text fontSize="15px" fontWeight="700" color="grey.80">Reviews</Text>
          <Text fontSize="12px" color="grey.60">{tableRows.length} of {scopedRows.length} reviews · newest deadline first</Text>
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
      <NativeSelect.Field
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fontSize="12px"
        aria-label={label}
        borderRadius="10px"
        borderColor="grey.20"
        pl="14px"
        pr="30px"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}
