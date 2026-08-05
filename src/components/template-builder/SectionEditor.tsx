import { Flex, IconButton, Input, Textarea } from "@chakra-ui/react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { QuestionEditor } from "@/components/template-builder/QuestionEditor";
import { newQuestion } from "@/components/template-builder/newQuestion";
import type { TemplateQuestion, TemplateSection } from "@/types/template";

type SectionEditorProps = {
  section: TemplateSection;
  index: number;
  onChange: (section: TemplateSection) => void;
  onDelete: () => void;
};

export function SectionEditor({ section, index, onChange, onDelete }: SectionEditorProps) {
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
      <Flex gap="10px" align="start" mb="10px">
        <Flex direction="column" gap="6px" flex="1">
          <Input
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
            placeholder={`Section ${String.fromCharCode(65 + index)} title`}
            fontSize="14px"
            fontWeight="700"
          />
          <Textarea
            value={section.description ?? ""}
            onChange={(e) => onChange({ ...section, description: e.target.value })}
            placeholder="Section description (optional)"
            fontSize="12px"
            rows={1}
          />
        </Flex>

        <IconButton aria-label="Delete section" variant="ghost" color="error.70" onClick={onDelete}><FiTrash2 /></IconButton>
      </Flex>

      <Flex direction="column" gap="8px">
        {section.questions.map((question, i) => (
          <QuestionEditor
            key={question.questionId}
            question={question}
            onChange={(updated) => updateQuestion(updated, i)}
            onDelete={() => deleteQuestion(i)}
            onMoveUp={() => moveQuestion(i, i - 1)}
            onMoveDown={() => moveQuestion(i, i + 1)}
            isFirst={i === 0}
            isLast={i === section.questions.length - 1}
          />
        ))}
      </Flex>

      <SecondaryButton
        mt="10px"
        h="32px"
        onClick={() => onChange({ ...section, questions: [...section.questions, newQuestion(section.sectionId, section.questions.length)] })}
      >
        <FiPlus /> Add question
      </SecondaryButton>
    </AppCard>
  );
}
