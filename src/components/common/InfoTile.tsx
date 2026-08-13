"use client";

import { Flex, Icon, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";

type InfoTileProps = {
  icon: IconType;
  label: string;
  value: string;
};

export function InfoTile({ icon, label, value }: InfoTileProps) {
  return (
    <Flex align="center" justify="space-between" gap="12px" bg="white" borderWidth="1px" borderColor="grey.20" borderRadius="10px" p="14px 16px">
      <Flex direction="column" gap="4px" minW="0">
        <Flex align="center" gap="6px">
          <Icon as={icon} boxSize="12px" color="grey.50" />
          <Text fontSize="11px" fontWeight="600" color="grey.60">{label}</Text>
        </Flex>
        <Text fontSize="14px" fontWeight="700" color="grey.80">{value}</Text>
      </Flex>
      <Flex w="34px" h="34px" borderRadius="8px" align="center" justify="center" bg="grey.10" color="grey.50" flexShrink="0">
        <Icon as={icon} boxSize="15px" />
      </Flex>
    </Flex>
  );
}
