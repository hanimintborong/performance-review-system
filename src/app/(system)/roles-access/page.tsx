import { Heading, Text, VStack } from "@chakra-ui/react";

export default function RolesAccessPage() {
  return (
    <VStack align="start" gap="2">
      <Heading>Roles & Access</Heading>
      <Text color="gray.600">
        Manage system roles and access permissions.
      </Text>
    </VStack>
  );
}