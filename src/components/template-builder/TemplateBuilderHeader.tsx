import { Flex, Input, Text, Textarea } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { DepartmentCheckboxes } from "@/components/template-builder/DepartmentCheckboxes";
import type { ReviewTemplate } from "@/types/template";

type TemplateBuilderHeaderProps = {
  template: ReviewTemplate;
  onChange: (template: ReviewTemplate) => void;
};

export function TemplateBuilderHeader({ template, onChange }: TemplateBuilderHeaderProps) {
  return (
    <AppCard p="16px 20px">
      <Flex direction="column" gap="10px">
        <Input
          value={template.title}
          onChange={(e) => onChange({ ...template, title: e.target.value })}
          placeholder="Template title"
          fontSize="17px"
          fontWeight="700"
          border="none"
          px="0"
          _focus={{ boxShadow: "none" }}
        />
        <Textarea
          value={template.description}
          onChange={(e) => onChange({ ...template, description: e.target.value })}
          placeholder="Template description"
          fontSize="13px"
          rows={2}
        />
        <Text fontSize="11px" fontWeight="700" color="grey.60">Assigned departments</Text>
        <DepartmentCheckboxes
          selected={template.assignedDepartments}
          onChange={(assignedDepartments) => onChange({ ...template, assignedDepartments })}
        />
      </Flex>
    </AppCard>
  );
}
