import "server-only";

import { cache } from "react";
import { desc, eq } from "drizzle-orm";

import { customNotifications, notificationHistory, notifications } from "@/db/schema";
import { db } from "@/lib/db";
import type { CustomNotification, Notification, NotificationHistoryEntry } from "@/types/notification";

export const getNotificationHistory = cache(async (): Promise<NotificationHistoryEntry[]> => {
  return db.select().from(notificationHistory).orderBy(desc(notificationHistory.sentAt)).limit(20);
});

export async function saveNotificationHistoryEntry(entry: NotificationHistoryEntry): Promise<void> {
  await db.insert(notificationHistory).values(entry).onConflictDoUpdate({
    target: notificationHistory.historyId,
    set: entry,
  });
}

export const getNotificationsForRecipient = cache(async (recipientId: string): Promise<Notification[]> => {
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.recipientId, recipientId))
    .orderBy(desc(notifications.createdAt))
    .limit(50);
});

export async function saveNotification(notification: Notification): Promise<void> {
  await db.insert(notifications).values(notification).onConflictDoUpdate({
    target: notifications.notificationId,
    set: notification,
  });
}

export const getCustomNotifications = cache(async (): Promise<CustomNotification[]> => {
  return db.select().from(customNotifications).orderBy(desc(customNotifications.createdAt));
});

export async function saveCustomNotification(entry: CustomNotification): Promise<void> {
  await db.insert(customNotifications).values(entry).onConflictDoUpdate({
    target: customNotifications.customNotificationId,
    set: entry,
  });
}

export async function deleteCustomNotification(customNotificationId: string): Promise<void> {
  await db.delete(customNotifications).where(eq(customNotifications.customNotificationId, customNotificationId));
}
