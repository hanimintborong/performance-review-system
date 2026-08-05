import type { NotificationRule } from "@/types/notification";

export const mockNotificationRules: NotificationRule[] = [
  { ruleId: "RULE001", planId: "PLAN001", type: "new_review", whenToSend: "On cycle launch", sendTo: "employee_and_manager", repeat: "once", channel: "in_system", status: "Active" },
  { ruleId: "RULE002", planId: "PLAN001", type: "upcoming_deadline", whenToSend: "3 days before employee deadline", sendTo: "employee", repeat: "daily", channel: "email", status: "Active" },
  { ruleId: "RULE003", planId: "PLAN001", type: "pending_manager_review", whenToSend: "1 day after employee submits", sendTo: "manager", repeat: "daily", channel: "in_system", status: "Active" },
  { ruleId: "RULE004", planId: "PLAN001", type: "overdue", whenToSend: "1 day after deadline passes", sendTo: "employee_and_manager", repeat: "daily", channel: "email", status: "Active" },
  { ruleId: "RULE005", planId: "PLAN001", type: "acknowledgement_reminder", whenToSend: "2 days after finalisation", sendTo: "employee", repeat: "weekly", channel: "in_system", status: "Inactive" },
];
