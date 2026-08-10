"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Dialog, Flex, Input, NativeSelect, Portal, Text } from "@chakra-ui/react";

import { inviteUserAction } from "@/app/(system)/roles-access/userActions";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { toaster } from "@/components/ui/toaster";
import type { Employee } from "@/types/employee";
import { ROLE_META, type SystemRole } from "@/types/role";

const ROLE_OPTIONS: SystemRole[] = ["hr", "manager", "employee", "topManagement"];

type InviteUserDialogProps = {
  employees: Employee[];
  invitedEmployeeIds: string[];
};

export function InviteUserDialog({ employees, invitedEmployeeIds }: InviteUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const available = employees.filter((e) => !invitedEmployeeIds.includes(e.employeeId));

  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState(available[0]?.employeeId ?? "");
  const [role, setRole] = useState<SystemRole>(available[0]?.systemRole ?? "employee");

  function pickEmployee(id: string) {
    setEmployeeId(id);
    const employee = available.find((e) => e.employeeId === id);
    if (employee) setRole(employee.systemRole);
  }

  function submit() {
    startTransition(async () => {
      await inviteUserAction({ email, role, employeeId });
      toaster.create({ title: "Invitation sent", description: email, type: "success" });
      setOpen(false);
      setEmail("");
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
      <Dialog.Trigger asChild>
        <PrimaryButton>Invite user</PrimaryButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="440px">
            <Dialog.Header p="22px 26px 6px"><Dialog.Title fontSize="15px">Invite user</Dialog.Title></Dialog.Header>
            <Dialog.Body p="10px 26px">
              <Flex direction="column" gap="10px">
                <Field label="Employee">
                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field value={employeeId} onChange={(e) => pickEmployee(e.target.value)}>
                      {available.map((e) => <option key={e.employeeId} value={e.employeeId}>{e.name} — {e.jobTitle}</option>)}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field>

                <Field label="Work email">
                  <Input size="sm" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@borong.com" />
                </Field>

                <Field label="System role">
                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field value={role} onChange={(e) => setRole(e.target.value as SystemRole)}>
                      {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{ROLE_META[r].label}</option>)}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer p="16px 26px 22px">
              <Dialog.ActionTrigger asChild><SecondaryButton>Cancel</SecondaryButton></Dialog.ActionTrigger>
              <PrimaryButton onClick={submit} disabled={!email.trim() || !employeeId} loading={isPending}>
                Send invitation
              </PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Flex direction="column" gap="4px">
      <Text fontSize="11px" fontWeight="700" color="grey.60">{label}</Text>
      {children}
    </Flex>
  );
}
