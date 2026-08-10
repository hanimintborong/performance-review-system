"use client";

import { useTransition } from "react";
import { Flex } from "@chakra-ui/react";

import { sendToManagementAction, startPcReviewAction } from "@/app/(system)/reviews/[id]/pcReviewActions";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { toaster } from "@/components/ui/toaster";
import type { ReviewStatus } from "@/types/review";

export function PcReviewButtons({ assignmentId, status }: { assignmentId: string; status: ReviewStatus }) {
  const [isPending, startTransition] = useTransition();

  function run(action: () => Promise<void>, message: string) {
    startTransition(async () => {
      await action();
      toaster.create({ title: message, type: "success" });
    });
  }

  if (status === "Manager Submitted") {
    return (
      <Flex justify="flex-end">
        <PrimaryButton loading={isPending} onClick={() => run(() => startPcReviewAction(assignmentId), "P&C review started")}>
          Start P&amp;C review
        </PrimaryButton>
      </Flex>
    );
  }

  if (status === "P&C Review") {
    return (
      <Flex justify="flex-end">
        <PrimaryButton loading={isPending} onClick={() => run(() => sendToManagementAction(assignmentId), "Sent to management")}>
          Send to management
        </PrimaryButton>
      </Flex>
    );
  }

  return null;
}
