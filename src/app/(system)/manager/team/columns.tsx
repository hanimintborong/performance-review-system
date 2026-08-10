import { Flex, Text } from "@chakra-ui/react";

import { TeamRowActions } from "@/app/(system)/manager/team/TeamRowActions";
import type { DataTableColumn } from "@/components/common/DataTableRow";
import { StatusBadge } from "@/components/common/StatusBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewRow } from "@/data/queries";
import { deadlineLabel } from "@/lib/deadlineLabel";
import { STATUS_PROGRESS } from "@/lib/teamProgressStats";

const WAITING = ["Not Started", "Self-Assessment", "Overdue"];

function actionLabel(status: ReviewRow["status"]) {
  if (WAITING.includes(status)) return "Send reminder";
  if (status === "Employee Submitted") return "Evaluate";
  if (status === "Manager Reviewing") return "Continue Evaluation";
  return "View Result";
}

type TeamColumnsOptions = {
  onSendReminder: (row: ReviewRow) => void;
  isSending: (assignmentId: string) => boolean;
};

export const getTeamColumns = ({ onSendReminder, isSending }: TeamColumnsOptions): DataTableColumn<ReviewRow>[] => [
  {
    key: "employee",
    label: "Employee",
    width: "1.6fr",
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
  { key: "department", label: "Department", width: "0.9fr", render: (row) => row.employee.department },
  {
    key: "deadline",
    label: "Deadline",
    width: "110px",
    render: (row) => (
      <Flex direction="column">
        <Text>{row.deadline}</Text>
        <Text fontSize="10px" color={row.status === "Overdue" ? "error.60" : "grey.40"}>{deadlineLabel(row.deadline, row.status)}</Text>
      </Flex>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "150px",
    render: (row) => <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />,
  },
  {
    key: "progress",
    label: "Progress",
    width: "130px",
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
  {
    key: "lastUpdated",
    label: "Last updated",
    width: "110px",
    render: (row) => row.finalizedAt ? row.finalizedAt.slice(0, 10) : "—",
  },
  {
    key: "action",
    label: "",
    width: "190px",
    align: "right",
    render: (row) => (
      <TeamRowActions
        row={row}
        label={actionLabel(row.status)}
        isSending={isSending(row.assignmentId)}
        onSendReminder={() => onSendReminder(row)}
      />
    ),
  },
];
