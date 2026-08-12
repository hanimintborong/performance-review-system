"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Flex, Tabs, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

import { saveReviewTemplateAction } from "@/app/(system)/review-templates/reviewTemplateActions";
import { ActivateTemplateDialog } from "@/components/template-builder/ActivateTemplateDialog";
import { newSection } from "@/components/template-builder/newSection";
import { SectionEditor } from "@/components/template-builder/SectionEditor";
import { TemplateBuilderFooter } from "@/components/template-builder/TemplateBuilderFooter";
import { TemplateBuilderHeader } from "@/components/template-builder/TemplateBuilderHeader";
import { TemplatePreview } from "@/components/template-builder/TemplatePreview";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { toaster } from "@/components/ui/toaster";
import { applyWorkflowChange, countIncompatibleQuestions } from "@/lib/templateWorkflow";
import type { ReviewTemplate, TemplateSection, WorkflowType } from "@/types/template";

type TemplateBuilderProps = {
  initialTemplate: ReviewTemplate;
  mode?: "create" | "edit";
  workflowLocked?: boolean;
};

function sanitizeTemplate(template: ReviewTemplate): ReviewTemplate {
  return {
    ...template,
    sections: template.sections.map((section) => ({
      ...section,
      questions: section.questions.map((question) => (
        question.options
          ? { ...question, options: question.options.map((o) => o.trim()).filter(Boolean) }
          : question
      )),
    })),
  };
}

export function TemplateBuilder({ initialTemplate, mode = "create", workflowLocked }: TemplateBuilderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [savingStatus, setSavingStatus] = useState<ReviewTemplate["status"] | null>(null);
  const [template, setTemplate] = useState(initialTemplate);
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [pendingWorkflow, setPendingWorkflow] = useState<WorkflowType | null>(null);

  function handleWorkflowChange(next: WorkflowType) {
    if (countIncompatibleQuestions(template, next) > 0) {
      setPendingWorkflow(next);
    } else {
      setTemplate((prev) => applyWorkflowChange(prev, next));
    }
  }

  function confirmWorkflowChange() {
    if (!pendingWorkflow) return;
    setTemplate((prev) => applyWorkflowChange(prev, pendingWorkflow));
    setPendingWorkflow(null);
  }

  function updateSection(index: number, section: TemplateSection) {
    setTemplate((prev) => ({ ...prev, sections: prev.sections.map((s, i) => (i === index ? section : s)) }));
  }

  function deleteSection(index: number) {
    setTemplate((prev) => ({ ...prev, sections: prev.sections.filter((_, i) => i !== index) }));
  }

  function addSection() {
    setTemplate((prev) => ({ ...prev, sections: [...prev.sections, newSection(prev.templateId, prev.sections.length)] }));
  }

  function persist(status: ReviewTemplate["status"], message: string) {
    const toSave: ReviewTemplate = sanitizeTemplate({ ...template, status });
    setSavingStatus(status);
    startTransition(async () => {
      try {
        await saveReviewTemplateAction(toSave);
        toaster.create({ title: message, description: toSave.title || "Untitled template", type: "success" });

        if (status === "Active") {
          setShowActivateDialog(true);
        } else {
          router.push(`/review-templates/${toSave.templateId}`);
        }
      } catch (err) {
        toaster.create({ title: "Could not save template", description: err instanceof Error ? err.message : undefined, type: "error" });
      } finally {
        setSavingStatus(null);
      }
    });
  }

  return (
    <Flex direction="column" gap="14px">
      <Flex direction="column" gap="2px">
        <Text fontSize="19px" fontWeight="700" color="grey.90">{mode === "edit" ? "Edit template" : "Create template"}</Text>
        <Text fontSize="13px" color="grey.60">Design a review template tailored to your organisation.</Text>
      </Flex>

      <TemplateBuilderHeader
        template={template}
        onChange={setTemplate}
        onWorkflowChange={handleWorkflowChange}
        workflowLocked={workflowLocked}
      />

      <Tabs.Root defaultValue="edit">
        <Tabs.List gap="20px">
          <Tabs.Trigger value="edit">Edit template</Tabs.Trigger>
          <Tabs.Trigger value="preview">Preview form</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="edit" p="0" pt="14px">
          <Flex direction="column" gap="10px">
            {template.sections.map((section, index) => (
              <SectionEditor
                key={section.sectionId}
                section={section}
                index={index}
                workflowType={template.workflowType}
                onChange={(updated) => updateSection(index, updated)}
                onDelete={() => deleteSection(index)}
              />
            ))}

            <Flex
              as="button"
              align="center"
              justify="center"
              gap="8px"
              h="46px"
              borderWidth="1px"
              borderStyle="dashed"
              borderColor="brand.30"
              borderRadius="8px"
              color="brand.50"
              fontSize="13px"
              fontWeight="700"
              cursor="pointer"
              onClick={addSection}
            >
              <FiPlus /> Add section
            </Flex>
          </Flex>
        </Tabs.Content>

        <Tabs.Content value="preview" p="0" pt="14px">
          <TemplatePreview sections={template.sections} workflowType={template.workflowType} />
        </Tabs.Content>
      </Tabs.Root>

      <TemplateBuilderFooter
        onSaveDraft={() => persist("Inactive", "Draft saved")}
        onActivate={() => persist("Active", "Template activated")}
        savingDraft={isPending && savingStatus === "Inactive"}
        activating={isPending && savingStatus === "Active"}
      />

      <ActivateTemplateDialog
        open={showActivateDialog}
        templateTitle={template.title || "Untitled template"}
        onClose={() => router.push(`/review-templates/${template.templateId}`)}
        onCreateCycle={() => router.push("/review-plans/new")}
      />

      <ConfirmationDialog
        open={pendingWorkflow !== null}
        onOpenChange={(open) => !open && setPendingWorkflow(null)}
        title="Change workflow?"
        description={pendingWorkflow ? `Switching removes or adjusts ${countIncompatibleQuestions(template, pendingWorkflow)} question(s) that don't fit this workflow.` : ""}
        confirmLabel="Change anyway"
        onConfirm={confirmWorkflowChange}
      />
    </Flex>
  );
}
