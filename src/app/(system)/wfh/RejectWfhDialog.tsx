"use client";

import { useState, useTransition } from "react";
import { Dialog, Portal, Text, Textarea } from "@chakra-ui/react";

import { rejectWfhRequestAction } from "@/app/(system)/wfh/wfhApprovalActions";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { toaster } from "@/components/ui/toaster";
import type { WfhRequestRow } from "@/data/queries";

type RejectWfhDialogProps = {
  row: WfhRequestRow | null;
  onClose: () => void;
};

export function RejectWfhDialog({ row, onClose }: RejectWfhDialogProps) {
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit() {
    if (!row) return;
    startTransition(async () => {
      await rejectWfhRequestAction(row.requestId, comment);
      toaster.create({ title: "Request rejected", type: "success" });
      setComment("");
      onClose();
    });
  }

  return (
    <Dialog.Root open={row !== null} onOpenChange={(e) => !e.open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="420px">
            <Dialog.Header p="22px 26px 6px"><Dialog.Title fontSize="15px">Reject WFH request</Dialog.Title></Dialog.Header>
            <Dialog.Body p="10px 26px">
              <Text fontSize="12px" color="grey.60" mb="8px">{row?.employee.name} · {row?.date}</Text>
              <Textarea
                size="sm"
                px="12px"
                py="8px"
                rows={3}
                placeholder="Reason for rejection (required)…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Dialog.Body>
            <Dialog.Footer p="16px 26px 22px">
              <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
              <PrimaryButton onClick={submit} disabled={!comment.trim()} loading={isPending}>Confirm reject</PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
