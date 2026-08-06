"use client";

import { useState, useTransition } from "react";
import { Flex, Tabs, Text } from "@chakra-ui/react";

import {
  deleteNotificationRuleAction,
  saveNotificationRuleAction,
  toggleNotificationRuleStatusAction,
} from "@/app/(system)/notifications/notificationActions";
import { historyColumns } from "@/app/(system)/notifications/historyColumns";
import { getRulesColumns, type NotificationRuleRow } from "@/app/(system)/notifications/rulesColumns";
import { RuleFormDialog } from "@/app/(system)/notifications/RuleFormDialog";
import { AppCard } from "@/components/common/AppCard";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { DataTable } from "@/components/common/DataTable";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { toaster } from "@/components/ui/toaster";
import type { NotificationHistoryEntry, NotificationRule } from "@/types/notification";
import type { ReviewPlan } from "@/types/review";

function blankRule(planId: string): NotificationRule {
  return { ruleId: `RULE-NEW-${planId}`, planId, type: "new_review", whenToSend: "", sendTo: "employee", repeat: "once", channel: "in_system", status: "Active" };
}

type NotificationsClientProps = {
  rules: NotificationRuleRow[];
  history: NotificationHistoryEntry[];
  plans: ReviewPlan[];
};

export function NotificationsClient({ rules, history, plans }: NotificationsClientProps) {
  const [, startTransition] = useTransition();
  const [editingRule, setEditingRule] = useState<NotificationRule | null>(null);
  const [pendingDelete, setPendingDelete] = useState<NotificationRuleRow | null>(null);

  function saveRule(rule: NotificationRule) {
    startTransition(async () => {
      await saveNotificationRuleAction(rule);
      toaster.create({ title: "Notification rule saved", type: "success" });
    });
  }

  const columns = getRulesColumns({
    onEdit: setEditingRule,
    onToggleStatus: (rule) => {
      startTransition(async () => {
        const nextStatus = await toggleNotificationRuleStatusAction(rule.ruleId);
        if (nextStatus) toaster.create({ title: `Rule ${nextStatus.toLowerCase()}`, type: "success" });
      });
    },
    onDelete: setPendingDelete,
  });

  return (
    <AppCard>
      <Tabs.Root defaultValue="rules">
        <Flex align="center" justify="space-between" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20" flexWrap="wrap" gap="10px">
          <Flex direction="column" gap="6px">
            <Text fontSize="15px" fontWeight="700" color="grey.80">Notification & Reminder</Text>
            <Tabs.List>
              <Tabs.Trigger value="rules">Rules</Tabs.Trigger>
              <Tabs.Trigger value="history">Notification history</Tabs.Trigger>
            </Tabs.List>
          </Flex>

          <PrimaryButton onClick={() => setEditingRule(blankRule(plans[0]?.planId ?? ""))}>New rule</PrimaryButton>
        </Flex>

        <Tabs.Content value="rules" p="0">
          <DataTable columns={columns} rows={rules} rowKey={(r) => r.ruleId} emptyMessage="No notification rules yet." />
        </Tabs.Content>

        <Tabs.Content value="history" p="0">
          <DataTable columns={historyColumns} rows={history} rowKey={(h) => h.historyId} emptyMessage="No notifications sent yet." />
        </Tabs.Content>
      </Tabs.Root>

      {editingRule && (
        <RuleFormDialog open rule={editingRule} plans={plans} onOpenChange={(open) => !open && setEditingRule(null)} onSave={saveRule} />
      )}

      <ConfirmationDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete notification rule?"
        description="This rule will stop sending notifications immediately."
        confirmLabel="Delete"
        onConfirm={() => {
          if (!pendingDelete) return;
          const rule = pendingDelete;
          startTransition(async () => {
            await deleteNotificationRuleAction(rule.ruleId);
            toaster.create({ title: "Rule deleted", type: "success" });
          });
        }}
      />
    </AppCard>
  );
}
