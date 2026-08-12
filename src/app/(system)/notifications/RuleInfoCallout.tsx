import type { ReactNode } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";

type RuleInfoCalloutProps = {
  icon: IconType;
  title?: string;
  children: ReactNode;
};

export function RuleInfoCallout({ icon, title, children }: RuleInfoCalloutProps) {
  return (
    <Flex gap="10px" bg="brand.10" borderRadius="8px" p="10px 12px" align="flex-start">
      <Icon as={icon} boxSize="14px" color="brand.60" mt="2px" flexShrink="0" />
      <Flex direction="column" gap="2px">
        {title && <Text fontSize="12px" fontWeight="700" color="grey.80">{title}</Text>}
        <Text fontSize="11px" color="grey.70" lineHeight="1.5">{children}</Text>
      </Flex>
    </Flex>
  );
}
