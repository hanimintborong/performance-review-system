export type NotificationRuleType =
  | "new_review"
  | "upcoming_deadline"
  | "pending_manager_review"
  | "overdue"
  | "acknowledgement_reminder";

export type NotificationChannel = "in_system" | "email" | "whatsapp";
export type NotificationSendTo = "employee" | "manager" | "hr" | "employee_and_manager";
export type RepeatFrequency = "once" | "daily" | "weekly";
export type NotificationRuleStatus = "Active" | "Inactive";

export type NotificationRule = {
  ruleId: string;
  planId: string;
  type: NotificationRuleType;
  whenToSend: string;
  sendTo: NotificationSendTo;
  repeat: RepeatFrequency;
  channel: NotificationChannel;
  status: NotificationRuleStatus;
};

export type NotificationHistoryEntry = {
  historyId: string;
  ruleId: string;
  recipientName: string;
  type: NotificationRuleType;
  channel: NotificationChannel;
  sentAt: string;
  delivered: boolean;
};
