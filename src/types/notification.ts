export type NotificationRuleType =
  | "new_review"
  | "pending_manager_review"
  | "ready_for_management"
  | "review_finalised"
  | "upcoming_deadline"
  | "custom"
  | "wfh_requested"
  | "wfh_approved"
  | "wfh_rejected";

export type NotificationChannel = "in_system" | "email" | "whatsapp";

export type NotificationHistoryEntry = {
  historyId: string;
  ruleId: string;
  recipientName: string;
  type: NotificationRuleType;
  channel: NotificationChannel;
  sentAt: string;
  delivered: boolean;
};

export type Notification = {
  notificationId: string;
  recipientId: string;
  type: NotificationRuleType;
  title: string;
  message: string;
  assignmentId: string | null;
  read: boolean;
  createdAt: string;
};

export type CustomNotificationTiming =
  | { kind: "immediately" }
  | { kind: "date"; date: string }
  | { kind: "interval"; everyDays: number };

export type CustomNotificationStatus = "Active" | "Stopped";

export type CustomNotification = {
  customNotificationId: string;
  recipientId: string;
  recipientName: string;
  message: string;
  timing: CustomNotificationTiming;
  status: CustomNotificationStatus;
  lastSentAt: string | null;
  createdAt: string;
};
