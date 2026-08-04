import { Heading, Text, VStack } from "@chakra-ui/react";

export default function SettingsPage() {
  return (
    <VStack align="start" gap="2">
      <Heading>Settings</Heading>
      <Text color="gray.600">
        Manage system configuration.
      </Text>
    </VStack>
  );
}