import { NOTIFICATION_TYPE_LABELS } from "@/constants/notificationTypes";
import { toNotificationView, type NotificationRecipientRole, type NotificationView } from "@/lib/notificationView";
import type { Notification } from "@/types/notification";
import type { ReviewStatus } from "@/types/review";

export function groupNotifications(
  notifications: Notification[],
  role: NotificationRecipientRole,
  statusByAssignment: Map<string, ReviewStatus>,
): NotificationView[] {
  const groups = new Map<string, Notification[]>();
  notifications.forEach((n) => groups.set(n.type, [...(groups.get(n.type) ?? []), n]));

  const views: NotificationView[] = [];
  groups.forEach((group) => {
    if (group.length === 1) {
      views.push(toNotificationView(group[0], role, statusByAssignment.get(group[0].assignmentId ?? "")));
      return;
    }

    views.push({
      key: `group-${group[0].type}`,
      type: group[0].type,
      title: `${group.length} ${NOTIFICATION_TYPE_LABELS[group[0].type]} notifications`,
      message: group.map((n) => n.title).join(" · "),
      createdAt: group.reduce((latest, n) => (n.createdAt > latest ? n.createdAt : latest), group[0].createdAt),
      read: group.every((n) => n.read),
      href: "/manager/team",
      sourceItems: group,
    });
  });

  return views.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
