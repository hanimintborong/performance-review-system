import { Flex, Icon, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";

type RuleSectionHeadingProps = {
  step: number;
  title: string;
  icon: IconType;
  first?: boolean;
};

export function RuleSectionHeading({ step, title, icon, first }: RuleSectionHeadingProps) {
  return (
    <Flex align="center" gap="8px" pt={first ? "0" : "16px"} mt={first ? "0" : "2px"} borderTopWidth={first ? "0" : "1px"} borderColor="grey.20">
      <Flex w="26px" h="26px" borderRadius="7px" align="center" justify="center" bg="brand.10" color="brand.60" flexShrink="0">
        <Icon as={icon} boxSize="13px" />
      </Flex>
      <Text fontSize="13px" fontWeight="700" color="grey.80">{step}. {title}</Text>
    </Flex>
  );
}
