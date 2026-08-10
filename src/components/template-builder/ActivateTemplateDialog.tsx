"use client";

import { Dialog, Portal, Text } from "@chakra-ui/react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";

type ActivateTemplateDialogProps = {
  open: boolean;
  templateTitle: string;
  onClose: () => void;
  onCreateCycle: () => void;
};

export function ActivateTemplateDialog({ open, templateTitle, onClose, onCreateCycle }: ActivateTemplateDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="440px">
            <Dialog.Header p="22px 26px 6px"><Dialog.Title fontSize="15px">Template activated</Dialog.Title></Dialog.Header>
            <Dialog.Body p="10px 26px">
              <Text fontSize="13px" color="grey.70">
                &ldquo;{templateTitle}&rdquo; is now active. Assign it to a review cycle so employees and managers can start submitting reviews with it.
              </Text>
            </Dialog.Body>
            <Dialog.Footer p="16px 26px 22px">
              <SecondaryButton onClick={onClose}>OK</SecondaryButton>
              <PrimaryButton onClick={onCreateCycle}>Create review cycle</PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
