import { integer, pgTable, text } from "drizzle-orm/pg-core";

import type { ReviewPlanStatus } from "@/types/review";

export const reviewPlans = pgTable("review_plans", {
  planId: text("plan_id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  templateId: text("template_id").notNull(),
  departments: text("departments").array().notNull(),
  participantCount: integer("participant_count").notNull(),
  status: text("status").$type<ReviewPlanStatus>().notNull(),
  createdAt: text("created_at").notNull(),
  activatedAt: text("activated_at"),
  closedAt: text("closed_at"),
});
