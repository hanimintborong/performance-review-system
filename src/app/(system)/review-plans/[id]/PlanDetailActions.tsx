"use client";

import { useState, useTransition } from "react";
import NextLink from "next/link";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiArchive, FiCalendar, FiEdit3 } from "react-icons/fi";

import { toggleReviewPlanStatusAction } from "@/app/(system)/review-plans/reviewPlanActions";
import { AppCard } from "@/components/common/AppCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { toaster } from "@/components/ui/toaster";
import { PLAN_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewPlanStatus } from "@/types/review";

type PlanDetailActionsProps = {
  planId: string;
  title: string;
  description: string;
  initialStatus: ReviewPlanStatus;
};

export function PlanDetailActions({ planId, title, description, initialStatus }: PlanDetailActionsProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  function toggleStatus() {
    startTransition(async () => {
      const nextStatus = await toggleReviewPlanStatusAction(planId);
      if (!nextStatus) return;

      setStatus(nextStatus);
      toaster.create({
        title: nextStatus === "Archived" ? "Cycle archived" : "Cycle activated",
        description: `"${title}" is now ${nextStatus.toLowerCase()}.`,
        type: "success",
      });
    });
  }

  return (
    <AppCard p="20px 24px" bg="brand.10" borderColor="brand.20">
      <Flex align="center" justify="space-between" gap="16px" flexWrap="wrap">
        <Flex align="center" gap="14px">
          <Flex w="46px" h="46px" borderRadius="10px" align="center" justify="center" bg="brand.20" color="brand.60" flexShrink="0">
            <Icon as={FiCalendar} boxSize="20px" />
          </Flex>
          <Flex direction="column" gap="2px">
            <Flex align="center" gap="8px" flexWrap="wrap">
              <Text fontSize="16px" fontWeight="700" color="grey.80">{title}</Text>
              <StatusBadge label={status} style={PLAN_STATUS_STYLE[status]} />
            </Flex>
            <Text fontSize="12px" color="grey.60">{description}</Text>
          </Flex>
        </Flex>

        <Flex gap="10px" flexShrink="0">
          <NextLink href={`/review-plans/${planId}/edit`}>
            <SecondaryButton bg="white"><FiEdit3 /> Edit plan</SecondaryButton>
          </NextLink>
          <PrimaryButton onClick={toggleStatus} loading={isPending}>
            <FiArchive /> {status === "Archived" ? "Activate cycle" : "Archive cycle"}
          </PrimaryButton>
        </Flex>
      </Flex>
    </AppCard>
  );
}
