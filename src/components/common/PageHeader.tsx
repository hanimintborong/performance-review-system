import type { ReactNode } from "react";
import { Flex, Text } from "@chakra-ui/react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <Flex align="center" gap="12px" px="20px" py="14px" borderBottomWidth="1px" borderColor="grey.20">
      <Flex direction="column" flex="1" minW="0">
        <Text fontSize="15px" fontWeight="700" color="grey.80">
          {title}
        </Text>

        {subtitle && (
          <Text mt="1px" fontSize="12px" color="grey.60">
            {subtitle}
          </Text>
        )}
      </Flex>

      {action}
    </Flex>
  );
}
