import { notFound } from "next/navigation";
import NextLink from "next/link";

import { Flex, Grid, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { TemplatePreview } from "@/components/template-builder/TemplatePreview";
import { TEMPLATE_STATUS_STYLE } from "@/constants/statusColors";
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

      <AppCard p="16px 20px">
        <Flex align="center" justify="space-between" gap="12px" flexWrap="wrap">
          <Flex direction="column" gap="4px">
            <Text fontSize="17px" fontWeight="700" color="grey.80">{template.title}</Text>
            <Text fontSize="12px" color="grey.60">{template.description}</Text>
          </Flex>

          <Flex align="center" gap="10px">
            <StatusBadge label={template.status} style={TEMPLATE_STATUS_STYLE[template.status]} />
            <NextLink href={`/review-templates/${template.templateId}/edit`}>
              <SecondaryButton>Edit template</SecondaryButton>
            </NextLink>
          </Flex>
        </Flex>
      </AppCard>

      <AppCard p="16px 20px">
        <Grid templateColumns="repeat(3, 1fr)" gap="16px">
          <Field label="Sections" value={String(countSections(template))} />
          <Field label="Questions" value={String(countQuestions(template))} />
          <Field label="Assigned departments" value={template.assignedDepartments.join(", ")} />
        </Grid>
      </AppCard>

      <TemplatePreview sections={template.sections} />
    </Flex>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Flex direction="column" gap="4px">
      <Text fontSize="11px" fontWeight="600" color="grey.60">{label}</Text>
      <Text fontSize="13px" fontWeight="600" color="grey.80">{value}</Text>
    </Flex>
  );
}
