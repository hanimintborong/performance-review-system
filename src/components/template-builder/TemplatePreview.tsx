import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { EmptyState } from "@/components/common/EmptyState";
import { ReviewFormSection } from "@/components/review-form/ReviewFormSection";
import { getWorkflowPreset } from "@/constants/workflowPresets";
import type { TemplateSection, WorkflowType } from "@/types/template";

type TemplatePreviewProps = {
  sections: TemplateSection[];
  workflowType: WorkflowType;
};

export function TemplatePreview({ sections, workflowType }: TemplatePreviewProps) {
  const preset = getWorkflowPreset(workflowType);

  if (sections.length === 0) {
    return <EmptyState message="Add a section in Edit template to see the preview here." />;
  }

  return (
    <Flex direction="column" gap="16px">
      <AppCard p="14px 18px" bg="brand.10" borderColor="brand.20">
        <Text fontSize="12px" fontWeight="700" color="brand.70">{preset.label}</Text>
        <Text fontSize="11px" color="brand.70" mt="1px">{preset.description}</Text>
      </AppCard>

      {sections.map((section, index) => (
        <Flex key={section.sectionId} direction="column" gap="8px">
          <Flex align="center" gap="8px">
            <Flex w="22px" h="22px" borderRadius="full" bg="brand.50" color="white" align="center" justify="center" fontSize="11px" fontWeight="700" flexShrink="0">
              {index + 1}
            </Flex>
            <Text fontSize="11px" fontWeight="700" color="grey.50" textTransform="uppercase" letterSpacing="0.03em">
              Section {index + 1} of {sections.length}
            </Text>
          </Flex>

          <ReviewFormSection section={section} answers={{}} previewMode />
        </Flex>
      ))}
    </Flex>
  );
}
