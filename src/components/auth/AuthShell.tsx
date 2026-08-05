import type { ReactNode } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { brand } from "@/constants/colors";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <Flex minH="100vh" align="center" justify="center" bg={brand[50]} p="24px">
      <Flex direction="column" align="center" gap="20px" w="100%" maxW="420px">
        <Text fontSize="26px" fontWeight="800" color="white" letterSpacing="0.5px">
          b<Text as="span" color="orange.50">o</Text>rong
        </Text>
        <Text fontSize="13px" fontWeight="600" color="brand.10" mt="-14px">Performance Review</Text>

        {children}
      </Flex>
    </Flex>
  );
}
