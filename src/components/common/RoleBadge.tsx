"use client";

import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiBriefcase } from "react-icons/fi";

type RoleBadgeProps = {
  label: string;
};

export function RoleBadge({ label }: RoleBadgeProps) {
  return (
    <Flex align="center" gap="6px" alignSelf="flex-start" bg="brand.10" color="brand.70" px="10px" py="3px" borderRadius="full">
      <Icon as={FiBriefcase} boxSize="13px" />
      <Text fontSize="11px" fontWeight="700">{label}</Text>
    </Flex>
  );
}
