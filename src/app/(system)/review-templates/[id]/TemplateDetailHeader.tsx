"use client";

import NextLink from "next/link";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiEdit3, FiFileText } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { TEMPLATE_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewTemplateStatus } from "@/types/review";

type TemplateDetailHeaderProps = {
  templateId: string;
  title: string;
  description: string;
  status: ReviewTemplateStatus;
};

export function TemplateDetailHeader({ templateId, title, description, status }: TemplateDetailHeaderProps) {
  return (
    <AppCard p="20px 24px" bg="brand.10" borderColor="brand.20">
      <Flex align="center" justify="space-between" gap="16px" flexWrap="wrap">
        <Flex align="center" gap="14px">
          <Flex w="46px" h="46px" borderRadius="10px" align="center" justify="center" bg="brand.20" color="brand.60" flexShrink="0">
            <Icon as={FiFileText} boxSize="20px" />
          </Flex>
          <Flex direction="column" gap="2px">
            <Flex align="center" gap="8px" flexWrap="wrap">
              <Text fontSize="16px" fontWeight="700" color="grey.80">{title}</Text>
              <StatusBadge label={status} style={TEMPLATE_STATUS_STYLE[status]} />
            </Flex>
            <Text fontSize="12px" color="grey.60">{description}</Text>
          </Flex>
        </Flex>

        <NextLink href={`/review-templates/${templateId}/edit`}>
          <SecondaryButton bg="white"><FiEdit3 /> Edit template</SecondaryButton>
        </NextLink>
      </Flex>
    </AppCard>
  );
}
