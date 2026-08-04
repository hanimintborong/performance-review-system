import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function DashboardPage() {
  return (
    <Box>
      <Heading size="lg">HR Dashboard</Heading>

      <Text mt="2" color="#6F6972">
        Monitor review progress, pending actions and recent activity.
      </Text>
    </Box>
  );
}