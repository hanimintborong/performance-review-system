import { boolean, index, pgTable, text } from "drizzle-orm/pg-core";

import type { NotificationRuleType } from "@/types/notification";

export const notifications = pgTable(
  "notifications",
  {
    notificationId: text("notification_id").primaryKey(),
    recipientId: text("recipient_id").notNull(),
    type: text("type").$type<NotificationRuleType>().notNull(),
    title: text("title").notNull(),
    message: text("message").notNull(),
    assignmentId: text("assignment_id"),
    read: boolean("read").notNull(),
    createdAt: text("created_at").notNull(),
  },
  (table) => [index("notifications_recipient_idx").on(table.recipientId)],
);
