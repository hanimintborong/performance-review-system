"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Dialog, Flex, Input, NativeSelect, Portal, Text } from "@chakra-ui/react";

import { updateEmployeeAction, type NewEmployeeInput } from "@/app/(system)/employees/employeeActions";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { toaster } from "@/components/ui/toaster";
import { DEPARTMENTS } from "@/constants/departments";
import { ROLE_META, type SystemRole } from "@/types/role";
import type { Employee } from "@/types/employee";

const ROLE_OPTIONS: SystemRole[] = ["employee", "manager", "hr", "topManagement"];

type EditEmployeeDialogProps = {
  employee: Employee;
  employees: Employee[];
  onOpenChange: (open: boolean) => void;
};

export function EditEmployeeDialog({ employee, employees, onOpenChange }: EditEmployeeDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<NewEmployeeInput>({
    name: employee.name,
    email: employee.email,
    department: employee.department,
    jobTitle: employee.jobTitle,
    managerEmail: employees.find((e) => e.employeeId === employee.managerId)?.email ?? "",
    systemRole: employee.systemRole,
  });

  const otherEmployees = employees.filter((e) => e.employeeId !== employee.employeeId);

  function submit() {
    startTransition(async () => {
      await updateEmployeeAction(employee.employeeId, form);
      toaster.create({ title: "Employee updated", description: form.name, type: "success" });
      onOpenChange(false);
    });
  }

  return (
    <Dialog.Root open onOpenChange={(e) => onOpenChange(e.open)} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="440px">
            <Dialog.Header><Dialog.Title fontSize="15px">Edit employee</Dialog.Title></Dialog.Header>
            <Dialog.Body>
              <Flex direction="column" gap="10px">
                <Field label="Full name">
                  <Input size="sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </Field>
                <Field label="Work email">
                  <Input size="sm" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </Field>
                <Field label="Job title">
                  <Input size="sm" value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} />
                </Field>
                <Field label="Department">
                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                      {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field>
                <Field label="Reporting manager (optional)">
                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field value={form.managerEmail} onChange={(e) => setForm({ ...form, managerEmail: e.target.value })}>
                      <option value="">No manager</option>
                      {otherEmployees.map((m) => <option key={m.employeeId} value={m.email}>{m.name} — {m.jobTitle}</option>)}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field>
                <Field label="System role">
                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field value={form.systemRole} onChange={(e) => setForm({ ...form, systemRole: e.target.value as SystemRole })}>
                      {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{ROLE_META[r].label}</option>)}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field>
                <Text fontSize="11px" color="grey.40">
                  If this person already has a login, their access role updates too — not just their profile.
                </Text>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild><SecondaryButton>Cancel</SecondaryButton></Dialog.ActionTrigger>
              <PrimaryButton onClick={submit} disabled={!form.name.trim() || !form.email.trim()} loading={isPending}>
                Save changes
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
