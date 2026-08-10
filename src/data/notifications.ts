import "server-only";

import { cache } from "react";
import { desc, eq } from "drizzle-orm";

import { notificationHistory, notificationRules, notifications } from "@/db/schema";
import { db } from "@/lib/db";
import type { Notification, NotificationHistoryEntry, NotificationRule } from "@/types/notification";

export const getNotificationRules = cache(async (): Promise<NotificationRule[]> => {
  return db.select().from(notificationRules);
});

export async function saveNotificationRule(rule: NotificationRule): Promise<void> {
  await db.insert(notificationRules).values(rule).onConflictDoUpdate({
    target: notificationRules.ruleId,
    set: rule,
  });
}

export async function deleteNotificationRule(ruleId: string): Promise<void> {
  await db.delete(notificationRules).where(eq(notificationRules.ruleId, ruleId));
}

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
