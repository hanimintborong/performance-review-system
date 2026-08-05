"use client";

import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiAlertTriangle, FiBell, FiCheckCircle, FiSend } from "react-icons/fi";
import type { IconType } from "react-icons";

import { AppCard } from "@/components/common/AppCard";
import { NOTIFICATION_TYPE_LABELS } from "@/constants/notificationTypes";
import type { NotificationHistoryEntry } from "@/types/notification";

const TYPE_ICON: Record<NotificationHistoryEntry["type"], { icon: IconType; color: string }> = {
  new_review: { icon: FiSend, color: "brand.50" },
  upcoming_deadline: { icon: FiBell, color: "warning.50" },
  pending_manager_review: { icon: FiSend, color: "info.50" },
  overdue: { icon: FiAlertTriangle, color: "error.50" },
  acknowledgement_reminder: { icon: FiCheckCircle, color: "success.50" },
};

export function RecentActivity({ history }: { history: NotificationHistoryEntry[] }) {
  const recent = history.slice(0, 5);

  return (
    <AppCard p="16px 20px">
      <Text fontSize="15px" fontWeight="700" color="grey.80" mb="12px">Recent activity</Text>

      <Flex direction="column" gap="12px">
        {recent.length === 0 && <Text fontSize="12px" color="grey.60">No activity yet.</Text>}

        {recent.map((entry) => {
          const meta = TYPE_ICON[entry.type];
          return (
            <Flex key={entry.historyId} gap="10px" align="flex-start">
              <Icon as={meta.icon} boxSize="16px" color={meta.color} mt="2px" flexShrink="0" />
              <Flex direction="column">
                <Text fontSize="12px" color="grey.80" lineHeight="1.4">
                  {NOTIFICATION_TYPE_LABELS[entry.type]} sent to {entry.recipientName}
                </Text>
                <Text fontSize="11px" color="grey.40">{entry.sentAt}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </AppCard>
  );
}
