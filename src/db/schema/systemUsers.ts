import { pgTable, text } from "drizzle-orm/pg-core";

import type { SystemRole } from "@/types/role";
import type { SystemUserStatus } from "@/types/systemUser";

export const systemUsers = pgTable("system_users", {
  email: text("email").primaryKey(),
  role: text("role").$type<SystemRole>().notNull(),
  employeeId: text("employee_id").notNull(),
  status: text("status").$type<SystemUserStatus>().notNull(),
  invitedAt: text("invited_at").notNull(),
});
