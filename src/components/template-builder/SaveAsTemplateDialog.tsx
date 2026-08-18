"use client";

import { useState } from "react";
import { Dialog, Input, Portal, Text } from "@chakra-ui/react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";

type SaveAsTemplateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (title: string) => void;
  saving?: boolean;
};

export function SaveAsTemplateDialog({ open, onOpenChange, onConfirm, saving }: SaveAsTemplateDialogProps) {
  const [title, setTitle] = useState("");

  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="440px">
            <Dialog.Header p="22px 26px 6px"><Dialog.Title fontSize="15px">Save as new template</Dialog.Title></Dialog.Header>
            <Dialog.Body p="10px 26px" display="flex" flexDirection="column" gap="8px">
              <Text fontSize="13px" color="grey.60">
                The master template stays unchanged. Your edits are saved into a brand new template with this title.
              </Text>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Mid-Year Review 2026" fontSize="13px" autoFocus />
            </Dialog.Body>
            <Dialog.Footer p="16px 26px 22px">
              <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={() => onConfirm(title.trim())} disabled={!title.trim()} loading={saving}>
                Create template
              </PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
