import { jsonb, pgTable, text } from "drizzle-orm/pg-core";

import type { ReviewTemplateStatus } from "@/types/review";
import type { TemplateSection } from "@/types/template";

export const reviewTemplates = pgTable("review_templates", {
  templateId: text("template_id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  assignedDepartments: text("assigned_departments").array().notNull(),
  status: text("status").$type<ReviewTemplateStatus>().notNull(),
  sections: jsonb("sections").$type<TemplateSection[]>().notNull(),
});
