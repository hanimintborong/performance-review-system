"use client";

import type { IconType } from "react-icons";
import { FiInbox } from "react-icons/fi";
import { Flex, Icon, Text } from "@chakra-ui/react";

type EmptyStateProps = {
  message: string;
  icon?: IconType;
};

export function EmptyState({ message, icon = FiInbox }: EmptyStateProps) {
  return (
    <Flex direction="column" align="center" gap="10px" py="48px" color="grey.40">
      <Icon as={icon} boxSize="28px" />
      <Text fontSize="13px" color="grey.60">
        {message}
      </Text>
    </Flex>
  );
}
