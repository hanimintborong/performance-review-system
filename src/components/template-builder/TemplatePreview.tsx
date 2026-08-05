import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { QuestionPreviewRow } from "@/components/template-builder/QuestionPreviewRow";
import type { TemplateSection } from "@/types/template";

type TemplatePreviewProps = {
  sections: TemplateSection[];
};

export function TemplatePreview({ sections }: TemplatePreviewProps) {
  return (
    <Flex direction="column" gap="12px">
      {sections.map((section, index) => (
        <AppCard key={section.sectionId} p="16px 20px">
          <Text fontSize="13px" fontWeight="700" color="brand.70">
            Section {String.fromCharCode(65 + index)}: {section.title}
          </Text>

          {section.description && (
            <Text fontSize="12px" color="grey.60" mt="2px">{section.description}</Text>
          )}

          <Flex direction="column" mt="8px">
            {section.questions.map((question) => (
              <QuestionPreviewRow key={question.questionId} question={question} />
            ))}
          </Flex>
        </AppCard>
      ))}
    </Flex>
  );
}
