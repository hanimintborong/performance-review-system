import NextLink from "next/link";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiArrowRight, FiInfo } from "react-icons/fi";

import type { ReviewPlan } from "@/types/review";

export function CycleBanner({ plan }: { plan: ReviewPlan | undefined }) {
  if (!plan) {
    return (
      <Flex align="center" gap="12px" bg="grey.10" borderWidth="1px" borderColor="grey.20" borderRadius="12px" p="11px 16px">
        <Icon as={FiInfo} boxSize="18px" color="grey.40" />
        <Text flex="1" fontSize="13px" color="grey.60">No review cycle is currently active.</Text>
        <NextLink href="/review-plans/new">
          <Flex align="center" gap="4px" color="brand.50" fontSize="13px" fontWeight="700">
            Create a cycle <Icon as={FiArrowRight} boxSize="13px" />
          </Flex>
        </NextLink>
      </Flex>
    );
  }

  return (
    <Flex align="center" gap="12px" bg="info.10" borderWidth="1px" borderColor="info.50" borderRadius="12px" p="11px 16px">
      <Icon as={FiInfo} boxSize="18px" color="info.50" />
      <Text flex="1" fontSize="13px" color="info.95">
        <Text as="span" fontWeight="700">{plan.title} is open.</Text> Review period: {plan.reviewPeriod} — managers
        submit reviews inside this window.
      </Text>
      <NextLink href={`/review-plans/${plan.planId}`}>
        <Flex align="center" gap="4px" color="info.70" fontSize="13px" fontWeight="700" flexShrink="0">
          Manage cycle <Icon as={FiArrowRight} boxSize="13px" />
        </Flex>
      </NextLink>
    </Flex>
  );
}
