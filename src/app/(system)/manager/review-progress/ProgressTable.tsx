"use client";

import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import type { DataTableColumn } from "@/components/common/DataTableRow";
import { StatusBadge } from "@/components/common/StatusBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewRow } from "@/data/queries";

const columns: DataTableColumn<ReviewRow>[] = [
  {
    key: "employee",
    label: "Employee",
    width: "1.8fr",
    render: (row) => (
      <Flex align="center" gap="10px">
        <UserAvatar initials={row.employee.initials} />
        <Text fontSize="13px" fontWeight="600" color="grey.80">{row.employee.name}</Text>
      </Flex>
    ),
  },
  { key: "deadline", label: "Deadline", width: "110px", render: (row) => row.deadline },
  {
    key: "status",
    label: "Status",
    width: "180px",
    render: (row) => <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />,
  },
];

export function ProgressTable({ rows }: { rows: ReviewRow[] }) {
  return (
    <AppCard>
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.assignmentId} emptyMessage="No team members to show." />
    </AppCard>
  );
}
