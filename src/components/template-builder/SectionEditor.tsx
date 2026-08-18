"use client";

import { useState } from "react";
import { Flex, IconButton, Input, Textarea } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp, FiPlus, FiTrash2 } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import { FIELD_STYLE } from "@/components/template-builder/fieldStyle";
import { QuestionEditor } from "@/components/template-builder/QuestionEditor";
import { newQuestion } from "@/components/template-builder/newQuestion";
import type { TemplateQuestion, TemplateSection, WorkflowType } from "@/types/template";

type SectionEditorProps = {
  section: TemplateSection;
  index: number;
  workflowType: WorkflowType;
  onChange: (section: TemplateSection) => void;
  onDelete: () => void;
};

export function SectionEditor({ section, index, workflowType, onChange, onDelete }: SectionEditorProps) {
  const [collapsed, setCollapsed] = useState(false);

  function updateQuestion(updated: TemplateQuestion, questionIndex: number) {
    const questions = section.questions.map((q, i) => (i === questionIndex ? updated : q));
    onChange({ ...section, questions });
  }

  function moveQuestion(from: number, to: number) {
    if (to < 0 || to >= section.questions.length) return;
    const questions = [...section.questions];
    [questions[from], questions[to]] = [questions[to], questions[from]];
    onChange({ ...section, questions });
  }

  function deleteQuestion(questionIndex: number) {
    onChange({ ...section, questions: section.questions.filter((_, i) => i !== questionIndex) });
  }

  return (
    <AppCard p="16px 20px">
      <Flex gap="10px" align="start">
        <Flex w="24px" h="24px" borderRadius="full" bg="brand.50" color="white" align="center" justify="center" fontSize="12px" fontWeight="700" flexShrink="0" mt="2px">
          {index + 1}
        </Flex>

        <Flex direction="column" gap="6px" flex="1">
          <Input
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
            placeholder={`Section ${String.fromCharCode(65 + index)} title`}
            fontSize="14px"
            fontWeight="700"
            {...FIELD_STYLE}
          />
          {!collapsed && (
            <Textarea
              value={section.description ?? ""}
              onChange={(e) => onChange({ ...section, description: e.target.value })}
              placeholder="Section description (optional)"
              fontSize="12px"
              rows={1}
              py="8px"
              {...FIELD_STYLE}
            />
          )}
        </Flex>

        <Flex direction="column" gap="4px" flexShrink="0" w="110px">
          <Input
            value={section.weightage ?? ""}
            onChange={(e) => onChange({ ...section, weightage: e.target.value === "" ? undefined : Number(e.target.value) })}
            placeholder="Weightage %"
            type="number"
            fontSize="12px"
            textAlign="center"
            {...FIELD_STYLE}
          />
        </Flex>

        <IconButton aria-label={collapsed ? "Expand section" : "Collapse section"} variant="ghost" color="grey.60" onClick={() => setCollapsed((c) => !c)}>
          {collapsed ? <FiChevronDown /> : <FiChevronUp />}
        </IconButton>
        <IconButton aria-label="Delete section" variant="ghost" color="error.70" onClick={onDelete}><FiTrash2 /></IconButton>
      </Flex>

      {!collapsed && (
        <>
          <Flex direction="column" gap="8px" mt="10px">
            {section.questions.map((question, i) => (
              <QuestionEditor
                key={question.questionId}
                question={question}
                number={`${index + 1}.${i + 1}`}
                workflowType={workflowType}
                onChange={(updated) => updateQuestion(updated, i)}
                onDelete={() => deleteQuestion(i)}
                onMoveUp={() => moveQuestion(i, i - 1)}
                onMoveDown={() => moveQuestion(i, i + 1)}
                isFirst={i === 0}
                isLast={i === section.questions.length - 1}
              />
            ))}
          </Flex>

          <Flex
            as="button"
            align="center"
            justify="center"
            gap="8px"
            h="38px"
            mt="10px"
            w="100%"
            borderWidth="1px"
            borderStyle="dashed"
            borderColor="grey.30"
            borderRadius="8px"
            color="brand.50"
            fontSize="12px"
            fontWeight="700"
            cursor="pointer"
            onClick={() => onChange({ ...section, questions: [...section.questions, newQuestion(section.sectionId)] })}
          >
            <FiPlus /> Add question
          </Flex>
        </>
      )}
    </AppCard>
  );
}
