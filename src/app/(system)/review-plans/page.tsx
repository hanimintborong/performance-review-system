import { Heading, Text, VStack } from "@chakra-ui/react";

export default function ReviewPlansPage() {
  return (
    <VStack align="start" gap="2">
      <Heading>Review Plans</Heading>
      <Text color="gray.600">
        Create and manage performance review periods.
      </Text>
    </VStack>
  );
}