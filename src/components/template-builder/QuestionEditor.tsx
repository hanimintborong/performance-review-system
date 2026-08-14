import type { ReactNode } from "react";
import { Flex, IconButton, Input, NativeSelect, Switch, Text } from "@chakra-ui/react";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";

import { FIELD_STYLE } from "@/components/template-builder/fieldStyle";
import { QuestionTypeFields } from "@/components/template-builder/QuestionTypeFields";
import { SELECTABLE_QUESTION_TYPES, getQuestionTypeMeta } from "@/constants/questionTypes";
import { getWorkflowPreset } from "@/constants/workflowPresets";
import { MULTI_RESPONDENT_QUESTION_TYPES, type QuestionType, type Respondent, type TemplateQuestion, type WorkflowType } from "@/types/template";

type QuestionEditorProps = {
  question: TemplateQuestion;
  number: string;
  workflowType: WorkflowType;
  onChange: (question: TemplateQuestion) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
};

const RESPONDENT_LABEL: Record<Respondent, string> = { employee: "Employee", manager: "Manager" };

export function QuestionEditor({ question, number, workflowType, onChange, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: QuestionEditorProps) {
  const meta = getQuestionTypeMeta(question.type);
  const preset = getWorkflowPreset(workflowType);
  const selectableTypes = SELECTABLE_QUESTION_TYPES.filter((t) => !preset.excludedQuestionTypes.includes(t.value));
  // Grandfather in the question's current type even if it's since been retired from new selection (e.g. legacy "core_value_rating"),
  // so its own dropdown still displays correctly instead of silently mismatching.
  const availableTypes = selectableTypes.some((t) => t.value === question.type) ? selectableTypes : [...selectableTypes, meta];
  const isMultiRespondent = MULTI_RESPONDENT_QUESTION_TYPES.includes(question.type);

  return (
    <Flex gap="10px" align="start" p="12px" bg="grey.10" borderRadius="8px">
      <Flex w="22px" h="22px" borderRadius="full" bg="brand.20" color="brand.70" align="center" justify="center" fontSize="10px" fontWeight="700" flexShrink="0" mt="20px">
        {number}
      </Flex>

      <Flex direction="column" gap="8px" flex="1">
        <Flex gap="10px" align="end" flexWrap="wrap">
          <Field label="Question text" flex="2" minW="200px">
            <Input
              value={question.text}
              onChange={(e) => onChange({ ...question, text: e.target.value })}
              placeholder="Enter your question here…"
              bg="white"
              fontSize="13px"
              {...FIELD_STYLE}
            />
          </Field>

          <Field label="Question type" minW="150px">
            <NativeSelect.Root size="sm">
              <NativeSelect.Field
                value={question.type}
                onChange={(e) => onChange({ ...question, type: e.target.value as QuestionType })}
                bg="white"
                fontSize="12px"
                {...FIELD_STYLE}
              >
                {availableTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field>

          <Field label="Answered by" minW="100px">
            {isMultiRespondent ? (
              <StaticRespondentLabel text="Employee + Manager" />
            ) : preset.allowedRespondents.length > 1 ? (
              <NativeSelect.Root size="sm">
                <NativeSelect.Field
                  value={question.respondent}
                  onChange={(e) => onChange({ ...question, respondent: e.target.value as Respondent })}
                  bg="white"
                  fontSize="12px"
                  {...FIELD_STYLE}
                >
                  {preset.allowedRespondents.map((r) => <option key={r} value={r}>{RESPONDENT_LABEL[r]}</option>)}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            ) : (
              <StaticRespondentLabel text={RESPONDENT_LABEL[preset.allowedRespondents[0]]} />
            )}
          </Field>

          <Switch.Root checked={question.required} onCheckedChange={(e) => onChange({ ...question, required: e.checked })} size="sm">
            <Switch.HiddenInput />
            <Switch.Control><Switch.Thumb /></Switch.Control>
            <Switch.Label fontSize="11px" color="grey.60">Required</Switch.Label>
          </Switch.Root>

          <Flex gap="2px" mb="2px">
            <IconButton aria-label="Move up" size="xs" variant="ghost" onClick={onMoveUp} disabled={isFirst}><FiArrowUp /></IconButton>
            <IconButton aria-label="Move down" size="xs" variant="ghost" onClick={onMoveDown} disabled={isLast}><FiArrowDown /></IconButton>
            <IconButton aria-label="Delete question" size="xs" variant="ghost" color="error.70" onClick={onDelete}><FiTrash2 /></IconButton>
          </Flex>
        </Flex>

        {(meta.hasWeightage || meta.hasRatingScale || meta.hasOptions) && (
          <QuestionTypeFields meta={meta} question={question} onChange={onChange} />
        )}
      </Flex>
    </Flex>
  );
}

function StaticRespondentLabel({ text }: { text: string }) {
  return <Text fontSize="12px" fontWeight="600" color="grey.60" h="32px" display="flex" alignItems="center">{text}</Text>;
}

function Field({ label, children, flex, minW }: { label: string; children: ReactNode; flex?: string; minW?: string }) {
  return (
    <Flex direction="column" gap="4px" flex={flex} minW={minW}>
      <Text fontSize="10px" fontWeight="700" color="grey.60" textTransform="uppercase" letterSpacing="0.02em">{label}</Text>
      {children}
    </Flex>
  );
}
