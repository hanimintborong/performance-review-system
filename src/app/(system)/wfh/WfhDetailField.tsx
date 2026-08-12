import type { ReactNode } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";

export function Section({ children }: { children: ReactNode }) {
  return (
    <Flex gap="16px" wrap="wrap" bg="white" borderWidth="1px" borderColor="grey.20" borderRadius="10px" p="14px 16px">
      {children}
    </Flex>
  );
}

export function IconField({ icon, label, value }: { icon: IconType; label: string; value: ReactNode }) {
  return (
    <Flex align="flex-start" gap="10px" flex="1" minW="140px">
      <Flex w="34px" h="34px" borderRadius="8px" align="center" justify="center" bg="brand.10" color="brand.50" flexShrink="0">
        <Icon as={icon} boxSize="15px" />
      </Flex>
      <Flex direction="column" gap="2px" pt="1px">
        <Text fontSize="11px" fontWeight="600" color="grey.60">{label}</Text>
        {typeof value === "string" ? <Text fontSize="13px" fontWeight="600" color="grey.80">{value}</Text> : value}
      </Flex>
    </Flex>
  );
}
