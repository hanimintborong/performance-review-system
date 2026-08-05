import { Flex, Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PLAN_STATUS_STYLE } from "@/constants/statusColors";
import { CHANNEL_META, NOTIFICATION_TYPE_LABELS, SEND_TO_LABELS } from "@/constants/notificationTypes";
import type { NotificationRule } from "@/types/notification";

export type NotificationRuleRow = NotificationRule & { planTitle: string };

type RulesColumnsOptions = {
  onEdit: (rule: NotificationRuleRow) => void;
  onToggleStatus: (rule: NotificationRuleRow) => void;
  onDelete: (rule: NotificationRuleRow) => void;
};

export const getRulesColumns = ({ onEdit, onToggleStatus, onDelete }: RulesColumnsOptions): DataTableColumn<NotificationRuleRow>[] => [
  {
    key: "type",
    label: "Notification type",
    width: "1.6fr",
    render: (rule) => (
      <Flex direction="column">
        <Text fontSize="13px" fontWeight="600" color="grey.80">{NOTIFICATION_TYPE_LABELS[rule.type]}</Text>
        <Text fontSize="11px" color="grey.60">{rule.whenToSend}</Text>
      </Flex>
    ),
  },
  { key: "plan", label: "Review plan", width: "1.2fr", render: (rule) => rule.planTitle },
  { key: "sendTo", label: "Send to", width: "1fr", render: (rule) => SEND_TO_LABELS[rule.sendTo] },
  { key: "channel", label: "Channel", width: "1fr", render: (rule) => CHANNEL_META[rule.channel].label },
  { key: "repeat", label: "Repeat", width: "80px", render: (rule) => rule.repeat },
  {
    key: "status",
    label: "Status",
    width: "100px",
    render: (rule) => <StatusBadge label={rule.status} style={PLAN_STATUS_STYLE[rule.status]} />,
  },
  {
    key: "action",
    label: "",
    width: "190px",
    align: "right",
    render: (rule) => (
      <Flex justify="flex-end" gap="8px">
        <SecondaryButton h="30px" px="10px" onClick={() => onEdit(rule)}>Edit</SecondaryButton>
        <SecondaryButton h="30px" px="10px" onClick={() => onToggleStatus(rule)}>
          {rule.status === "Active" ? "Deactivate" : "Activate"}
        </SecondaryButton>
        <SecondaryButton h="30px" px="10px" color="error.70" onClick={() => onDelete(rule)}>Delete</SecondaryButton>
      </Flex>
    ),
  },
];
