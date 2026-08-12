import { Flex, Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { WFH_STATUS_STYLE } from "@/constants/statusColors";
import type { WfhRequestRow } from "@/data/queries";

type MyRequestColumnsOptions = {
  onView: (row: WfhRequestRow) => void;
  onCancel: (requestId: string) => void;
  isCancelling: (requestId: string) => boolean;
};

export const getMyRequestColumns = ({ onView, onCancel, isCancelling }: MyRequestColumnsOptions): DataTableColumn<WfhRequestRow>[] => [
  { key: "date", label: "Date", width: "110px", render: (r) => r.date },
  { key: "duration", label: "Duration", width: "1fr", render: (r) => r.duration },
  { key: "reason", label: "Reason", width: "1.6fr", render: (r) => r.reason },
  {
    key: "status",
    label: "Status",
    width: "150px",
    render: (r) => <StatusBadge label={r.status} style={WFH_STATUS_STYLE[r.status]} />,
  },
  {
    key: "comment",
    label: "Approver comment",
    width: "1.4fr",
    render: (r) => <Text fontSize="12px" color="grey.60">{r.approverComment ?? "—"}</Text>,
  },
  {
    key: "action",
    label: "",
    width: "170px",
    align: "right",
    render: (r) => (
      <Flex gap="6px" justify="flex-end">
        <SecondaryButton h="30px" px="10px" onClick={() => onView(r)}>View</SecondaryButton>
        {r.status === "Pending Approval" && (
          <SecondaryButton h="30px" px="10px" loading={isCancelling(r.requestId)} onClick={() => onCancel(r.requestId)}>Cancel</SecondaryButton>
        )}
      </Flex>
    ),
  },
];
