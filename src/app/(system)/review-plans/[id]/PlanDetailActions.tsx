"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiCalendar, FiCheckCircle, FiEdit3, FiLock } from "react-icons/fi";

import { activateReviewPlanAction, closeReviewPlanAction } from "@/app/(system)/review-plans/reviewPlanActions";
import { AppCard } from "@/components/common/AppCard";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
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
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState<"activate" | "close" | null>(null);

  function activate() {
    startTransition(async () => {
      const createdCount = await activateReviewPlanAction(planId);
      setStatus("Active");
      toaster.create({ title: "Cycle activated", description: `"${title}" is now open — ${createdCount} assignment${createdCount === 1 ? "" : "s"} created.`, type: "success" });
      router.refresh();
    });
  }

  function close() {
    startTransition(async () => {
      await closeReviewPlanAction(planId);
      setStatus("Closed");
      toaster.create({ title: "Cycle closed", description: `"${title}" no longer accepts submissions or edits.`, type: "success" });
      router.refresh();
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
          {status !== "Closed" && (
            <NextLink href={`/review-plans/${planId}/edit`}>
              <SecondaryButton bg="white"><FiEdit3 /> Edit plan</SecondaryButton>
            </NextLink>
          )}

          {status === "Draft" && (
            <PrimaryButton onClick={() => setConfirming("activate")} loading={isPending}>
              <FiCheckCircle /> Activate cycle
            </PrimaryButton>
          )}

          {status === "Active" && (
            <SecondaryButton
              bg="white"
              color="error.70"
              borderColor="error.50"
              _hover={{ bg: "error.10" }}
              _active={{ bg: "error.10" }}
              onClick={() => setConfirming("close")}
              loading={isPending}
            >
              <FiLock /> Close cycle
            </SecondaryButton>
          )}
        </Flex>
      </Flex>

      <ConfirmationDialog
        open={confirming === "activate"}
        onOpenChange={(open) => !open && setConfirming(null)}
        title="Activate this cycle?"
        description="This opens the cycle to every assigned employee and manager and notifies them immediately. Make sure the template and departments are final."
        confirmLabel="Activate"
        onConfirm={activate}
      />

      <ConfirmationDialog
        open={confirming === "close"}
        onOpenChange={(open) => !open && setConfirming(null)}
        title="Close this cycle?"
        description="No more submissions or edits will be allowed once closed. All existing records stay viewable. This can't be reopened."
        confirmLabel="Close cycle"
        onConfirm={close}
      />
    </AppCard>
  );
}
