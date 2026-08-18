import NextLink from "next/link";

import { Flex, Menu, Portal, Text } from "@chakra-ui/react";
import { FiCopy, FiEdit3, FiMoreHorizontal, FiPause, FiPlay, FiTrash2 } from "react-icons/fi";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { MenuAction } from "@/components/common/MenuAction";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MASTER_TEMPLATE_BADGE_STYLE, TEMPLATE_STATUS_STYLE } from "@/constants/statusColors";
import { countQuestions, countSections, type ReviewTemplate } from "@/types/template";

type TemplateColumnsOptions = {
  onToggleStatus: (template: ReviewTemplate) => void;
  onDuplicate: (template: ReviewTemplate) => void;
  onEdit: (template: ReviewTemplate) => void;
  onDelete: (template: ReviewTemplate) => void;
};

export const getTemplateColumns = (
  { onToggleStatus, onDuplicate, onEdit, onDelete }: TemplateColumnsOptions,
): DataTableColumn<ReviewTemplate>[] => [
  {
    key: "title",
    label: "Template",
    width: "1.8fr",
    render: (template) => (
      <Flex direction="column" gap="4px">
        <Flex align="center" gap="8px">
          <Text fontSize="13px" fontWeight="600" color="grey.80">{template.title}</Text>
          {template.isMasterTemplate && <StatusBadge label="Master" style={MASTER_TEMPLATE_BADGE_STYLE} />}
        </Flex>
        <Text fontSize="11px" color="grey.60">{template.description}</Text>
      </Flex>
    ),
  },
  { key: "sections", label: "Sections", width: "90px", render: (t) => countSections(t) },
  { key: "questions", label: "Questions", width: "90px", render: (t) => countQuestions(t) },
  { key: "departments", label: "Assigned to", width: "1.2fr", render: (t) => t.assignedDepartments.join(", ") },
  {
    key: "status",
    label: "Status",
    width: "100px",
    render: (t) => <StatusBadge label={t.status} style={TEMPLATE_STATUS_STYLE[t.status]} />,
  },
  {
    key: "action",
    label: "",
    width: "170px",
    align: "right",
    render: (template) => (
      <Flex justify="flex-end" gap="8px">
        <NextLink href={`/review-templates/${template.templateId}`}>
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
                <MenuAction icon={<FiEdit3 size={14} />} onSelect={() => onEdit(template)} value="edit">Edit</MenuAction>
                <MenuAction icon={<FiCopy size={14} />} onSelect={() => onDuplicate(template)} value="duplicate">Duplicate</MenuAction>
                <MenuAction
                  icon={template.status === "Active" ? <FiPause size={14} /> : <FiPlay size={14} />}
                  onSelect={() => onToggleStatus(template)}
                  value="toggle"
                >
                  {template.status === "Active" ? "Deactivate" : "Activate"}
                </MenuAction>
                <Menu.Separator my="4px" borderColor="grey.20" />
                <MenuAction icon={<FiTrash2 size={14} />} onSelect={() => onDelete(template)} value="delete" tone="danger">
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
