"use server";

import { revalidatePath } from "next/cache";

import { deleteCustomNotification, saveCustomNotification } from "@/data/queries";
import { notify } from "@/lib/notify";
import type { CustomNotification, CustomNotificationTiming } from "@/types/notification";

export async function createCustomNotificationAction(
  recipientId: string,
  recipientName: string,
  message: string,
  timing: CustomNotificationTiming,
): Promise<void> {
  const now = new Date().toISOString();
  const fireNow = timing.kind === "immediately";

  const entry: CustomNotification = {
    customNotificationId: `CUSTOM-${Date.now()}-${recipientId}`,
    recipientId,
    recipientName,
    message,
    timing,
    status: fireNow ? "Stopped" : "Active",
    lastSentAt: fireNow ? now : null,
    createdAt: now,
  };

  await saveCustomNotification(entry);

  if (fireNow) {
    await notify({ recipientId, recipientName, type: "custom", title: "Message from HR", message, dedupeKey: entry.customNotificationId });
  }

  revalidatePath("/notifications");
}

export async function stopCustomNotificationAction(customNotificationId: string, current: CustomNotification): Promise<void> {
  await saveCustomNotification({ ...current, status: "Stopped" });
  revalidatePath("/notifications");
}

export async function deleteCustomNotificationAction(customNotificationId: string): Promise<void> {
  await deleteCustomNotification(customNotificationId);
  revalidatePath("/notifications");
}
