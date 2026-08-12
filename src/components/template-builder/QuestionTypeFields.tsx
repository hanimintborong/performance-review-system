import { Flex, NumberInput, Text } from "@chakra-ui/react";

import { OptionsListEditor } from "@/components/template-builder/OptionsListEditor";
import type { QuestionTypeMeta } from "@/constants/questionTypes";
import type { TemplateQuestion } from "@/types/template";

type QuestionTypeFieldsProps = {
  meta: QuestionTypeMeta;
  question: TemplateQuestion;
  onChange: (question: TemplateQuestion) => void;
};

export function QuestionTypeFields({ meta, question, onChange }: QuestionTypeFieldsProps) {
  return (
    <Flex gap="18px" align="start" pl="2px" flexWrap="wrap">
      {meta.hasWeightage && (
        <Flex direction="column" gap="4px">
          <Text fontSize="11px" color="grey.60">
            {question.type === "okr_list" ? "Total weightage budget %" : "Weightage %"}
          </Text>
          <NumberInput.Root
            value={String(question.weightage ?? 0)}
            min={0}
            max={100}
            onValueChange={(e) => onChange({ ...question, weightage: Number.isNaN(e.valueAsNumber) ? 0 : e.valueAsNumber })}
            size="xs"
            w="90px"
          >
            <NumberInput.Input bg="white" ps="10px" />
            <NumberInput.Control>
              <NumberInput.IncrementTrigger />
              <NumberInput.DecrementTrigger />
            </NumberInput.Control>
          </NumberInput.Root>
        </Flex>
      )}

      {meta.hasRatingScale && (
        <Flex direction="column" gap="4px">
          <Text fontSize="11px" color="grey.60">Scale max</Text>
          <NumberInput.Root
            value={String(question.ratingScaleMax ?? 5)}
            min={2}
            max={10}
            onValueChange={(e) => onChange({ ...question, ratingScaleMax: Number.isNaN(e.valueAsNumber) ? 5 : e.valueAsNumber })}
            size="xs"
            w="80px"
          >
            <NumberInput.Input bg="white" ps="10px" />
            <NumberInput.Control>
              <NumberInput.IncrementTrigger />
              <NumberInput.DecrementTrigger />
            </NumberInput.Control>
          </NumberInput.Root>
        </Flex>
      )}

      {meta.hasOptions && (
        <OptionsListEditor
          options={question.options ?? []}
          onChange={(options) => onChange({ ...question, options })}
        />
      )}
    </Flex>
  );
}
