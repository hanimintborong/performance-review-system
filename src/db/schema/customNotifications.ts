import { jsonb, pgTable, text } from "drizzle-orm/pg-core";

import type { CustomNotificationStatus, CustomNotificationTiming } from "@/types/notification";

export const customNotifications = pgTable("custom_notifications", {
  customNotificationId: text("custom_notification_id").primaryKey(),
  recipientId: text("recipient_id").notNull(),
  recipientName: text("recipient_name").notNull(),
  message: text("message").notNull(),
  timing: jsonb("timing").$type<CustomNotificationTiming>().notNull(),
  status: text("status").$type<CustomNotificationStatus>().notNull(),
  lastSentAt: text("last_sent_at"),
  createdAt: text("created_at").notNull(),
});
