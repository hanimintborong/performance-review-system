import { boolean, doublePrecision, index, pgTable, text } from "drizzle-orm/pg-core";

import type { FinalOutcome, ReviewStatus } from "@/types/review";

export const reviewAssignments = pgTable(
  "review_assignments",
  {
    assignmentId: text("assignment_id").primaryKey(),
    planId: text("plan_id").notNull(),
    employeeId: text("employee_id").notNull(),
    managerId: text("manager_id").notNull(),
    status: text("status").$type<ReviewStatus>().notNull(),
    employeeScore: doublePrecision("employee_score"),
    managerScore: doublePrecision("manager_score"),
    acknowledged: boolean("acknowledged").notNull(),
    finalOutcome: text("final_outcome").$type<FinalOutcome>(),
    finalOutcomeNotes: text("final_outcome_notes"),
    incrementPercentage: doublePrecision("increment_percentage"),
    incrementEffectiveDate: text("increment_effective_date"),
    finalizedAt: text("finalized_at"),
  },
  (table) => [
    index("review_assignments_employee_idx").on(table.employeeId),
    index("review_assignments_manager_idx").on(table.managerId),
    index("review_assignments_plan_idx").on(table.planId),
  ],
);
