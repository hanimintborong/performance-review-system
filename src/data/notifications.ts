import "server-only";

import { getDb } from "@/lib/firebaseAdmin";
import type { NotificationHistoryEntry, NotificationRule } from "@/types/notification";

export async function getNotificationRules(): Promise<NotificationRule[]> {
  const snapshot = await getDb().collection("notificationRules").get();
  return snapshot.docs.map((doc) => doc.data() as NotificationRule);
}

export async function saveNotificationRule(rule: NotificationRule): Promise<void> {
  await getDb().collection("notificationRules").doc(rule.ruleId).set(rule);
}

export async function deleteNotificationRule(ruleId: string): Promise<void> {
  await getDb().collection("notificationRules").doc(ruleId).delete();
}

export async function getNotificationHistory(): Promise<NotificationHistoryEntry[]> {
  const snapshot = await getDb().collection("notificationHistory").orderBy("sentAt", "desc").get();
  return snapshot.docs.map((doc) => doc.data() as NotificationHistoryEntry);
}
