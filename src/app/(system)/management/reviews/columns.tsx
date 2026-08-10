import NextLink from "next/link";
import { Flex, Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewRow } from "@/data/queries";
import { STATUS_PROGRESS } from "@/lib/teamProgressStats";

export const managementReviewColumns: DataTableColumn<ReviewRow>[] = [
  { key: "employee", label: "Employee", width: "1.4fr", render: (row) => <Text fontWeight="600">{row.employee.name}</Text> },
  { key: "cycle", label: "Cycle", width: "1.1fr", render: (row) => row.planTitle },
  { key: "department", label: "Department", width: "0.9fr", render: (row) => row.employee.department },
  { key: "manager", label: "Manager", width: "0.9fr", render: (row) => row.managerName },
  {
    key: "status",
    label: "Status",
    width: "150px",
    render: (row) => <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />,
  },
  {
    key: "progress",
    label: "Progress",
    width: "120px",
    render: (row) => {
      const pct = STATUS_PROGRESS[row.status];
      return (
        <Flex align="center" gap="8px">
          <Flex flex="1" h="6px" bg="grey.10" borderRadius="full" overflow="hidden">
            <Flex h="100%" w={`${pct}%`} bg={pct === 100 ? "success.50" : "brand.50"} borderRadius="full" />
          </Flex>
          <Text fontSize="11px" color="grey.60" w="30px">{pct}%</Text>
        </Flex>
      );
    },
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
