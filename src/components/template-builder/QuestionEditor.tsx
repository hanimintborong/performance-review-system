import { Flex, IconButton, Input, NativeSelect, Switch } from "@chakra-ui/react";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";

import { QuestionTypeFields } from "@/components/template-builder/QuestionTypeFields";
import { QUESTION_TYPES, getQuestionTypeMeta } from "@/constants/questionTypes";
import type { QuestionType, Respondent, TemplateQuestion } from "@/types/template";

type QuestionEditorProps = {
  question: TemplateQuestion;
  onChange: (question: TemplateQuestion) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export function QuestionEditor({ question, onChange, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: QuestionEditorProps) {
  const meta = getQuestionTypeMeta(question.type);

  return (
    <Flex direction="column" gap="8px" p="12px" bg="grey.10" borderRadius="8px">
      <Flex gap="8px" align="center">
        <Input
          value={question.text}
          onChange={(e) => onChange({ ...question, text: e.target.value })}
          placeholder="Question text"
          bg="white"
          fontSize="13px"
          flex="1"
        />

        <NativeSelect.Root w="170px" size="sm">
          <NativeSelect.Field
            value={question.type}
            onChange={(e) => onChange({ ...question, type: e.target.value as QuestionType })}
            bg="white"
            fontSize="12px"
          >
            {QUESTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        <NativeSelect.Root w="110px" size="sm">
          <NativeSelect.Field
            value={question.respondent}
            onChange={(e) => onChange({ ...question, respondent: e.target.value as Respondent })}
            bg="white"
            fontSize="12px"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        <Switch.Root
          checked={question.required}
          onCheckedChange={(e) => onChange({ ...question, required: e.checked })}
          size="sm"
        >
          <Switch.HiddenInput />
          <Switch.Control><Switch.Thumb /></Switch.Control>
          <Switch.Label fontSize="11px" color="grey.60">Required</Switch.Label>
        </Switch.Root>

        <IconButton aria-label="Move up" size="xs" variant="ghost" onClick={onMoveUp} disabled={isFirst}><FiArrowUp /></IconButton>
        <IconButton aria-label="Move down" size="xs" variant="ghost" onClick={onMoveDown} disabled={isLast}><FiArrowDown /></IconButton>
        <IconButton aria-label="Delete question" size="xs" variant="ghost" color="error.70" onClick={onDelete}><FiTrash2 /></IconButton>
      </Flex>

      {(meta.hasWeightage || meta.hasRatingScale || meta.hasOptions) && (
        <QuestionTypeFields meta={meta} question={question} onChange={onChange} />
      )}
    </Flex>
  );
}
