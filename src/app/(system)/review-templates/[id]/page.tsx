import { notFound } from "next/navigation";
import NextLink from "next/link";

import { Flex } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { TemplateDetailHeader } from "@/app/(system)/review-templates/[id]/TemplateDetailHeader";
import { TemplateInfoGrid } from "@/app/(system)/review-templates/[id]/TemplateInfoGrid";
import { TemplatePreview } from "@/components/template-builder/TemplatePreview";
import { getReviewTemplateById } from "@/data/queries";
import { countQuestions, countSections } from "@/types/template";

type TemplateDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReviewTemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { id } = await params;
  const template = await getReviewTemplateById(id);

  if (!template) notFound();

  return (
    <Flex direction="column" gap="14px">
      <NextLink href="/review-templates" style={{ textDecoration: "none" }}>
        <Flex align="center" gap="6px" color="brand.50" fontSize="13px" fontWeight="700">
          <FiArrowLeft size={14} /> Back to review templates
        </Flex>
      </NextLink>

      <TemplateDetailHeader
        templateId={template.templateId}
        title={template.title}
        description={template.description}
        status={template.status}
      />

      <TemplateInfoGrid
        sectionCount={String(countSections(template))}
        questionCount={String(countQuestions(template))}
        departments={template.assignedDepartments.join(", ")}
      />

      <TemplatePreview sections={template.sections} workflowType={template.workflowType} />
    </Flex>
  );
}
