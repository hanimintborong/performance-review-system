import { boolean, index, pgTable, text } from "drizzle-orm/pg-core";

import type { WfhAvailability, WfhDuration, WfhStatus } from "@/types/wfh";

export const wfhRequests = pgTable(
  "wfh_requests",
  {
    requestId: text("request_id").primaryKey(),
    employeeId: text("employee_id").notNull(),
    approverId: text("approver_id").notNull(),
    date: text("date").notNull(),
    duration: text("duration").$type<WfhDuration>().notNull(),
    reason: text("reason").notNull(),
    workPlan: text("work_plan").notNull(),
    availability: text("availability").array().$type<WfhAvailability[]>().notNull(),
    availabilityOtherDetail: text("availability_other_detail"),
    contactNumber: text("contact_number").notNull(),
    acknowledged: boolean("acknowledged").notNull(),
    additionalNotes: text("additional_notes"),
    status: text("status").$type<WfhStatus>().notNull(),
    approverComment: text("approver_comment"),
    decidedAt: text("decided_at"),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    index("wfh_requests_employee_idx").on(table.employeeId),
    index("wfh_requests_approver_idx").on(table.approverId),
  ],
);
