import { Menu, Portal, Text } from "@chakra-ui/react";
import { FiMoreHorizontal, FiTrash2, FiXCircle } from "react-icons/fi";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { MenuAction } from "@/components/common/MenuAction";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { StatusStyle } from "@/constants/statusColors";
import type { CustomNotification } from "@/types/notification";

const ACTIVE_STYLE: StatusStyle = { bg: "success.10", fg: "success.70", dot: "success.50" };
const STOPPED_STYLE: StatusStyle = { bg: "grey.10", fg: "grey.60", dot: "grey.40" };

function describeTiming(entry: CustomNotification): string {
  const { timing } = entry;
  if (timing.kind === "immediately") return "Sent immediately";
  if (timing.kind === "date") return `On ${timing.date}`;
  return `Every ${timing.everyDays} day(s)`;
}

type Options = {
  onStop: (entry: CustomNotification) => void;
  onDelete: (entry: CustomNotification) => void;
};

export const getCustomNotificationColumns = ({ onStop, onDelete }: Options): DataTableColumn<CustomNotification>[] => [
  { key: "recipient", label: "Recipient", width: "1.3fr", render: (n) => <Text fontWeight="600">{n.recipientName}</Text> },
  { key: "message", label: "Message", width: "2fr", render: (n) => <Text fontSize="12px" color="grey.70">{n.message}</Text> },
  { key: "timing", label: "Timing", width: "1.4fr", render: describeTiming },
  { key: "lastSentAt", label: "Last sent", width: "150px", render: (n) => n.lastSentAt?.slice(0, 10) ?? "—" },
  {
    key: "status",
    label: "Status",
    width: "110px",
    render: (n) => <StatusBadge label={n.status} style={n.status === "Active" ? ACTIVE_STYLE : STOPPED_STYLE} />,
  },
  {
    key: "action",
    label: "",
    width: "60px",
    align: "right",
    render: (n) => (
      <Menu.Root>
        <Menu.Trigger asChild>
          <SecondaryButton h="30px" px="8px" aria-label="More actions"><FiMoreHorizontal /></SecondaryButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content fontSize="13px" minW="150px" borderRadius="10px" borderWidth="1px" borderColor="grey.20" p="6px">
              {n.status === "Active" && (
                <MenuAction icon={<FiXCircle size={14} />} onSelect={() => onStop(n)} value="stop">Stop</MenuAction>
              )}
              <MenuAction icon={<FiTrash2 size={14} />} onSelect={() => onDelete(n)} value="delete" tone="danger">Delete</MenuAction>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    ),
  },
];
