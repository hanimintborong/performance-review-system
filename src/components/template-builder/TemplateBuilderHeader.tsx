import { Flex, Grid, Input, Text, Textarea } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { DepartmentCheckboxes } from "@/components/template-builder/DepartmentCheckboxes";
import { FIELD_STYLE } from "@/components/template-builder/fieldStyle";
import type { ReviewTemplate } from "@/types/template";

type TemplateBuilderHeaderProps = {
  template: ReviewTemplate;
  onChange: (template: ReviewTemplate) => void;
};

export function TemplateBuilderHeader({ template, onChange }: TemplateBuilderHeaderProps) {
  return (
    <AppCard p="18px 20px">
      <Grid templateColumns="1.1fr 1.4fr" gap="24px">
        <Flex direction="column" gap="12px">
          <Flex direction="column" gap="4px">
            <Text fontSize="12px" fontWeight="700" color="grey.70">Template title</Text>
            <Input
              value={template.title}
              onChange={(e) => onChange({ ...template, title: e.target.value })}
              placeholder="e.g. Mid-Year Review 2026"
              fontSize="14px"
              {...FIELD_STYLE}
            />
          </Flex>

          <Flex direction="column" gap="4px">
            <Text fontSize="12px" fontWeight="700" color="grey.70">Template description</Text>
            <Textarea
              value={template.description}
              onChange={(e) => onChange({ ...template, description: e.target.value })}
              placeholder="Briefly describe the purpose and scope of this template…"
              fontSize="13px"
              rows={3}
              py="10px"
              {...FIELD_STYLE}
            />
          </Flex>
        </Flex>

        <Flex direction="column" gap="8px">
          <Flex direction="column" gap="1px">
            <Text fontSize="12px" fontWeight="700" color="grey.70">Assigned departments</Text>
            <Text fontSize="11px" color="grey.50">Select the departments this template will be applied to.</Text>
          </Flex>
          <DepartmentCheckboxes
            selected={template.assignedDepartments}
            onChange={(assignedDepartments) => onChange({ ...template, assignedDepartments })}
          />
        </Flex>
      </Grid>
    </AppCard>
  );
}
