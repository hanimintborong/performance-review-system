import NextLink from "next/link";
import { Flex, Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewRow } from "@/data/queries";

export const selfAssessmentColumns: DataTableColumn<ReviewRow>[] = [
  {
    key: "plan",
    label: "Review period",
    width: "1.8fr",
    render: (row) => (
      <Flex direction="column">
        <Text fontWeight="600">{row.planTitle}</Text>
        <Text fontSize="11px" color="grey.50">Deadline: {row.deadline}</Text>
      </Flex>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "220px",
    render: (row) => <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />,
  },
  {
    key: "action",
    label: "",
    width: "120px",
    align: "right",
    render: (row) => (
      <NextLink href={`/employee/evaluation/${row.assignmentId}`}>
        <PrimaryButton h="34px" px="14px">{row.status === "Not Started" ? "Start" : "Continue"}</PrimaryButton>
      </NextLink>
    ),
  },
];
