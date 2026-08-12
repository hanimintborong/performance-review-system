import { Flex, Text } from "@chakra-ui/react";

import { TeamRequestActions } from "@/app/(system)/wfh/TeamRequestActions";
import type { DataTableColumn } from "@/components/common/DataTableRow";
import { StatusBadge } from "@/components/common/StatusBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { WFH_STATUS_STYLE } from "@/constants/statusColors";
import type { WfhRequestRow } from "@/data/queries";

type TeamRequestColumnsOptions = {
  onView: (row: WfhRequestRow) => void;
  onApprove: (requestId: string) => void;
  onReject: (row: WfhRequestRow) => void;
  isProcessing: (requestId: string) => boolean;
};

export const getTeamRequestColumns = ({ onView, onApprove, onReject, isProcessing }: TeamRequestColumnsOptions): DataTableColumn<WfhRequestRow>[] => [
  {
    key: "employee",
    label: "Employee",
    width: "1.5fr",
    render: (r) => (
      <Flex align="center" gap="10px">
        <UserAvatar initials={r.employee.initials} />
        <Flex direction="column">
          <Text fontSize="13px" fontWeight="600" color="grey.80">{r.employee.name}</Text>
          <Text fontSize="11px" color="grey.60">{r.employee.department}</Text>
        </Flex>
      </Flex>
    ),
  },
  { key: "date", label: "Date", width: "110px", render: (r) => r.date },
  { key: "duration", label: "Duration", width: "0.9fr", render: (r) => r.duration },
  { key: "reason", label: "Reason", width: "1.4fr", render: (r) => r.reason },
  {
    key: "status",
    label: "Status",
    width: "140px",
    render: (r) => <StatusBadge label={r.status} style={WFH_STATUS_STYLE[r.status]} />,
  },
  {
    key: "action",
    label: "",
    width: "250px",
    align: "right",
    render: (r) => (
      <TeamRequestActions
        row={r}
        isProcessing={isProcessing(r.requestId)}
        onView={() => onView(r)}
        onApprove={() => onApprove(r.requestId)}
        onReject={() => onReject(r)}
      />
    ),
  },
];
