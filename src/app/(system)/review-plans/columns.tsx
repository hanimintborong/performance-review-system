import NextLink from "next/link";

import { Flex, Menu, Portal, Text } from "@chakra-ui/react";
import { FiArchive, FiCopy, FiEdit3, FiMoreHorizontal, FiPlay, FiTrash2 } from "react-icons/fi";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { MenuAction } from "@/components/common/MenuAction";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PLAN_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewPlanRow } from "@/data/queries";

type PlanColumnsOptions = {
  onEdit: (plan: ReviewPlanRow) => void;
  onDuplicate: (plan: ReviewPlanRow) => void;
  onToggleStatus: (plan: ReviewPlanRow) => void;
  onDelete: (plan: ReviewPlanRow) => void;
};

export const getPlanColumns = (
  { onEdit, onDuplicate, onToggleStatus, onDelete }: PlanColumnsOptions,
): DataTableColumn<ReviewPlanRow>[] => [
  {
    key: "title",
    label: "Cycle",
    width: "1.8fr",
    render: (plan) => (
      <Flex direction="column">
        <Text fontSize="13px" fontWeight="600" color="grey.80">{plan.title}</Text>
        <Text fontSize="11px" color="grey.60">{plan.reviewPeriod}</Text>
      </Flex>
    ),
  },
  { key: "template", label: "Template", width: "1.2fr", render: (plan) => plan.templateTitle },
  { key: "participants", label: "Participants", width: "110px", render: (plan) => plan.participantCount },
  {
    key: "status",
    label: "Status",
    width: "120px",
    render: (plan) => <StatusBadge label={plan.status} style={PLAN_STATUS_STYLE[plan.status]} />,
  },
  {
    key: "action",
    label: "",
    width: "170px",
    align: "right",
    render: (plan) => (
      <Flex justify="flex-end" gap="8px">
        <NextLink href={`/review-plans/${plan.planId}`}>
          <SecondaryButton h="30px" px="12px">View</SecondaryButton>
        </NextLink>

        <Menu.Root>
          <Menu.Trigger asChild>
            <SecondaryButton h="30px" px="8px" aria-label="More actions"><FiMoreHorizontal /></SecondaryButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content
                fontSize="13px"
                minW="170px"
                borderRadius="10px"
                borderWidth="1px"
                borderColor="grey.20"
                boxShadow="0 10px 28px rgba(20,16,40,0.14)"
                p="6px"
              >
                <MenuAction icon={<FiEdit3 size={14} />} onSelect={() => onEdit(plan)} value="edit">Edit</MenuAction>
                <MenuAction icon={<FiCopy size={14} />} onSelect={() => onDuplicate(plan)} value="duplicate">Duplicate</MenuAction>
                <MenuAction
                  icon={plan.status === "Archived" ? <FiPlay size={14} /> : <FiArchive size={14} />}
                  onSelect={() => onToggleStatus(plan)}
                  value="toggle"
                >
                  {plan.status === "Archived" ? "Activate" : "Archive"}
                </MenuAction>
                <Menu.Separator my="4px" borderColor="grey.20" />
                <MenuAction icon={<FiTrash2 size={14} />} onSelect={() => onDelete(plan)} value="delete" tone="danger">
                  Delete
                </MenuAction>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    ),
  },
];
