import type { NotificationHistoryEntry } from "@/types/notification";

export const mockNotificationHistory: NotificationHistoryEntry[] = [
  { historyId: "HIST001", ruleId: "RULE001", recipientName: "Amirul Hakim Zulkifli", type: "new_review", channel: "in_system", sentAt: "2026-07-01 09:00", delivered: true },
  { historyId: "HIST002", ruleId: "RULE002", recipientName: "Farah Liyana Musa", type: "upcoming_deadline", channel: "email", sentAt: "2026-08-05 09:00", delivered: true },
  { historyId: "HIST003", ruleId: "RULE002", recipientName: "Kevin Lim Wei Jie", type: "upcoming_deadline", channel: "email", sentAt: "2026-08-05 09:00", delivered: true },
  { historyId: "HIST004", ruleId: "RULE003", recipientName: "Aisha Tan", type: "pending_manager_review", channel: "in_system", sentAt: "2026-08-06 09:00", delivered: true },
  { historyId: "HIST005", ruleId: "RULE004", recipientName: "Nadia Roslan", type: "overdue", channel: "email", sentAt: "2026-07-21 09:00", delivered: true },
  { historyId: "HIST006", ruleId: "RULE004", recipientName: "Daniel Wong", type: "overdue", channel: "email", sentAt: "2026-07-21 09:00", delivered: false },
  { historyId: "HIST007", ruleId: "RULE001", recipientName: "Grace Foo", type: "new_review", channel: "in_system", sentAt: "2026-07-01 09:00", delivered: true },
];
