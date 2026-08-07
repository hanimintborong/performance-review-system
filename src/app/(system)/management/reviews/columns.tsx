import NextLink from "next/link";
import { Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewRow } from "@/data/queries";

export const managementReviewColumns: DataTableColumn<ReviewRow>[] = [
  { key: "employee", label: "Employee", width: "1.6fr", render: (row) => <Text fontWeight="600">{row.employee.name}</Text> },
  { key: "cycle", label: "Cycle", width: "1.3fr", render: (row) => row.planTitle },
  { key: "department", label: "Department", width: "1.1fr", render: (row) => row.employee.department },
  { key: "manager", label: "Manager", width: "1.1fr", render: (row) => row.managerName },
  {
    key: "status",
    label: "Status",
    width: "170px",
    render: (row) => <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />,
  },
  { key: "score", label: "Final score", width: "90px", render: (row) => row.managerScore?.toFixed(1) ?? "—" },
  {
    key: "action",
    label: "",
    width: "110px",
    align: "right",
    render: (row) => (
      <NextLink href={`/management/reviews/${row.assignmentId}`}>
        <SecondaryButton h="30px" px="12px">View details</SecondaryButton>
      </NextLink>
    ),
  },
];
