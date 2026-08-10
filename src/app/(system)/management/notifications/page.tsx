import { Flex } from "@chakra-ui/react";

import { NotificationInbox } from "@/components/notifications/NotificationInbox";
import { getEmployees, getNotificationsForRecipient, getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";
import { isVisibleToTopManagement } from "@/lib/managementVisibility";
import { computeDeadlineNotifications, mergeNotifications } from "@/lib/notificationFeed";
import { toNotificationView } from "@/lib/notificationView";

export default async function ManagementNotificationsPage() {
  const systemUser = await getCurrentSystemUser();
  if (!systemUser) return null;

  const [stored, allRows, employees] = await Promise.all([
    getNotificationsForRecipient(systemUser.employeeId),
    getReviewRows(),
    getEmployees(),
  ]);

  const scopedRows = allRows.filter((row) => isVisibleToTopManagement(row, employees, systemUser.employeeId));
  const statusByAssignment = new Map(scopedRows.map((r) => [r.assignmentId, r.status]));

  const merged = mergeNotifications(stored, computeDeadlineNotifications(scopedRows, systemUser.employeeId));
  const items = merged.map((n) => toNotificationView(n, "topManagement", statusByAssignment.get(n.assignmentId ?? "")));

  return (
    <Flex direction="column" gap="14px">
      <NotificationInbox title="Notifications" description="Management-level review alerts" items={items} />
    </Flex>
  );
}
