import type { NotificationChannel, NotificationRuleType, NotificationSendTo } from "@/types/notification";

export const NOTIFICATION_TYPE_LABELS: Record<NotificationRuleType, string> = {
  new_review: "New review notification",
  upcoming_deadline: "Upcoming deadline reminder",
  pending_manager_review: "Pending manager-review reminder",
  overdue: "Overdue notification",
  acknowledgement_reminder: "Employee acknowledgement reminder",
};

export const SEND_TO_LABELS: Record<NotificationSendTo, string> = {
  employee: "Employee",
  manager: "Manager",
  hr: "HR",
  employee_and_manager: "Employee & Manager",
};

export const CHANNEL_META: Record<NotificationChannel, { label: string; disabled?: boolean }> = {
  in_system: { label: "In-system" },
  email: { label: "Email" },
  whatsapp: { label: "WhatsApp (coming later)", disabled: true },
};
