import type { ReactNode } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";

type StatCardProps = {
  label: string;
  value: string | number;
  helperText?: string;
  valueColor?: string;
  accentColor?: string;
  icon?: ReactNode;
};

export function StatCard({ label, value, helperText, valueColor = "grey.80", accentColor, icon }: StatCardProps) {
  return (
    <AppCard p="16px" position="relative">
      {accentColor && <Flex position="absolute" top="0" left="0" right="0" h="3px" bg={accentColor} />}

      <Flex justify="space-between" align="flex-start" gap="10px">
        <Text fontSize="12px" fontWeight="600" color="grey.60">
          {label}
        </Text>
        {icon && (
          <Flex w="30px" h="30px" borderRadius="8px" align="center" justify="center" bg="grey.10" flexShrink="0">
            {icon}
          </Flex>
        )}
      </Flex>

      <Text fontSize="28px" fontWeight="800" lineHeight="1.15" color={valueColor} mt="10px">
        {value}
      </Text>

      {helperText && (
        <Text fontSize="11px" color="grey.40" mt="4px">
          {helperText}
        </Text>
      )}
    </AppCard>
  );
}
