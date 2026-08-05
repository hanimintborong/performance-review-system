"use client";

import { Flex, Text } from "@chakra-ui/react";

import { InviteUserDialog } from "@/app/(system)/roles-access/InviteUserDialog";
import { usersColumns, type SystemUserRow } from "@/app/(system)/roles-access/usersColumns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import type { Employee } from "@/types/employee";

type UsersSectionProps = {
  users: SystemUserRow[];
  employees: Employee[];
};

export function UsersSection({ users, employees }: UsersSectionProps) {
  return (
    <AppCard>
      <Flex align="center" justify="space-between" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Text fontSize="15px" fontWeight="700" color="grey.80">Users</Text>
        <InviteUserDialog employees={employees} invitedEmployeeIds={users.map((u) => u.employeeId)} />
      </Flex>

      <DataTable columns={usersColumns} rows={users} rowKey={(u) => u.email} emptyMessage="No users invited yet." />
    </AppCard>
  );
}
