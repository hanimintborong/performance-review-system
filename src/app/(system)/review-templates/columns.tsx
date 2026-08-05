import NextLink from "next/link";

import { Flex, Menu, Portal, Text } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { TEMPLATE_STATUS_STYLE } from "@/constants/statusColors";
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
      <Flex direction="column">
        <Text fontSize="13px" fontWeight="600" color="grey.80">{template.title}</Text>
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
              <Menu.Content fontSize="13px" minW="160px">
                <Menu.Item value="edit" onSelect={() => onEdit(template)}>Edit</Menu.Item>
                <Menu.Item value="duplicate" onSelect={() => onDuplicate(template)}>Duplicate</Menu.Item>
                <Menu.Item value="toggle" onSelect={() => onToggleStatus(template)}>
                  {template.status === "Active" ? "Deactivate" : "Activate"}
                </Menu.Item>
                <Menu.Item value="delete" color="error.70" onSelect={() => onDelete(template)}>Delete</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    ),
  },
];
