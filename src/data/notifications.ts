import "server-only";

import { cache } from "react";
import { getDb } from "@/lib/firebaseAdmin";
import type {
  Notification,
  NotificationHistoryEntry,
  NotificationRule,
} from "@/types/notification";

const RULES_COLLECTION = "notificationRules";
const HISTORY_COLLECTION = "notificationHistory";
const INBOX_COLLECTION = "notifications";

export const getNotificationRules = cache(
  async (): Promise<NotificationRule[]> => {
    const snapshot = await getDb()
      .collection(RULES_COLLECTION)
      .get();

    return snapshot.docs.map(
      (doc) => doc.data() as NotificationRule,
    );
  },
);

export async function saveNotificationRule(
  rule: NotificationRule,
): Promise<void> {
  await getDb()
    .collection(RULES_COLLECTION)
    .doc(rule.ruleId)
    .set(rule);
}

export async function deleteNotificationRule(
  ruleId: string,
): Promise<void> {
  await getDb()
    .collection(RULES_COLLECTION)
    .doc(ruleId)
    .delete();
}

export const getNotificationHistory = cache(
  async (): Promise<NotificationHistoryEntry[]> => {
    const snapshot = await getDb()
      .collection(HISTORY_COLLECTION)
      .orderBy("sentAt", "desc")
      .limit(20)
      .get();

    return snapshot.docs.map(
      (doc) => doc.data() as NotificationHistoryEntry,
    );
  },
);

export async function saveNotificationHistoryEntry(
  entry: NotificationHistoryEntry,
): Promise<void> {
  await getDb()
    .collection(HISTORY_COLLECTION)
    .doc(entry.historyId)
    .set(entry);
}

export const getNotificationsForRecipient = cache(
  async (recipientId: string): Promise<Notification[]> => {
    const snapshot = await getDb()
      .collection(INBOX_COLLECTION)
      .where("recipientId", "==", recipientId)
      .limit(50)
      .get();

    return snapshot.docs
      .map((doc) => doc.data() as Notification)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  },
);

export async function saveNotification(
  notification: Notification,
): Promise<void> {
  await getDb()
    .collection(INBOX_COLLECTION)
    .doc(notification.notificationId)
    .set(notification);
}