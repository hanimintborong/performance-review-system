"use client";

import { useState, useTransition } from "react";
import { Dialog, Portal } from "@chakra-ui/react";

import { createWfhRequestAction, type NewWfhRequestInput } from "@/app/(system)/wfh/wfhActions";
import { WfhRequestFields } from "@/app/(system)/wfh/WfhRequestFields";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { toaster } from "@/components/ui/toaster";
import type { Employee } from "@/types/employee";

const BLANK: NewWfhRequestInput = {
  date: "",
  duration: "Full Day",
  reason: "",
  workPlan: "",
  availability: ["Email"],
  availabilityOtherDetail: "",
  contactNumber: "",
  acknowledged: false,
  additionalNotes: "",
};

export function NewWfhRequestDialog({ employee }: { employee: Employee }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState(BLANK);

  if (!employee.managerId) return null;

  function submit() {
    startTransition(async () => {
      try {
        await createWfhRequestAction(form);
        toaster.create({ title: "WFH request submitted", type: "success" });
        setOpen(false);
        setForm(BLANK);
      } catch (err) {
        toaster.create({ title: "Could not submit request", description: err instanceof Error ? err.message : undefined, type: "error" });
      }
    });
  }

  const isInvalid = !form.date || !form.reason.trim() || !form.workPlan.trim() || !form.contactNumber.trim() || !form.acknowledged
    || form.availability.length === 0
    || (form.availability.includes("Other") && !form.availabilityOtherDetail.trim());

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
      <Dialog.Trigger asChild>
        <PrimaryButton>New request</PrimaryButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="560px">
            <Dialog.Header p="22px 26px 6px"><Dialog.Title fontSize="16px">Request details</Dialog.Title></Dialog.Header>
            <Dialog.Body p="14px 26px" maxH="65vh" overflowY="auto">
              <WfhRequestFields employee={employee} form={form} onChange={setForm} />
            </Dialog.Body>
            <Dialog.Footer p="16px 26px 22px">
              <Dialog.ActionTrigger asChild><SecondaryButton>Cancel</SecondaryButton></Dialog.ActionTrigger>
              <PrimaryButton onClick={submit} disabled={isInvalid} loading={isPending}>Submit request</PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
