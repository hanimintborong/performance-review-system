"use client";

import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { QuestionAnswerField } from "@/components/review-form/QuestionAnswerField";
import type { Respondent, TemplateSection } from "@/types/template";

type ReviewFormSectionProps = {
  section: TemplateSection;
  answers: Record<string, string>;
  onAnswerChange?: (questionId: string, value: string) => void;
  editableRespondent?: Respondent;
};

export function ReviewFormSection({ section, answers, onAnswerChange, editableRespondent }: ReviewFormSectionProps) {
  return (
    <AppCard p="16px 20px">
      <Text fontSize="14px" fontWeight="700" color="brand.70" mb="2px">{section.title}</Text>
      {section.description && <Text fontSize="12px" color="grey.60" mb="10px">{section.description}</Text>}

      <Flex direction="column" gap="14px" mt="10px">
        {section.questions.map((question) => {
          const editable = editableRespondent === question.respondent;
          return (
            <QuestionAnswerField
              key={question.questionId}
              question={question}
              value={answers[question.questionId] ?? ""}
              readOnly={!editable}
              onChange={editable ? (v) => onAnswerChange?.(question.questionId, v) : undefined}
            />
          );
        })}
      </Flex>
    </AppCard>
  );
}
