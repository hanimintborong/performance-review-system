"use client";

import { useState, useTransition } from "react";
import { Flex, Tabs, Text } from "@chakra-ui/react";

import { deleteCustomNotificationAction, stopCustomNotificationAction } from "@/app/(system)/notifications/customNotificationActions";
import { getCustomNotificationColumns } from "@/app/(system)/notifications/customNotificationColumns";
import { CustomNotificationDialog } from "@/app/(system)/notifications/CustomNotificationDialog";
import { historyColumns } from "@/app/(system)/notifications/historyColumns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { NotificationRowList } from "@/components/notifications/NotificationRowList";
import { toaster } from "@/components/ui/toaster";
import type { Employee } from "@/types/employee";
import type { NotificationView } from "@/lib/notificationView";
import type { CustomNotification, NotificationHistoryEntry } from "@/types/notification";

type NotificationsClientProps = {
  customNotifications: CustomNotification[];
  history: NotificationHistoryEntry[];
  employees: Employee[];
  alerts: NotificationView[];
};

export function NotificationsClient({ customNotifications, history, employees, alerts }: NotificationsClientProps) {
  const [, startTransition] = useTransition();
  const [showNew, setShowNew] = useState(false);

  const columns = getCustomNotificationColumns({
    onStop: (entry) => {
      startTransition(async () => {
        await stopCustomNotificationAction(entry.customNotificationId, entry);
        toaster.create({ title: "Notification stopped", type: "success" });
      });
    },
    onDelete: (entry) => {
      startTransition(async () => {
        await deleteCustomNotificationAction(entry.customNotificationId);
        toaster.create({ title: "Notification deleted", type: "success" });
      });
    },
  });

  return (
    <AppCard>
      <Tabs.Root defaultValue="custom">
        <Flex align="center" justify="space-between" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20" flexWrap="wrap" gap="10px">
          <Flex direction="column" gap="6px">
            <Text fontSize="15px" fontWeight="700" color="grey.80">Notification & Reminder</Text>
            <Tabs.List gap="20px">
              <Tabs.Trigger value="custom">Custom notifications</Tabs.Trigger>
              <Tabs.Trigger value="history">Notification history</Tabs.Trigger>
              <Tabs.Trigger value="alerts">Alerts ({alerts.filter((a) => !a.read).length})</Tabs.Trigger>
            </Tabs.List>
          </Flex>

          <PrimaryButton onClick={() => setShowNew(true)}>New notification</PrimaryButton>
        </Flex>

        <Tabs.Content value="custom" p="0">
          <DataTable columns={columns} rows={customNotifications} rowKey={(n) => n.customNotificationId} emptyMessage="No custom notifications yet." />
        </Tabs.Content>

        <Tabs.Content value="history" p="0">
          <DataTable columns={historyColumns} rows={history} rowKey={(h) => h.historyId} emptyMessage="No notifications sent yet." />
        </Tabs.Content>

        <Tabs.Content value="alerts" p="0">
          <NotificationRowList items={alerts} />
        </Tabs.Content>
      </Tabs.Root>

      <CustomNotificationDialog open={showNew} onOpenChange={setShowNew} employees={employees} />
    </AppCard>
  );
}
