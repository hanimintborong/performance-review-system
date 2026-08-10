import { integer, pgTable, text } from "drizzle-orm/pg-core";

import type { ReviewPlanStatus } from "@/types/review";

export const reviewPlans = pgTable("review_plans", {
  planId: text("plan_id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  templateId: text("template_id").notNull(),
  reviewPeriod: text("review_period").notNull(),
  employeeDeadline: text("employee_deadline").notNull(),
  managerDeadline: text("manager_deadline").notNull(),
  hrReviewDeadline: text("hr_review_deadline").notNull(),
  managementReviewPeriod: text("management_review_period").notNull(),
  departments: text("departments").array().notNull(),
  participantCount: integer("participant_count").notNull(),
  status: text("status").$type<ReviewPlanStatus>().notNull(),
});
