"use client";

import { useState } from "react";
import { Dialog, Flex, NativeSelect, Portal, Text, Textarea } from "@chakra-ui/react";

import { createCustomNotificationAction } from "@/app/(system)/notifications/customNotificationActions";
import { TimingFields } from "@/app/(system)/notifications/TimingFields";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { toaster } from "@/components/ui/toaster";
import type { Employee } from "@/types/employee";
import type { CustomNotificationTiming } from "@/types/notification";

type CustomNotificationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees: Employee[];
};

export function CustomNotificationDialog({ open, onOpenChange, employees }: CustomNotificationDialogProps) {
  const [recipientId, setRecipientId] = useState(employees[0]?.employeeId ?? "");
  const [message, setMessage] = useState("");
  const [timing, setTiming] = useState<CustomNotificationTiming>({ kind: "immediately" });
  const [saving, setSaving] = useState(false);

  async function submit() {
    const recipient = employees.find((e) => e.employeeId === recipientId);
    if (!recipient || !message.trim()) return;

    setSaving(true);
    await createCustomNotificationAction(recipient.employeeId, recipient.name, message.trim(), timing);
    toaster.create({ title: "Notification saved", description: `To ${recipient.name}`, type: "success" });
    setSaving(false);
    setMessage("");
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="460px">
            <Dialog.Header p="22px 26px 6px"><Dialog.Title fontSize="15px">Send custom notification</Dialog.Title></Dialog.Header>
            <Dialog.Body p="10px 26px" display="flex" flexDirection="column" gap="14px">
              <Flex direction="column" gap="4px">
                <Text fontSize="11px" fontWeight="700" color="grey.60">Recipient</Text>
                <NativeSelect.Root size="sm">
                  <NativeSelect.Field value={recipientId} onChange={(e) => setRecipientId(e.target.value)} pl="12px" pr="30px">
                    {employees.map((e) => <option key={e.employeeId} value={e.employeeId}>{e.name}</option>)}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Flex>

              <TimingFields timing={timing} onChange={setTiming} />

              <Flex direction="column" gap="4px">
                <Text fontSize="11px" fontWeight="700" color="grey.60">Message</Text>
                <Textarea size="sm" px="12px" py="8px" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What should this notification say?" />
              </Flex>
            </Dialog.Body>
            <Dialog.Footer p="16px 26px 22px">
              <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={submit} loading={saving} disabled={!message.trim()}>Send</PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
