"use client";

import { useState, useTransition } from "react";
import NextLink from "next/link";
import { Flex } from "@chakra-ui/react";

import { toggleReviewPlanStatusAction } from "@/app/(system)/review-plans/reviewPlanActions";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { toaster } from "@/components/ui/toaster";
import { PLAN_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewPlanStatus } from "@/types/review";

type PlanDetailActionsProps = {
  planId: string;
  title: string;
  initialStatus: ReviewPlanStatus;
};

export function PlanDetailActions({ planId, title, initialStatus }: PlanDetailActionsProps) {
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
    <Flex direction="column" gap="14px">
      <StatusBadge label={status} style={PLAN_STATUS_STYLE[status]} />

      <Flex gap="10px">
        <NextLink href={`/review-plans/${planId}/edit`}>
          <SecondaryButton>Edit plan</SecondaryButton>
        </NextLink>
        <PrimaryButton onClick={toggleStatus} loading={isPending}>
          {status === "Archived" ? "Activate cycle" : "Archive cycle"}
        </PrimaryButton>
      </Flex>
    </Flex>
  );
}
