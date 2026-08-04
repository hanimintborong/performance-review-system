import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function EmployeeReviewsPage() {
  return (
    <Box>
      <Heading size="lg">My reviews</Heading>

      <Text mt="2" color="#6F6972">
        View your current and previous performance reviews.
      </Text>
    </Box>
  );
}