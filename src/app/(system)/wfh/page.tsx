import { Heading, Text, VStack } from "@chakra-ui/react";

export default function WfhPage() {
  return (
    <VStack align="start" gap="2">
      <Heading>Work From Home</Heading>
      <Text color="gray.600">
        Manage WFH requests and approval status.
      </Text>
    </VStack>
  );
}