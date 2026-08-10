import "server-only";

import { saveNotification, saveNotificationHistoryEntry } from "@/data/queries";
import type { NotificationRuleType } from "@/types/notification";

type NotifyInput = {
  recipientId: string;
  recipientName: string;
  type: NotificationRuleType;
  title: string;
  message: string;
  assignmentId?: string | null;
  dedupeKey?: string;
};

export async function notify({ recipientId, recipientName, type, title, message, assignmentId = null, dedupeKey }: NotifyInput): Promise<void> {
  const createdAt = new Date().toISOString();
  const notificationId = `NOTIF-${recipientId}-${type}-${assignmentId ?? "general"}-${dedupeKey ?? Date.now()}`;

  await saveNotification({ notificationId, recipientId, type, title, message, assignmentId, read: false, createdAt });

  await saveNotificationHistoryEntry({
    historyId: `HIST-${notificationId}`,
    ruleId: "system",
    recipientName,
    type,
    channel: "in_system",
    sentAt: createdAt,
    delivered: true,
  });
}

type Recipient = { recipientId: string; recipientName: string };

export async function notifyMany(recipients: Recipient[], rest: Omit<NotifyInput, "recipientId" | "recipientName">): Promise<void> {
  await Promise.all(recipients.map((r) => notify({ ...rest, ...r })));
}
