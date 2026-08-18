"use client";

import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { QuestionAnswerField } from "@/components/review-form/QuestionAnswerField";
import { MULTI_RESPONDENT_QUESTION_TYPES, type Respondent, type TemplateSection } from "@/types/template";

type ReviewFormSectionProps = {
  section: TemplateSection;
  answers: Record<string, string>;
  onAnswerChange?: (questionId: string, value: string) => void;
  editableRespondent?: Respondent;
  hideRespondent?: Respondent;
  previewMode?: boolean;
};

export function ReviewFormSection({ section, answers, onAnswerChange, editableRespondent, hideRespondent, previewMode }: ReviewFormSectionProps) {
  const visibleQuestions = section.questions.filter((question) => (
    hideRespondent === undefined
    || MULTI_RESPONDENT_QUESTION_TYPES.includes(question.type)
    || question.respondent !== hideRespondent
  ));

  if (visibleQuestions.length === 0) return null;

  return (
    <AppCard p="16px 20px">
      <Text fontSize="14px" fontWeight="700" color="brand.70" mb="2px">{section.title}</Text>
      {section.description && <Text fontSize="12px" color="grey.60" mb="10px">{section.description}</Text>}

      <Flex direction="column" gap="10px" mt="10px" p="10px" bg="grey.10" borderRadius="10px">
        {visibleQuestions.map((question) => {
          const isMultiRespondent = MULTI_RESPONDENT_QUESTION_TYPES.includes(question.type);
          const editable = previewMode || (isMultiRespondent ? Boolean(editableRespondent) : editableRespondent === question.respondent);
          return (
            <Flex
              key={question.questionId}
              direction="column"
              gap="6px"
              pt="14px"
              pb="14px"
              pl="20px"
              pr="16px"
              bg="white"
              borderWidth="1px"
              borderLeftWidth="3px"
              borderColor="grey.20"
              borderLeftColor="brand.30"
              borderRadius="8px"
              boxShadow="0 1px 2px rgba(0,0,0,0.05)"
            >
              <QuestionAnswerField
                question={question}
                value={answers[question.questionId] ?? ""}
                readOnly={!editable}
                editableRespondent={isMultiRespondent ? (editableRespondent ?? (previewMode ? "employee" : undefined)) : undefined}
                sectionWeightage={section.weightage}
                onChange={editable ? (v) => onAnswerChange?.(question.questionId, v) : undefined}
              />
            </Flex>
          );
        })}
      </Flex>
    </AppCard>
  );
}
