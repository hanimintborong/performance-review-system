import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiMessageSquare } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";

type Audience = "employee" | "manager" | "hr";

const COPY: Record<Audience, string> = {
  employee: "Your manager has completed the evaluation. Schedule a discussion with them outside the system before it's finalised.",
  manager: "Evaluation submitted. Schedule a discussion with the employee outside the system before it's finalised.",
  hr: "The manager has submitted this evaluation. The employee–manager discussion happens outside the system — informational only, not a blocking step.",
};

export function DiscussionGuidanceBanner({ audience }: { audience: Audience }) {
  return (
    <AppCard p="14px 16px" bg="info.10" borderColor="info.50">
      <Flex align="center" gap="10px">
        <Icon as={FiMessageSquare} boxSize="16px" color="info.70" flexShrink="0" />
        <Text fontSize="12px" color="info.95">{COPY[audience]}</Text>
      </Flex>
    </AppCard>
  );
}
