"use client";

import { useState, useTransition } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { resendInviteAction } from "@/app/(system)/roles-access/userActions";
import { InviteUserDialog } from "@/app/(system)/roles-access/InviteUserDialog";
import { getUsersColumns, type SystemUserRow } from "@/app/(system)/roles-access/usersColumns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { toaster } from "@/components/ui/toaster";
import type { Employee } from "@/types/employee";

type UsersSectionProps = {
  users: SystemUserRow[];
  employees: Employee[];
};

export function UsersSection({ users, employees }: UsersSectionProps) {
  const [isPending, startTransition] = useTransition();
  const [resendingEmail, setResendingEmail] = useState<string | null>(null);

  function handleResend(user: SystemUserRow) {
    setResendingEmail(user.email);
    startTransition(async () => {
      await resendInviteAction(user.email);
      toaster.create({ title: "Invitation resent", description: user.email, type: "success" });
      setResendingEmail(null);
    });
  }

  const columns = getUsersColumns({
    onResend: handleResend,
    isResending: (email) => isPending && resendingEmail === email,
  });

  return (
    <AppCard>
      <Flex align="center" justify="space-between" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Text fontSize="15px" fontWeight="700" color="grey.80">Users</Text>
        <InviteUserDialog employees={employees} invitedEmployeeIds={users.map((u) => u.employeeId)} />
      </Flex>

      <DataTable columns={columns} rows={users} rowKey={(u) => u.email} emptyMessage="No users invited yet." />
    </AppCard>
  );
}
