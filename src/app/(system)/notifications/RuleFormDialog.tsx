import { useState, type ReactNode } from "react";
import { Dialog, Flex, NativeSelect, Portal, Text } from "@chakra-ui/react";
import { FiCalendar, FiFileText, FiSend } from "react-icons/fi";

import { RuleInfoCallout } from "@/app/(system)/notifications/RuleInfoCallout";
import { RuleSectionHeading } from "@/app/(system)/notifications/RuleSectionHeading";
import { WhenToSendField } from "@/app/(system)/notifications/WhenToSendField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { CHANNEL_META, NOTIFICATION_TYPE_LABELS, SEND_TO_LABELS, SEND_TO_PLURAL } from "@/constants/notificationTypes";
import { describeSchedule } from "@/lib/describeSchedule";
import type { NotificationRule } from "@/types/notification";
import type { ReviewPlan } from "@/types/review";

const SELECT_STYLE = { borderRadius: "10px", pl: "14px", pr: "30px" };
const REPEAT_LABELS: Record<NotificationRule["repeat"], string> = { once: "once", daily: "daily", weekly: "weekly" };

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
          <Dialog.Content borderRadius="12px" maxW="520px">
            <Dialog.Header p="22px 26px 6px"><Dialog.Title fontSize="15px">Notification rule</Dialog.Title></Dialog.Header>
            <Dialog.Body p="10px 26px" maxH="70vh" overflowY="auto">
              <Flex direction="column" gap="14px">
                <RuleSectionHeading step={1} title="Notification" icon={FiFileText} first />
                <Flex gap="14px">
                  <Field label="Review plan">
                    <NativeSelect.Root size="sm">
                      <NativeSelect.Field {...SELECT_STYLE} value={draft.planId} onChange={(e) => setDraft({ ...draft, planId: e.target.value })}>
                        {plans.map((p) => <option key={p.planId} value={p.planId}>{p.title}</option>)}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field>

                  <Field label="Notification type">
                    <NativeSelect.Root size="sm">
                      <NativeSelect.Field {...SELECT_STYLE} value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as NotificationRule["type"] })}>
                        {Object.entries(NOTIFICATION_TYPE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field>
                </Flex>

                <RuleSectionHeading step={2} title="Schedule" icon={FiCalendar} />
                <WhenToSendField value={draft.whenToSend} onChange={(whenToSend) => setDraft({ ...draft, whenToSend })} />

                <RuleSectionHeading step={3} title="Delivery" icon={FiSend} />
                <Flex gap="14px">
                  <Field label="Send to" hint="Who receives it">
                    <NativeSelect.Root size="sm">
                      <NativeSelect.Field {...SELECT_STYLE} value={draft.sendTo} onChange={(e) => setDraft({ ...draft, sendTo: e.target.value as NotificationRule["sendTo"] })}>
                        {Object.entries(SEND_TO_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field>

                  <Field label="Repeat">
                    <NativeSelect.Root size="sm">
                      <NativeSelect.Field {...SELECT_STYLE} value={draft.repeat} onChange={(e) => setDraft({ ...draft, repeat: e.target.value as NotificationRule["repeat"] })}>
                        <option value="once">Once</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field>

                  <Field label="Channel">
                    <NativeSelect.Root size="sm">
                      <NativeSelect.Field {...SELECT_STYLE} value={draft.channel} onChange={(e) => setDraft({ ...draft, channel: e.target.value as NotificationRule["channel"] })}>
                        {Object.entries(CHANNEL_META).map(([value, meta]) => (
                          <option key={value} value={value} disabled={meta.disabled}>{meta.label}</option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field>
                </Flex>

                <RuleInfoCallout icon={FiFileText} title="Rule summary">
                  {SEND_TO_PLURAL[draft.sendTo]} will receive this notification {describeSchedule(draft.whenToSend)}, {REPEAT_LABELS[draft.repeat]}, {CHANNEL_META[draft.channel].label.replace(" (coming later)", "").toLowerCase()}.
                </RuleInfoCallout>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer p="16px 26px 22px">
              <Dialog.ActionTrigger asChild><SecondaryButton>Cancel</SecondaryButton></Dialog.ActionTrigger>
              <PrimaryButton onClick={() => { onSave(draft); onOpenChange(false); }}>Save rule</PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <Flex direction="column" gap="6px" flex="1">
      <Flex align="baseline" gap="6px">
        <Text as="label" fontSize="11px" fontWeight="700" color="grey.60">{label}</Text>
        {hint && <Text fontSize="10px" color="grey.40">— {hint}</Text>}
      </Flex>
      {children}
    </Flex>
  );
}
