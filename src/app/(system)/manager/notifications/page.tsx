import { Heading, Text, VStack } from "@chakra-ui/react";

export default function ManagerNotificationsPage() {
  return (
    <VStack align="start" gap="2">
      <Heading size="lg">Notifications</Heading>
      <Text color="gray.600">
        Your review and WFH notifications will appear here once this feed is wired up.
      </Text>
    </VStack>
  );
}
