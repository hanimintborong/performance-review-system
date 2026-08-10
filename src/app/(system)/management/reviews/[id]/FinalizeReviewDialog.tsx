"use client";

import { useState, useTransition } from "react";
import { Dialog, Flex, NativeSelect, Portal, Text, Textarea } from "@chakra-ui/react";

import { finalizeReviewAction } from "@/app/(system)/management/reviews/[id]/finalizeReviewActions";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { toaster } from "@/components/ui/toaster";
import type { FinalOutcome } from "@/types/review";

const OUTCOMES: FinalOutcome[] = ["Promoted", "Increment", "Maintained", "Performance Improvement Plan"];

export function FinalizeReviewDialog({ assignmentId }: { assignmentId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [outcome, setOutcome] = useState<FinalOutcome>("Increment");
  const [notes, setNotes] = useState("");

  function submit() {
    startTransition(async () => {
      await finalizeReviewAction(assignmentId, outcome, notes);
      toaster.create({ title: "Review finalised", description: outcome, type: "success" });
      setOpen(false);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
      <Dialog.Trigger asChild>
        <PrimaryButton>Finalise review</PrimaryButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="440px">
            <Dialog.Header p="22px 26px 6px"><Dialog.Title fontSize="15px">Finalise review</Dialog.Title></Dialog.Header>
            <Dialog.Body p="10px 26px">
              <Flex direction="column" gap="10px">
                <Text fontSize="12px" color="grey.60">
                  Confirms the manager&apos;s evaluation is complete. This locks the review as Finalised.
                </Text>

                <Flex direction="column" gap="4px">
                  <Text fontSize="11px" fontWeight="700" color="grey.60">Final outcome</Text>
                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field value={outcome} onChange={(e) => setOutcome(e.target.value as FinalOutcome)}>
                      {OUTCOMES.map((o) => <option key={o} value={o}>{o}</option>)}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Flex>

                <Flex direction="column" gap="4px">
                  <Text fontSize="11px" fontWeight="700" color="grey.60">Increment details / notes</Text>
                  <Textarea size="sm" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. 5% increment effective next payroll cycle" />
                </Flex>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer p="16px 26px 22px">
              <Dialog.ActionTrigger asChild><SecondaryButton>Cancel</SecondaryButton></Dialog.ActionTrigger>
              <PrimaryButton onClick={submit} loading={isPending}>Confirm finalise</PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
