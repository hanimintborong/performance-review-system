import type { ReactNode } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";

type StatCardProps = {
  label: string;
  value: string | number;
  helperText?: string;
  valueColor?: string;
  icon?: ReactNode;
};

export function StatCard({ label, value, helperText, valueColor = "grey.80", icon }: StatCardProps) {
  return (
    <AppCard p="14px 16px">
      <Flex justify="space-between" align="start" gap="12px">
        <Text fontSize="12px" fontWeight="600" color="grey.60">
          {label}
        </Text>
        {icon}
      </Flex>

      <Text fontSize="28px" fontWeight="700" lineHeight="1.2" color={valueColor} mt="4px">
        {value}
      </Text>

      {helperText && (
        <Text fontSize="11px" color="grey.40" mt="2px">
          {helperText}
        </Text>
      )}
    </AppCard>
  );
}
