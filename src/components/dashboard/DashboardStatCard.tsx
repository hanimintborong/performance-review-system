"use client";

import type { ReactNode } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

type DashboardStatCardProps = {
  label: string;
  value: string | number;
  helperText: string;
  icon: ReactNode;
  iconBackground: string;
  iconColor: string;
};

export function DashboardStatCard({
  label,
  value,
  helperText,
  icon,
  iconBackground,
  iconColor,
}: DashboardStatCardProps) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="#E4E4E7"
      borderRadius="16px"
      p="20px"
    >
      <Flex justify="space-between" align="start" gap="16px">
        <Box>
          <Text fontSize="14px" color="#77727E">
            {label}
          </Text>

          <Text
            mt="8px"
            fontSize="30px"
            fontWeight="700"
            color="#18151C"
          >
            {value}
          </Text>
        </Box>

        <Flex
          w="42px"
          h="42px"
          flexShrink="0"
          align="center"
          justify="center"
          borderRadius="12px"
          bg={iconBackground}
          color={iconColor}
        >
          {icon}
        </Flex>
      </Flex>

      <Text mt="12px" fontSize="13px" color="#8B858E">
        {helperText}
      </Text>
    </Box>
  );
}