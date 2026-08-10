"use server";

import { revalidatePath } from "next/cache";

import { saveNotification } from "@/data/queries";
import type { Notification } from "@/types/notification";

export async function markNotificationsReadAction(items: Notification[], read: boolean): Promise<void> {
  await Promise.all(items.map((n) => saveNotification({ ...n, read })));

  revalidatePath("/employee/notifications");
  revalidatePath("/manager/notifications");
  revalidatePath("/management/notifications");
  revalidatePath("/notifications");
}
