import { pgTable, text } from "drizzle-orm/pg-core";

import type {
  NotificationChannel,
  NotificationRuleStatus,
  NotificationRuleType,
  NotificationSendTo,
  RepeatFrequency,
} from "@/types/notification";

export const notificationRules = pgTable("notification_rules", {
  ruleId: text("rule_id").primaryKey(),
  planId: text("plan_id").notNull(),
  type: text("type").$type<NotificationRuleType>().notNull(),
  whenToSend: text("when_to_send").notNull(),
  sendTo: text("send_to").$type<NotificationSendTo>().notNull(),
  repeat: text("repeat").$type<RepeatFrequency>().notNull(),
  channel: text("channel").$type<NotificationChannel>().notNull(),
  status: text("status").$type<NotificationRuleStatus>().notNull(),
});
