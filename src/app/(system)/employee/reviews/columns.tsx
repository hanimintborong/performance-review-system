import NextLink from "next/link";
import { Flex, Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { ScoreBadge } from "@/components/common/ScoreBadge";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewRow } from "@/data/queries";

const STILL_OPEN = ["Not Started", "Self-Assessment In Progress", "Overdue"];

export const employeeReviewColumns: DataTableColumn<ReviewRow>[] = [
  {
    key: "plan",
    label: "Review period",
    width: "1.6fr",
    render: (row) => (
      <Flex direction="column">
        <Text fontWeight="600">{row.planTitle}</Text>
        <Text fontSize="11px" color="grey.50">Deadline: {row.deadline}</Text>
      </Flex>
    ),
  },
  { key: "manager", label: "Reviewer", width: "150px", render: (row) => row.managerName },
  {
    key: "status",
    label: "Status",
    width: "190px",
    render: (row) => <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />,
  },
  { key: "score", label: "Score", width: "100px", render: (row) => <ScoreBadge score={row.employeeScore} /> },
  {
    key: "action",
    label: "",
    width: "110px",
    align: "right",
    render: (row) => {
      const open = STILL_OPEN.includes(row.status);
      const href = open ? `/employee/evaluation/${row.assignmentId}` : `/employee/reviews/${row.assignmentId}`;
      const label = open ? (row.status === "Not Started" ? "Start" : "Continue") : "View";

      return (
        <NextLink href={href}>
          <SecondaryButton h="30px" px="12px">{label}</SecondaryButton>
        </NextLink>
      );
    },
  },
];
