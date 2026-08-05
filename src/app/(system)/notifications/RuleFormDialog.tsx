import { useState, type ReactNode } from "react";
import { Dialog, Flex, Input, NativeSelect, Portal, Text } from "@chakra-ui/react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { CHANNEL_META, NOTIFICATION_TYPE_LABELS, SEND_TO_LABELS } from "@/constants/notificationTypes";
import type { NotificationRule } from "@/types/notification";
import type { ReviewPlan } from "@/types/review";

type RuleFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule: NotificationRule;
  plans: ReviewPlan[];
  onSave: (rule: NotificationRule) => void;
};

export function RuleFormDialog({ open, onOpenChange, rule, plans, onSave }: RuleFormDialogProps) {
  const [draft, setDraft] = useState(rule);

  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="480px">
            <Dialog.Header><Dialog.Title fontSize="15px">Notification rule</Dialog.Title></Dialog.Header>
            <Dialog.Body>
              <Flex direction="column" gap="10px">
                <Field label="Review plan">
                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field value={draft.planId} onChange={(e) => setDraft({ ...draft, planId: e.target.value })}>
                      {plans.map((p) => <option key={p.planId} value={p.planId}>{p.title}</option>)}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field>

                <Field label="Notification type">
                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as NotificationRule["type"] })}>
                      {Object.entries(NOTIFICATION_TYPE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field>

                <Field label="When to send">
                  <Input size="sm" value={draft.whenToSend} onChange={(e) => setDraft({ ...draft, whenToSend: e.target.value })} placeholder="e.g. 3 days before deadline" />
                </Field>

                <Field label="Send to">
                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field value={draft.sendTo} onChange={(e) => setDraft({ ...draft, sendTo: e.target.value as NotificationRule["sendTo"] })}>
                      {Object.entries(SEND_TO_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field>

                <Flex gap="10px">
                  <Field label="Repeat">
                    <NativeSelect.Root size="sm">
                      <NativeSelect.Field value={draft.repeat} onChange={(e) => setDraft({ ...draft, repeat: e.target.value as NotificationRule["repeat"] })}>
                        <option value="once">Once</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field>

                  <Field label="Channel">
                    <NativeSelect.Root size="sm">
                      <NativeSelect.Field value={draft.channel} onChange={(e) => setDraft({ ...draft, channel: e.target.value as NotificationRule["channel"] })}>
                        {Object.entries(CHANNEL_META).map(([value, meta]) => (
                          <option key={value} value={value} disabled={meta.disabled}>{meta.label}</option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field>
                </Flex>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild><SecondaryButton>Cancel</SecondaryButton></Dialog.ActionTrigger>
              <PrimaryButton onClick={() => { onSave(draft); onOpenChange(false); }}>Save rule</PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Flex direction="column" gap="4px" flex="1">
      <Text as="label" fontSize="11px" fontWeight="700" color="grey.60">{label}</Text>
      {children}
    </Flex>
  );
}
