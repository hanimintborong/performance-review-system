import { Flex } from "@chakra-ui/react";

import { NotificationInbox } from "@/components/notifications/NotificationInbox";
import { getNotificationsForRecipient, getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";
import { sortNotifications } from "@/lib/notificationFeed";
import { toNotificationView } from "@/lib/notificationView";

export default async function EmployeeNotificationsPage() {
  const systemUser = await getCurrentSystemUser();
  if (!systemUser) return null;

  const [stored, allRows] = await Promise.all([
    getNotificationsForRecipient(systemUser.employeeId),
    getReviewRows(),
  ]);

  const myRows = allRows.filter((r) => r.employee.employeeId === systemUser.employeeId);
  const statusByAssignment = new Map(myRows.map((r) => [r.assignmentId, r.status]));

  const items = sortNotifications(stored).map((n) => toNotificationView(n, "employee", statusByAssignment.get(n.assignmentId ?? "")));

  return (
    <Flex direction="column" gap="14px">
      <NotificationInbox title="Notifications" description="Your review updates and reminders" items={items} />
    </Flex>
  );
}
