import { Heading, Text, VStack } from "@chakra-ui/react";

export default function ReportsPage() {
  return (
    <VStack align="start" gap="2">
      <Heading>Reports</Heading>
      <Text color="gray.600">
        View and export performance review reports.
      </Text>
    </VStack>
  );
}