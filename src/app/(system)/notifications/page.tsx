import { Heading, Text, VStack } from "@chakra-ui/react";

export default function NotificationsPage() {
  return (
    <VStack align="start" gap="2">
      <Heading>Notification & Reminder</Heading>
      <Text color="gray.600">
        Configure notification and reminder rules.
      </Text>
    </VStack>
  );
}