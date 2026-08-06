"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

import { saveReviewTemplateAction } from "@/app/(system)/review-templates/reviewTemplateActions";
import { FilterBar } from "@/components/common/FilterBar";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { newSection } from "@/components/template-builder/newSection";
import { SectionEditor } from "@/components/template-builder/SectionEditor";
import { TemplateBuilderFooter } from "@/components/template-builder/TemplateBuilderFooter";
import { TemplateBuilderHeader } from "@/components/template-builder/TemplateBuilderHeader";
import { TemplatePreview } from "@/components/template-builder/TemplatePreview";
import { toaster } from "@/components/ui/toaster";
import type { ReviewTemplate, TemplateSection } from "@/types/template";

type TemplateBuilderProps = {
  initialTemplate: ReviewTemplate;
};

export function TemplateBuilder({ initialTemplate }: TemplateBuilderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [template, setTemplate] = useState(initialTemplate);
  const [view, setView] = useState("edit");

  function updateSection(index: number, section: TemplateSection) {
    setTemplate((prev) => ({ ...prev, sections: prev.sections.map((s, i) => (i === index ? section : s)) }));
  }

  function deleteSection(index: number) {
    setTemplate((prev) => ({ ...prev, sections: prev.sections.filter((_, i) => i !== index) }));
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
      <TemplateBuilderHeader template={template} onChange={setTemplate} />

      <FilterBar
        options={[{ key: "edit", label: "Edit" }, { key: "preview", label: "Preview" }]}
        activeKey={view}
        onChange={setView}
      />

      {view === "preview" ? (
        <TemplatePreview sections={template.sections} />
      ) : (
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

          <SecondaryButton
            onClick={() => setTemplate((prev) => ({ ...prev, sections: [...prev.sections, newSection(prev.templateId, prev.sections.length)] }))}
          >
            <FiPlus /> Add section
          </SecondaryButton>
        </Flex>
      )}

      <TemplateBuilderFooter
        onSaveDraft={() => persist("Inactive", "Draft saved")}
        onActivate={() => persist("Active", "Template activated")}
        loading={isPending}
      />
    </Flex>
  );
}
