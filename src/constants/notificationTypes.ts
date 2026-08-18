import { FiAward, FiBell, FiCheckCircle, FiClock, FiFlag, FiHome, FiSend, FiXCircle } from "react-icons/fi";
import type { IconType } from "react-icons";

import type { NotificationChannel, NotificationRuleType } from "@/types/notification";

export const NOTIFICATION_TYPE_LABELS: Record<NotificationRuleType, string> = {
  new_review: "New review cycle",
  pending_manager_review: "Pending manager-review reminder",
  ready_for_management: "Ready for management review",
  review_finalised: "Review finalised",
  upcoming_deadline: "Reminder",
  custom: "Custom notification",
  wfh_requested: "WFH request submitted",
  wfh_approved: "WFH request approved",
  wfh_rejected: "WFH request rejected",
};

export const NOTIFICATION_TYPE_ICON: Record<NotificationRuleType, IconType> = {
  new_review: FiBell,
  pending_manager_review: FiClock,
  ready_for_management: FiFlag,
  review_finalised: FiAward,
  upcoming_deadline: FiClock,
  custom: FiSend,
  wfh_requested: FiHome,
  wfh_approved: FiCheckCircle,
  wfh_rejected: FiXCircle,
};

export const CHANNEL_META: Record<NotificationChannel, { label: string; disabled?: boolean }> = {
  in_system: { label: "In-system" },
  email: { label: "Email (coming later)", disabled: true },
  whatsapp: { label: "WhatsApp (coming later)", disabled: true },
};
