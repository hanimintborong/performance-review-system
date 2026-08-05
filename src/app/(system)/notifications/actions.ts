"use server";

import { revalidatePath } from "next/cache";

import { deleteNotificationRule, getNotificationRules, saveNotificationRule } from "@/data/queries";
import type { NotificationRule } from "@/types/notification";

export async function saveNotificationRuleAction(rule: NotificationRule) {
  await saveNotificationRule(rule);
  revalidatePath("/notifications");
}

export async function deleteNotificationRuleAction(ruleId: string) {
  await deleteNotificationRule(ruleId);
  revalidatePath("/notifications");
}

export async function toggleNotificationRuleStatusAction(ruleId: string): Promise<NotificationRule["status"] | null> {
  const rules = await getNotificationRules();
  const rule = rules.find((r) => r.ruleId === ruleId);
  if (!rule) return null;

  const nextStatus = rule.status === "Active" ? "Inactive" : "Active";
  await saveNotificationRule({ ...rule, status: nextStatus });
  revalidatePath("/notifications");

  return nextStatus;
}
