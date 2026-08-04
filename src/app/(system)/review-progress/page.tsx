import { Heading, Text, VStack } from "@chakra-ui/react";

export default function ReviewProgressPage() {
  return (
    <VStack align="start" gap="2">
      <Heading>Review Progress</Heading>
      <Text color="gray.600">
        Track completed, pending and overdue reviews.
      </Text>
    </VStack>
  );
}