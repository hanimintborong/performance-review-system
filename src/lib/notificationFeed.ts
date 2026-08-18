import type { Notification } from "@/types/notification";

export function sortNotifications(stored: Notification[]): Notification[] {
  return [...stored].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function computeUnreadNotificationCount(stored: Notification[]): number {
  return stored.filter((n) => !n.read).length;
}
