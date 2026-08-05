"use client";

import { useMemo, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { AddEmployeeDialog } from "@/app/(system)/employees/AddEmployeeDialog";
import { employeeColumns } from "@/app/(system)/employees/employeeColumns";
import { ImportEmployeesDialog } from "@/app/(system)/employees/ImportEmployeesDialog";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { SearchInput } from "@/components/common/SearchInput";
import type { Employee } from "@/types/employee";

const ALL = "All departments";

export function EmployeesClient({ employees }: { employees: Employee[] }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(ALL);

  const departmentOptions: FilterOption[] = useMemo(() => {
    const depts = [ALL, ...new Set(employees.map((e) => e.department))];
    return depts.map((d) => ({ key: d, label: d }));
  }, [employees]);

  const rows = employees.filter(
    (e) =>
      (department === ALL || e.department === department) &&
      e.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AppCard>
      <Flex direction="column" gap="10px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Flex align="center" justify="space-between" gap="12px" flexWrap="wrap">
          <Text fontSize="15px" fontWeight="700" color="grey.80">Employees ({employees.length})</Text>
          <Flex gap="8px">
            <ImportEmployeesDialog />
            <AddEmployeeDialog employees={employees} />
          </Flex>
        </Flex>

        <Flex gap="10px" align="center" flexWrap="wrap">
          <SearchInput placeholder="Search employees…" value={search} onValueChange={setSearch} w="220px" h="34px" />
          <FilterBar options={departmentOptions} activeKey={department} onChange={setDepartment} />
        </Flex>
      </Flex>

      <DataTable columns={employeeColumns} rows={rows} rowKey={(e) => e.employeeId} emptyMessage="No employees match this filter." />
    </AppCard>
  );
}
