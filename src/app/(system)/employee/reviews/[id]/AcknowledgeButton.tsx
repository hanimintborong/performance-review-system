"use client";

import { useTransition } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";

import { acknowledgeReviewAction } from "@/app/(system)/employee/reviews/[id]/acknowledgeActions";
import { AppCard } from "@/components/common/AppCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { toaster } from "@/components/ui/toaster";

export function AcknowledgeButton({ assignmentId }: { assignmentId: string }) {
  const [isPending, startTransition] = useTransition();

  function acknowledge() {
    startTransition(async () => {
      await acknowledgeReviewAction(assignmentId);
      toaster.create({ title: "Review acknowledged", type: "success" });
    });
  }

  return (
    <AppCard p="16px 20px" bg="warning.10" borderColor="warning.50">
      <Flex align="center" justify="space-between" flexWrap="wrap" gap="10px">
        <Flex align="center" gap="8px">
          <Icon as={FiCheckCircle} color="warning.70" />
          <Text fontSize="13px" color="warning.95">Please confirm you&apos;ve read this finalised review.</Text>
        </Flex>
        <PrimaryButton onClick={acknowledge} loading={isPending}>Acknowledge</PrimaryButton>
      </Flex>
    </AppCard>
  );
}
