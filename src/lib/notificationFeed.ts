import type { ReviewRow } from "@/data/queries";
import type { Notification } from "@/types/notification";

const DEADLINE_WARNING_DAYS = 3;

function daysUntil(deadline: string, today: string): number {
  return Math.ceil((new Date(deadline).getTime() - new Date(today).getTime()) / 86400000);
}

function virtualNotification(recipientId: string, row: ReviewRow, overdue: boolean): Notification {
  return {
    notificationId: `VIRTUAL-${overdue ? "overdue" : "upcoming_deadline"}-${row.assignmentId}-${recipientId}`,
    recipientId,
    type: overdue ? "overdue" : "upcoming_deadline",
    title: overdue ? `${row.employee.name}'s review is overdue` : `Deadline approaching: ${row.planTitle}`,
    message: overdue ? `Was due ${row.deadline} · status: ${row.status}` : `Due ${row.deadline} · status: ${row.status}`,
    assignmentId: row.assignmentId,
    read: false,
    createdAt: row.deadline,
  };
}

export function computeDeadlineNotifications(rows: ReviewRow[], recipientId: string): Notification[] {
  const today = new Date().toISOString().slice(0, 10);
  const open = rows.filter((r) => r.status !== "Finalised");

  const overdue = open.filter((r) => r.status === "Overdue" || r.deadline < today);
  const overdueIds = new Set(overdue.map((r) => r.assignmentId));
  const upcoming = open.filter((r) => !overdueIds.has(r.assignmentId) && r.deadline >= today && daysUntil(r.deadline, today) <= DEADLINE_WARNING_DAYS);

  return [
    ...overdue.map((r) => virtualNotification(recipientId, r, true)),
    ...upcoming.map((r) => virtualNotification(recipientId, r, false)),
  ];
}

export function mergeNotifications(stored: Notification[], computed: Notification[]): Notification[] {
  const storedKeys = new Set(stored.map((n) => `${n.type}-${n.assignmentId}`));
  const fresh = computed.filter((n) => !storedKeys.has(`${n.type}-${n.assignmentId}`));
  return [...stored, ...fresh].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
