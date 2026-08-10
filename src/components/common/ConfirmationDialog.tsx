import { Dialog, Portal } from "@chakra-ui/react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";

type ConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(details) => onOpenChange(details.open)} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px">
            <Dialog.Header p="22px 26px 6px">
              <Dialog.Title fontSize="15px" color="grey.80">{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body p="10px 26px">
              <Dialog.Description fontSize="13px" color="grey.60">{description}</Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer p="16px 26px 22px">
              <Dialog.ActionTrigger asChild>
                <SecondaryButton>Cancel</SecondaryButton>
              </Dialog.ActionTrigger>
              <PrimaryButton
                onClick={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
              >
                {confirmLabel}
              </PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
