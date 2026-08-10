"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FiBell, FiChevronRight } from "react-icons/fi";

import { SearchInput } from "@/components/common/SearchInput";
import { navigationByRole, pageTitleOverrides } from "@/constants/navigation";
import { useRole } from "@/components/layout/RoleContext";
import type { SystemRole } from "@/types/role";

function getPageTitle(pathname: string, role: SystemRole) {
  if (pageTitleOverrides[pathname]) return pageTitleOverrides[pathname];

  const match = navigationByRole[role].find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return match?.label ?? "Performance Review";
}

export function AppHeader() {
  const pathname = usePathname();
  const { role, notificationCount } = useRole();
  const [search, setSearch] = useState("");

  const pageTitle = getPageTitle(pathname, role);
  const notificationsHref = navigationByRole[role].find((item) => item.label === "Notifications")?.href ?? "/notifications";

  return (
    <Flex
      as="header"
      position="fixed"
      top="0"
      left="232px"
      right="0"
      zIndex="15"
      h="64px"
      bg="white"
      borderBottomWidth="1px"
      borderColor="grey.20"
      align="center"
      justify="space-between"
      px="24px"
      gap="12px"
    >
      <Box minW="0">
        <Flex align="center" gap="6px" color="grey.40" fontSize="11px">
          <Text>Performance Review</Text>
          <FiChevronRight size={10} />
          <Text>Mid-Year Review 2026</Text>
        </Flex>

        <Text mt="2px" fontSize="18px" fontWeight="600" color="grey.80" lineHeight="1.2" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {pageTitle}
        </Text>
      </Box>

      <Flex align="center" gap="10px" flexShrink="0">
        <SearchInput
          placeholder="Search staff…"
          value={search}
          onValueChange={setSearch}
          w="220px"
          h="34px"
        />

        <Box position="relative">
          <NextLink href={notificationsHref}>
            <IconButton
              aria-label="View notifications"
              variant="outline"
              borderColor="grey.20"
              borderRadius="8px"
              w="36px"
              h="36px"
              color="grey.70"
            >
              <FiBell size={17} />
            </IconButton>
          </NextLink>

          {notificationCount > 0 && (
            <Box position="absolute" top="6px" right="7px" w="8px" h="8px" borderRadius="full" bg="error.50" borderWidth="1.5px" borderColor="white" />
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
