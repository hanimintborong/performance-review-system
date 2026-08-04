"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  FiBriefcase,
} from "react-icons/fi";

import { navigationByRole } from "@/constants/navigation";
import { useRole } from "@/components/layout/RoleContext";

const roleDetails = {
  hr: {
    label: "HR Admin",
    initials: "NH",
    name: "Nurul Huda Hassan",
    position: "HR Manager",
  },
  manager: {
    label: "Manager",
    initials: "AT",
    name: "Aisha Tan",
    position: "Procurement Lead",
  },
  employee: {
    label: "Employee",
    initials: "AH",
    name: "Amirul Hakim Zulkifli",
    position: "Procurement Executive",
  },
};

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = useRole();

  const navigationItems = navigationByRole[role];
  const currentRole = roleDetails[role];

  return (
    <Box
      as="aside"
      position="fixed"
      top="0"
      left="0"
      zIndex="20"
      h="100vh"
      w="292px"
      bg="white"
      borderRightWidth="1px"
      borderColor="#E4E4E7"
      px="12px"
      py="18px"
      display="flex"
      flexDirection="column"
    >
      {/* Logo */}
      <Flex align="center" gap="12px" px="8px">
        <Box
          pr="12px"
          borderRightWidth="1px"
          borderColor="#E4E4E7"
        >
          <Text
            fontSize="20px"
            fontWeight="800"
            letterSpacing="1px"
            color="#56408F"
            lineHeight="1"
          >
            b
            <Text as="span" color="#F28C00">
              o
            </Text>
            rong
          </Text>

          <Text
            mt="4px"
            fontSize="5px"
            color="#F28C00"
            fontWeight="700"
          >
            formerly known as dropee
          </Text>
        </Box>

        <Text
          fontSize="13px"
          fontWeight="600"
          color="#77727E"
          lineHeight="1.25"
        >
          Performance
          <br />
          Review
        </Text>
      </Flex>

      {/* Role badge */}
      <Flex
        mt="18px"
        ml="4px"
        align="center"
        gap="7px"
        alignSelf="flex-start"
        bg="#F0EEF7"
        color="#30235C"
        px="12px"
        py="6px"
        borderRadius="full"
      >
        <FiBriefcase size={14} />

        <Text fontSize="14px" fontWeight="600">
          {currentRole.label}
        </Text>
      </Flex>

      {/* Navigation */}
      <VStack align="stretch" gap="4px" mt="16px">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <NextLink
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
              }}
            >
              <Flex
                align="center"
                minH="44px"
                px="14px"
                gap="13px"
                borderRadius="10px"
                bg={isActive ? "#ECEAF4" : "transparent"}
                color={isActive ? "#30235C" : "#655F66"}
                _hover={{
                  bg: "#F4F3F7",
                  color: "#30235C",
                }}
                transition="all 0.15s ease"
              >
                <Icon
                  as={item.icon}
                  boxSize="18px"
                  flexShrink="0"
                />

                <Text
                  flex="1"
                  fontSize="16px"
                  fontWeight={isActive ? "700" : "500"}
                >
                  {item.label}
                </Text>

                {item.count !== undefined && (
                  <Flex
                    minW="24px"
                    h="22px"
                    px="7px"
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg={
                      item.label === "Notifications"
                        ? "#E4E4E4"
                        : "#F28C00"
                    }
                    color={
                      item.label === "Notifications"
                        ? "#666666"
                        : "white"
                    }
                    fontSize="12px"
                    fontWeight="700"
                  >
                    {item.count}
                  </Flex>
                )}
              </Flex>
            </NextLink>
          );
        })}
      </VStack>

      {/* User profile */}
      <Flex
        mt="auto"
        align="center"
        gap="12px"
        p="10px"
        bg="#FAFAFA"
        borderRadius="10px"
      >
        <Flex
          w="40px"
          h="40px"
          align="center"
          justify="center"
          borderRadius="full"
          bg="#57458E"
          color="white"
          fontSize="13px"
          fontWeight="700"
          flexShrink="0"
        >
          {currentRole.initials}
        </Flex>

        <Box minW="0">
          <Text
            fontSize="14px"
            fontWeight="600"
            color="#18151C"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {currentRole.name}
          </Text>

          <Text
            fontSize="13px"
            color="#655F66"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {currentRole.position}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}