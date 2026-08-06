import "server-only";

import { cache } from "react";
import { getDb } from "@/lib/firebaseAdmin";
import type {
  NotificationHistoryEntry,
  NotificationRule,
} from "@/types/notification";

const RULES_COLLECTION = "notificationRules";
const HISTORY_COLLECTION = "notificationHistory";

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