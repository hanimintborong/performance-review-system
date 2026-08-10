import { pgTable, text } from "drizzle-orm/pg-core";

import type { EmploymentStatus } from "@/types/employee";
import type { SystemRole } from "@/types/role";

export const employees = pgTable("employees", {
  employeeId: text("employee_id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  department: text("department").notNull(),
  jobTitle: text("job_title").notNull(),
  managerId: text("manager_id"),
  managerName: text("manager_name"),
  systemRole: text("system_role").$type<SystemRole>().notNull(),
  employmentStatus: text("employment_status").$type<EmploymentStatus>().notNull(),
  initials: text("initials").notNull(),
});
