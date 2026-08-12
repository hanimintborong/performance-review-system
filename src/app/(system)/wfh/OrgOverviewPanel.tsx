"use client";

import { useMemo, useState } from "react";
import { Flex, Input, NativeSelect, Text } from "@chakra-ui/react";

import { getOrgOverviewColumns } from "@/app/(system)/wfh/orgOverviewColumns";
import { WfhRequestDetailDialog } from "@/app/(system)/wfh/WfhRequestDetailDialog";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { SearchInput } from "@/components/common/SearchInput";
import { DEPARTMENTS } from "@/constants/departments";
import type { WfhRequestRow } from "@/data/queries";
import type { WfhStatus } from "@/types/wfh";

const ALL = "All";
const STATUS_FILTERS: WfhStatus[] = ["Approved", "Rejected", "Cancelled"];
const DEPARTMENT_OPTIONS = [ALL, ...DEPARTMENTS];

export function OrgOverviewPanel({ requests }: { requests: WfhRequestRow[] }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(ALL);
  const [date, setDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewingRow, setViewingRow] = useState<WfhRequestRow | null>(null);

  const statusOptions: FilterOption[] = useMemo(() => {
    const counts = new Map<string, number>();
    requests.forEach((r) => counts.set(r.status, (counts.get(r.status) ?? 0) + 1));
    return [
      { key: "all", label: `All (${requests.length})` },
      ...STATUS_FILTERS.map((status) => ({ key: status, label: `${status} (${counts.get(status) ?? 0})` })),
    ];
  }, [requests]);

  const rows = requests.filter((r) => (
    (department === ALL || r.employee.department === department) &&
    (statusFilter === "all" || r.status === statusFilter) &&
    (!date || r.date === date) &&
    r.employee.name.toLowerCase().includes(search.toLowerCase())
  ));

  return (
    <AppCard>
      <Flex direction="column" gap="12px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Text fontSize="15px" fontWeight="700" color="grey.80">Organisation WFH overview</Text>
        <Flex align="center" justify="space-between" gap="12px" flexWrap="wrap">
          <FilterBar options={statusOptions} activeKey={statusFilter} onChange={setStatusFilter} />
          <Flex gap="8px" align="center" flexWrap="wrap" justify="flex-end">
            <NativeSelect.Root size="sm" w="170px">
              <NativeSelect.Field value={department} onChange={(e) => setDepartment(e.target.value)} pl="12px" pr="30px">
                {DEPARTMENT_OPTIONS.map((d) => <option key={d} value={d}>{d === ALL ? "Department: All" : d}</option>)}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Input type="date" size="sm" px="12px" w="150px" value={date} onChange={(e) => setDate(e.target.value)} />
            <SearchInput placeholder="Search employee…" value={search} onValueChange={setSearch} w="200px" h="34px" />
          </Flex>
        </Flex>
      </Flex>

      <DataTable columns={getOrgOverviewColumns({ onView: setViewingRow })} rows={rows} rowKey={(r) => r.requestId} emptyMessage="No WFH requests match this filter." />

      <WfhRequestDetailDialog row={viewingRow} onClose={() => setViewingRow(null)} />
    </AppCard>
  );
}
