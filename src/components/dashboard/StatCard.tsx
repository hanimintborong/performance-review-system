"use client";

import type { ReactNode } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

type StatCardProps = {
  label: string;
  value: number;
  description: string;
  icon: ReactNode;
  iconBackground?: string;
  iconColor?: string;
};

export function StatCard({
  label,
  value,
  description,
  icon,
  iconBackground = "#F1EDFF",
  iconColor = "#7C5CFC",
}: StatCardProps) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      p="5"
      boxShadow="0 2px 8px rgba(32, 24, 64, 0.05)"
    >
      <Flex justify="space-between" align="start" gap="4">
        <Box>
          <Text fontSize="sm" color="gray.500">
            {label}
          </Text>

          <Text
            mt="2"
            fontSize="3xl"
            fontWeight="bold"
            color="gray.800"
          >
            {value}
          </Text>
        </Box>

        <Flex
          align="center"
          justify="center"
          w="11"
          h="11"
          flexShrink="0"
          bg={iconBackground}
          color={iconColor}
          borderRadius="xl"
        >
          {icon}
        </Flex>
      </Flex>

      <Text mt="3" fontSize="sm" color="gray.500">
        {description}
      </Text>
    </Box>
  );
}