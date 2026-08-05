"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Dialog, Flex, Input, NativeSelect, Portal, Text } from "@chakra-ui/react";

import { createEmployeeAction, type NewEmployeeInput } from "@/app/(system)/employees/actions";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { toaster } from "@/components/ui/toaster";
import { DEPARTMENTS } from "@/constants/departments";
import { ROLE_META, type SystemRole } from "@/types/role";
import type { Employee } from "@/types/employee";

const ROLE_OPTIONS: SystemRole[] = ["employee", "manager", "hr", "topManagement"];
const BLANK: NewEmployeeInput = { name: "", email: "", department: DEPARTMENTS[0], jobTitle: "", managerEmail: "", systemRole: "employee" };

export function AddEmployeeDialog({ employees }: { employees: Employee[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<NewEmployeeInput>(BLANK);

  function submit() {
    startTransition(async () => {
      const created = await createEmployeeAction(form);
      toaster.create({ title: "Employee added", description: `${created.name} (${created.employeeId})`, type: "success" });
      setOpen(false);
      setForm(BLANK);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
      <Dialog.Trigger asChild>
        <SecondaryButton>Add employee</SecondaryButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="440px">
            <Dialog.Header><Dialog.Title fontSize="15px">Add employee</Dialog.Title></Dialog.Header>
            <Dialog.Body>
              <Flex direction="column" gap="10px">
                <Field label="Full name">
                  <Input size="sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Aisha Tan" />
                </Field>
                <Field label="Work email">
                  <Input size="sm" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@borong.com" />
                </Field>
                <Field label="Job title">
                  <Input size="sm" value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} placeholder="e.g. Procurement Executive" />
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
                      {employees.map((m) => <option key={m.employeeId} value={m.email}>{m.name} — {m.jobTitle}</option>)}
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
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild><SecondaryButton>Cancel</SecondaryButton></Dialog.ActionTrigger>
              <PrimaryButton onClick={submit} disabled={!form.name.trim() || !form.email.trim()} loading={isPending}>
                Add employee
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
