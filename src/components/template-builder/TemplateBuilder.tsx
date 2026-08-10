"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Flex, Tabs, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

import { saveReviewTemplateAction } from "@/app/(system)/review-templates/reviewTemplateActions";
import { newSection } from "@/components/template-builder/newSection";
import { SectionEditor } from "@/components/template-builder/SectionEditor";
import { TemplateBuilderFooter } from "@/components/template-builder/TemplateBuilderFooter";
import { TemplateBuilderHeader } from "@/components/template-builder/TemplateBuilderHeader";
import { TemplatePreview } from "@/components/template-builder/TemplatePreview";
import { toaster } from "@/components/ui/toaster";
import type { ReviewTemplate, TemplateSection } from "@/types/template";

type TemplateBuilderProps = {
  initialTemplate: ReviewTemplate;
  mode?: "create" | "edit";
};

export function TemplateBuilder({ initialTemplate, mode = "create" }: TemplateBuilderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [template, setTemplate] = useState(initialTemplate);

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
    const toSave: ReviewTemplate = { ...template, status };
    startTransition(async () => {
      await saveReviewTemplateAction(toSave);
      toaster.create({ title: message, description: toSave.title || "Untitled template", type: "success" });
      router.push(`/review-templates/${toSave.templateId}`);
    });
  }

  return (
    <Flex direction="column" gap="14px">
      <Flex direction="column" gap="2px">
        <Text fontSize="19px" fontWeight="700" color="grey.90">{mode === "edit" ? "Edit template" : "Create template"}</Text>
        <Text fontSize="13px" color="grey.60">Design a review template tailored to your organisation.</Text>
      </Flex>

      <TemplateBuilderHeader template={template} onChange={setTemplate} />

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
          <TemplatePreview sections={template.sections} />
        </Tabs.Content>
      </Tabs.Root>

      <TemplateBuilderFooter
        onSaveDraft={() => persist("Inactive", "Draft saved")}
        onActivate={() => persist("Active", "Template activated")}
        loading={isPending}
      />
    </Flex>
  );
}
