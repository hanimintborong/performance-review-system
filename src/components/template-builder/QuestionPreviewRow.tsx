"use client";

import { Badge, Flex, Icon, Text } from "@chakra-ui/react";
import { FiCircle, FiPaperclip } from "react-icons/fi";

import type { TemplateQuestion } from "@/types/template";

type QuestionPreviewRowProps = {
  question: TemplateQuestion;
};

export function QuestionPreviewRow({ question }: QuestionPreviewRowProps) {
  return (
    <Flex direction="column" gap="6px" py="10px" borderBottomWidth="1px" borderColor="grey.10">
      <Flex align="center" gap="8px">
        <Text fontSize="13px" color="grey.80">
          {question.text}
          {question.required && <Text as="span" color="error.50"> *</Text>}
        </Text>
        <Badge size="sm" bg="grey.10" color="grey.60">{question.respondent}</Badge>
        {question.weightage !== undefined && (
          <Badge size="sm" bg="brand.10" color="brand.70">{question.weightage}% weight</Badge>
        )}
      </Flex>

      <ResponsePreview question={question} />
    </Flex>
  );
}

function ResponsePreview({ question }: { question: TemplateQuestion }) {
  if (question.type === "rating_scale" || question.type === "core_value_rating") {
    return (
      <Flex gap="4px">
        {Array.from({ length: question.ratingScaleMax ?? 5 }).map((_, i) => (
          <Icon key={i} as={FiCircle} boxSize="14px" color="grey.30" />
        ))}
      </Flex>
    );
  }

  if (question.type === "dropdown") {
    return <Text fontSize="12px" color="grey.40">{question.options?.join(" · ") ?? "No options set"}</Text>;
  }

  if (question.type === "file_upload") {
    return (
      <Flex align="center" gap="6px" color="grey.40" fontSize="12px">
        <FiPaperclip size={13} /> Attach file
      </Flex>
    );
  }

  if (question.type === "long_text") {
    return <Flex h="46px" bg="grey.10" borderRadius="6px" />;
  }

  return <Flex h="28px" w="70%" bg="grey.10" borderRadius="6px" />;
}
