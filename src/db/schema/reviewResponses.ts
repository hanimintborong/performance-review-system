import { jsonb, pgTable, text } from "drizzle-orm/pg-core";

import type { QuestionAnswer } from "@/types/reviewResponse";

export const reviewResponses = pgTable("review_responses", {
  assignmentId: text("assignment_id").primaryKey(),
  answers: jsonb("answers").$type<QuestionAnswer[]>().notNull(),
  employeeComment: text("employee_comment").notNull(),
  managerComment: text("manager_comment").notNull(),
  employeeSubmittedAt: text("employee_submitted_at"),
  managerSubmittedAt: text("manager_submitted_at"),
});
