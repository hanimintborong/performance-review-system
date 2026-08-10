import { boolean, index, pgTable, text } from "drizzle-orm/pg-core";

import type { NotificationChannel, NotificationRuleType } from "@/types/notification";

export const notificationHistory = pgTable(
  "notification_history",
  {
    historyId: text("history_id").primaryKey(),
    ruleId: text("rule_id").notNull(),
    recipientName: text("recipient_name").notNull(),
    type: text("type").$type<NotificationRuleType>().notNull(),
    channel: text("channel").$type<NotificationChannel>().notNull(),
    sentAt: text("sent_at").notNull(),
    delivered: boolean("delivered").notNull(),
  },
  (table) => [index("notification_history_sent_at_idx").on(table.sentAt)],
);
