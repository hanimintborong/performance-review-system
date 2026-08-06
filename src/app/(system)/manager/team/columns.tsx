import NextLink from "next/link";
import { Flex, Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewRow } from "@/data/queries";

const WAITING = ["Not Started", "Self-Assessment In Progress", "Overdue"];

function actionLabel(status: ReviewRow["status"]) {
  if (WAITING.includes(status)) return "Send reminder";
  if (status === "Employee Submitted") return "Evaluate";
  if (status === "Manager Reviewing") return "Continue Evaluation";
  return "View Result";
}

export const teamColumns: DataTableColumn<ReviewRow>[] = [
  {
    key: "employee",
    label: "Employee",
    width: "1.8fr",
    render: (row) => (
      <Flex align="center" gap="10px">
        <UserAvatar initials={row.employee.initials} />
        <Flex direction="column">
          <Text fontSize="13px" fontWeight="600" color="grey.80">{row.employee.name}</Text>
          <Text fontSize="11px" color="grey.60">{row.employee.jobTitle}</Text>
        </Flex>
      </Flex>
    ),
  },
  { key: "department", label: "Department", width: "1.1fr", render: (row) => row.employee.department },
  { key: "deadline", label: "Deadline", width: "100px", render: (row) => row.deadline },
  {
    key: "status",
    label: "Status",
    width: "170px",
    render: (row) => <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />,
  },
  { key: "score", label: "Score", width: "70px", render: (row) => row.employeeScore?.toFixed(1) ?? "—" },
  {
    key: "action",
    label: "",
    width: "150px",
    align: "right",
    render: (row) => {
      const label = actionLabel(row.status);
      if (label === "Send reminder") {
        return <SecondaryButton h="30px" px="12px" disabled>Send reminder</SecondaryButton>;
      }
      return (
        <NextLink href={`/manager/reviews/${row.assignmentId}`}>
          <SecondaryButton h="30px" px="12px">{label}</SecondaryButton>
        </NextLink>
      );
    },
  },
];
