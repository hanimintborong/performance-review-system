import { Flex, Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { WFH_STATUS_STYLE } from "@/constants/statusColors";
import type { WfhRequestRow } from "@/data/queries";

type OrgOverviewColumnsOptions = {
  onView: (row: WfhRequestRow) => void;
};

export const getOrgOverviewColumns = ({ onView }: OrgOverviewColumnsOptions): DataTableColumn<WfhRequestRow>[] => [
  {
    key: "employee",
    label: "Employee",
    width: "1.4fr",
    render: (r) => (
      <Flex align="center" gap="10px">
        <UserAvatar initials={r.employee.initials} />
        <Text fontSize="13px" fontWeight="600" color="grey.80">{r.employee.name}</Text>
      </Flex>
    ),
  },
  { key: "department", label: "Department", width: "1fr", render: (r) => r.employee.department },
  { key: "manager", label: "Approver", width: "1fr", render: (r) => r.approverName },
  { key: "date", label: "Date", width: "110px", render: (r) => r.date },
  { key: "duration", label: "Duration", width: "0.9fr", render: (r) => r.duration },
  {
    key: "status",
    label: "Status",
    width: "140px",
    render: (r) => <StatusBadge label={r.status} style={WFH_STATUS_STYLE[r.status]} />,
  },
  {
    key: "comment",
    label: "Approver comment",
    width: "1.3fr",
    render: (r) => <Text fontSize="12px" color="grey.60">{r.approverComment ?? "—"}</Text>,
  },
  {
    key: "action",
    label: "",
    width: "90px",
    align: "right",
    render: (r) => <SecondaryButton h="30px" px="10px" onClick={() => onView(r)}>View</SecondaryButton>,
  },
];
