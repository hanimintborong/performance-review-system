import { Flex, Input, Text } from "@chakra-ui/react";

import type { QuestionTypeMeta } from "@/constants/questionTypes";
import type { TemplateQuestion } from "@/types/template";

type QuestionTypeFieldsProps = {
  meta: QuestionTypeMeta;
  question: TemplateQuestion;
  onChange: (question: TemplateQuestion) => void;
};

export function QuestionTypeFields({ meta, question, onChange }: QuestionTypeFieldsProps) {
  return (
    <Flex gap="14px" align="center" pl="2px">
      {meta.hasWeightage && (
        <Flex align="center" gap="6px">
          <Text fontSize="11px" color="grey.60">
            {question.type === "okr_list" ? "Total weightage budget %" : "Weightage %"}
          </Text>
          <Input
            type="number"
            min={0}
            max={100}
            value={question.weightage ?? 0}
            onChange={(e) => onChange({ ...question, weightage: Number(e.target.value) })}
            bg="white"
            size="xs"
            w="70px"
          />
        </Flex>
      )}

      {meta.hasRatingScale && (
        <Flex align="center" gap="6px">
          <Text fontSize="11px" color="grey.60">Scale max</Text>
          <Input
            type="number"
            min={2}
            max={10}
            value={question.ratingScaleMax ?? 5}
            onChange={(e) => onChange({ ...question, ratingScaleMax: Number(e.target.value) })}
            bg="white"
            size="xs"
            w="60px"
          />
        </Flex>
      )}

      {meta.hasOptions && (
        <Flex align="center" gap="6px" flex="1">
          <Text fontSize="11px" color="grey.60" flexShrink="0">Options (comma-separated)</Text>
          <Input
            value={(question.options ?? []).join(", ")}
            onChange={(e) => onChange({ ...question, options: e.target.value.split(",").map((o) => o.trim()).filter(Boolean) })}
            bg="white"
            size="xs"
          />
        </Flex>
      )}
    </Flex>
  );
}
