import { Flex, Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { PLAN_STATUS_STYLE } from "@/constants/statusColors";
import { formatDate } from "@/lib/date";
import { ROLE_META } from "@/types/role";
import type { SystemUserRecord } from "@/types/systemUser";

const STATUS_STYLE = {
  active: PLAN_STATUS_STYLE.Active,
  invited: PLAN_STATUS_STYLE.Draft,
};

export type SystemUserRow = SystemUserRecord & {
  employeeName: string;
  employeeInitials: string;
  employeeJobTitle: string;
};

type UsersColumnsOptions = {
  onResend: (user: SystemUserRow) => void;
  isResending: (email: string) => boolean;
};

export const getUsersColumns = ({ onResend, isResending }: UsersColumnsOptions): DataTableColumn<SystemUserRow>[] => [
  {
    key: "employee",
    label: "Employee",
    width: "1.5fr",
    render: (user) => (
      <Flex align="center" gap="10px">
        <UserAvatar initials={user.employeeInitials} />
        <Flex direction="column">
          <Text fontSize="13px" fontWeight="600" color="grey.80">{user.employeeName}</Text>
          <Text fontSize="11px" color="grey.60">{user.employeeJobTitle}</Text>
        </Flex>
      </Flex>
    ),
  },
  { key: "email", label: "Email", width: "1.3fr", render: (user) => user.email },
  { key: "role", label: "Role", width: "0.9fr", render: (user) => ROLE_META[user.role].label },
  {
    key: "status",
    label: "Status",
    width: "100px",
    render: (user) => <StatusBadge label={user.status === "active" ? "Active" : "Invited"} style={STATUS_STYLE[user.status]} />,
  },
  { key: "invitedAt", label: "Invited", width: "100px", render: (user) => formatDate(user.invitedAt.slice(0, 10)) },
  {
    key: "action",
    label: "",
    width: "110px",
    align: "right",
    render: (user) =>
      user.status === "invited" ? (
        <SecondaryButton h="30px" px="10px" onClick={() => onResend(user)} loading={isResending(user.email)}>
          Resend
        </SecondaryButton>
      ) : null,
  },
];
