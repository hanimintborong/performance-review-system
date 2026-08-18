import "server-only";

import { getCustomNotifications, saveCustomNotification } from "@/data/queries";
import { notify } from "@/lib/notify";

function daysSince(dateIso: string, today: string): number {
  return Math.floor((new Date(today).getTime() - new Date(dateIso).getTime()) / 86400000);
}

export async function runCustomNotificationScheduler(): Promise<{ sent: number }> {
  const today = new Date().toISOString().slice(0, 10);
  const pending = (await getCustomNotifications()).filter((n) => n.status === "Active");
  let sent = 0;

  for (const entry of pending) {
    const { timing } = entry;
    let shouldSend = false;
    let stopAfter = false;

    if (timing.kind === "date") {
      shouldSend = timing.date === today;
      stopAfter = true;
    } else if (timing.kind === "interval") {
      const reference = entry.lastSentAt ?? entry.createdAt;
      shouldSend = daysSince(reference, today) >= timing.everyDays;
    }

    if (!shouldSend) continue;

    await notify({
      recipientId: entry.recipientId,
      recipientName: entry.recipientName,
      type: "custom",
      title: "Message from HR",
      message: entry.message,
      dedupeKey: today,
    });

    await saveCustomNotification({ ...entry, lastSentAt: new Date().toISOString(), status: stopAfter ? "Stopped" : "Active" });
    sent += 1;
  }

  return { sent };
}
