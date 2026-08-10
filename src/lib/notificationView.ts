import type { Notification, NotificationRuleType } from "@/types/notification";
import type { ReviewStatus } from "@/types/review";

const OPEN_STATUSES: ReviewStatus[] = ["Not Started", "Self-Assessment", "Overdue"];

export type NotificationRecipientRole = "employee" | "manager" | "topManagement";

export type NotificationView = {
  key: string;
  type: NotificationRuleType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  href: string | null;
  sourceItems: Notification[];
};

export function resolveNotificationHref(role: NotificationRecipientRole, assignmentId: string | null, status?: ReviewStatus): string | null {
  if (!assignmentId) return null;
  if (role === "manager") return `/manager/reviews/${assignmentId}`;
  if (role === "topManagement") return `/management/reviews/${assignmentId}`;

  const open = status ? OPEN_STATUSES.includes(status) : false;
  return open ? `/employee/evaluation/${assignmentId}` : `/employee/reviews/${assignmentId}`;
}

export function toNotificationView(n: Notification, role: NotificationRecipientRole, status?: ReviewStatus): NotificationView {
  return {
    key: n.notificationId,
    type: n.type,
    title: n.title,
    message: n.message,
    createdAt: n.createdAt,
    read: n.read,
    href: resolveNotificationHref(role, n.assignmentId, status),
    sourceItems: [n],
  };
}
