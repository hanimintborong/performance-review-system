"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Flex, Icon, NativeSelect, Text } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";

import { reviewColumns } from "@/app/(system)/reviews/columns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { SearchInput } from "@/components/common/SearchInput";
import type { ReviewRow } from "@/data/queries";
import { matchesQuickFilter, readQuickFilter } from "@/lib/reviewQuickFilter";
import type { ReviewPlan } from "@/types/review";

const ALL = "All";

export function ReviewsClient({ allRows, plans }: { allRows: ReviewRow[]; plans: ReviewPlan[] }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [planId, setPlanId] = useState(() => searchParams.get("planId") ?? ALL);
  const [department, setDepartment] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState("all");
  const [quickFilter, setQuickFilter] = useState(() => readQuickFilter(searchParams));

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
      const matchesGroup = matchesQuickFilter(row, quickFilter);
      const matchesSearch = row.employee.name.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesGroup && matchesSearch;
    })
    .sort((a, b) => a.employee.name.localeCompare(b.employee.name));

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

        {quickFilter && (
          <Flex align="center" gap="6px" bg="brand.10" color="brand.70" fontSize="12px" fontWeight="600" px="10px" h="34px" borderRadius="full">
            {quickFilter.label}
            <Icon as={FiX} boxSize="12px" cursor="pointer" onClick={() => setQuickFilter(null)} />
          </Flex>
        )}
      </Flex>

      <AppCard>
        <Flex direction="column" gap="2px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
          <Text fontSize="15px" fontWeight="700" color="grey.80">Reviews</Text>
          <Text fontSize="12px" color="grey.60">{tableRows.length} of {scopedRows.length} reviews</Text>
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
