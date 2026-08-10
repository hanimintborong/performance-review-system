import { FiAlertTriangle, FiAward, FiBell, FiCheckCircle, FiClock, FiFlag, FiMessageSquare } from "react-icons/fi";
import type { IconType } from "react-icons";

import type { NotificationChannel, NotificationRuleType, NotificationSendTo } from "@/types/notification";

export const NOTIFICATION_TYPE_LABELS: Record<NotificationRuleType, string> = {
  new_review: "New review notification",
  upcoming_deadline: "Upcoming deadline reminder",
  pending_manager_review: "Pending manager-review reminder",
  overdue: "Overdue notification",
  acknowledgement_reminder: "Employee acknowledgement reminder",
  manager_submitted: "Manager evaluation submitted",
  discussion_required: "Discussion required",
  review_finalised: "Review finalised",
  ready_for_management: "Ready for management review",
  cycle_completed: "Review cycle completed",
};

export const NOTIFICATION_TYPE_ICON: Record<NotificationRuleType, IconType> = {
  new_review: FiBell,
  upcoming_deadline: FiClock,
  pending_manager_review: FiClock,
  overdue: FiAlertTriangle,
  acknowledgement_reminder: FiCheckCircle,
  manager_submitted: FiCheckCircle,
  discussion_required: FiMessageSquare,
  review_finalised: FiAward,
  ready_for_management: FiFlag,
  cycle_completed: FiAward,
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
