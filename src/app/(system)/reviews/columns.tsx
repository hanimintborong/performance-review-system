import NextLink from "next/link";

import { Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewRow } from "@/data/queries";

export const reviewColumns: DataTableColumn<ReviewRow>[] = [
  {
    key: "staff",
    label: "Staff",
    width: "1.8fr",
    render: (row) => (
      <Text display="flex" alignItems="center" gap="10px" fontSize="13px" fontWeight="600" color="grey.80">
        <UserAvatar initials={row.employee.initials} />
        {row.employee.name}
      </Text>
    ),
  },
  { key: "department", label: "Department", width: "1.1fr", render: (row) => row.employee.department },
  { key: "plan", label: "Review plan", width: "1.2fr", render: (row) => row.planTitle },
  { key: "manager", label: "Manager", width: "1fr", render: (row) => row.managerName },
  {
    key: "status",
    label: "Status",
    width: "170px",
    render: (row) => <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />,
  },
  {
    key: "action",
    label: "",
    width: "110px",
    align: "right",
    render: (row) => (
      <NextLink href={`/reviews/${row.assignmentId}`}>
        <SecondaryButton h="30px" px="12px">View</SecondaryButton>
      </NextLink>
    ),
  },
];
