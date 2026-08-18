import { Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { StatusBadge } from "@/components/common/StatusBadge";
import { CHANNEL_META, NOTIFICATION_TYPE_LABELS } from "@/constants/notificationTypes";
import type { StatusStyle } from "@/constants/statusColors";
import type { NotificationHistoryEntry } from "@/types/notification";

const DELIVERED_STYLE: StatusStyle = { bg: "success.10", fg: "success.70", dot: "success.50" };
const FAILED_STYLE: StatusStyle = { bg: "error.10", fg: "error.70", dot: "error.50" };

export const historyColumns: DataTableColumn<NotificationHistoryEntry>[] = [
  { key: "recipient", label: "Recipient", width: "1.4fr", render: (h) => <Text fontWeight="600">{h.recipientName}</Text> },
  { key: "type", label: "Notification type", width: "1.6fr", render: (h) => NOTIFICATION_TYPE_LABELS[h.type] ?? h.type },
  { key: "channel", label: "Channel", width: "1fr", render: (h) => CHANNEL_META[h.channel].label },
  { key: "sentAt", label: "Sent at", width: "150px", render: (h) => h.sentAt },
  {
    key: "delivered",
    label: "Delivery",
    width: "120px",
    render: (h) => <StatusBadge label={h.delivered ? "Delivered" : "Failed"} style={h.delivered ? DELIVERED_STYLE : FAILED_STYLE} />,
  },
];
