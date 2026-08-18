import { Flex } from "@chakra-ui/react";

import { NotificationInbox } from "@/components/notifications/NotificationInbox";
import { getNotificationsForRecipient, getReviewRows } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";
import { groupNotifications } from "@/lib/groupNotifications";
import { sortNotifications } from "@/lib/notificationFeed";

export default async function ManagerNotificationsPage() {
  const systemUser = await getCurrentSystemUser();
  if (!systemUser) return null;

  const [stored, allRows] = await Promise.all([
    getNotificationsForRecipient(systemUser.employeeId),
    getReviewRows(),
  ]);

  const teamRows = allRows.filter((r) => r.managerId === systemUser.employeeId);
  const statusByAssignment = new Map(teamRows.map((r) => [r.assignmentId, r.status]));

  const items = groupNotifications(sortNotifications(stored), "manager", statusByAssignment);

  return (
    <Flex direction="column" gap="14px">
      <NotificationInbox title="Notifications" description="Team review alerts" items={items} />
    </Flex>
  );
}
