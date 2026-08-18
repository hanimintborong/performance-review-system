import { Checkbox, Flex, Grid, Input, Text, Textarea } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { DepartmentCheckboxes } from "@/components/template-builder/DepartmentCheckboxes";
import { FIELD_STYLE } from "@/components/template-builder/fieldStyle";
import { WorkflowPresetPicker } from "@/components/template-builder/WorkflowPresetPicker";
import type { ReviewTemplate, WorkflowType } from "@/types/template";

type TemplateBuilderHeaderProps = {
  template: ReviewTemplate;
  onChange: (template: ReviewTemplate) => void;
  onWorkflowChange: (workflowType: WorkflowType) => void;
  workflowLocked?: boolean;
};

export function TemplateBuilderHeader({ template, onChange, onWorkflowChange, workflowLocked }: TemplateBuilderHeaderProps) {
  return (
    <AppCard p="18px 20px">
      <Flex direction="column" gap="6px" mb="16px">
        <Flex direction="column" gap="1px">
          <Text fontSize="12px" fontWeight="700" color="grey.70">Evaluation workflow</Text>
          <Text fontSize="11px" color="grey.50">
            {workflowLocked
              ? "This template is already in use by a review cycle — workflow can't be changed."
              : "Decide what happens after each stage submits. This affects which question types and respondents are available below."}
          </Text>
        </Flex>
        <WorkflowPresetPicker value={template.workflowType} onChange={onWorkflowChange} locked={workflowLocked} />
      </Flex>

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

          <Checkbox.Root
            size="sm"
            checked={template.isMasterTemplate}
            onCheckedChange={(e) => onChange({ ...template, isMasterTemplate: e.checked === true })}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
            <Checkbox.Label fontSize="12px" fontWeight="700" color="orange.70">Mark as Master Template</Checkbox.Label>
          </Checkbox.Root>
          {template.isMasterTemplate && (
            <Text fontSize="11px" color="grey.50">
              Only one master template can exist — marking this one unmarks any other on save. HR should build new templates by opening this one and using &ldquo;Save as new template&rdquo; instead of editing it directly.
            </Text>
          )}

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
