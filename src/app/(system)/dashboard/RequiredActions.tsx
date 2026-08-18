"use client";

import NextLink from "next/link";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiCheckCircle, FiClock } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import type { ReviewRow } from "@/data/queries";

function buildHref(params: Record<string, string>): string {
  return `/reviews?${new URLSearchParams(params).toString()}`;
}

export function RequiredActions({ rows }: { rows: ReviewRow[] }) {
  const notStarted = rows.filter((r) => r.status === "Not Started" || r.status === "Self-Assessment").length;
  const awaitingAck = rows.filter((r) => r.status === "Finalised" && !r.acknowledged).length;

  const actions = [
    notStarted > 0 && { text: `${notStarted} employee(s) haven't started self-assessment`, color: "warning.50", href: buildHref({ status: "Not Started,Self-Assessment" }) },
    awaitingAck > 0 && { text: `${awaitingAck} finalised review(s) awaiting employee acknowledgement`, color: "info.50", href: buildHref({ needsAck: "1" }) },
  ].filter((a): a is { text: string; color: string; href: string } => Boolean(a));

  return (
    <AppCard p="16px 20px">
      <Text fontSize="15px" fontWeight="700" color="grey.80" mb="12px">Required actions</Text>

      <Flex direction="column" gap="10px">
        {actions.length === 0 && (
          <Flex align="center" gap="8px" color="success.70">
            <Icon as={FiCheckCircle} boxSize="16px" /> <Text fontSize="12px">All caught up — nothing needs attention.</Text>
          </Flex>
        )}

        {actions.map((action) => (
          <Flex key={action.text} align="center" gap="8px">
            <Icon as={FiClock} boxSize="15px" color={action.color} flexShrink="0" />
            <NextLink href={action.href}>
              <Text fontSize="12px" color="grey.80" _hover={{ color: "brand.50" }}>{action.text}</Text>
            </NextLink>
          </Flex>
        ))}
      </Flex>
    </AppCard>
  );
}
