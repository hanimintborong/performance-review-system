import { Heading, Text, VStack } from "@chakra-ui/react";

export default function ReviewsPage() {
  return (
    <VStack align="start" gap="2">
      <Heading>Performance Reviews</Heading>
      <Text color="gray.600">
        View and manage employee review records.
      </Text>
    </VStack>
  );
}