"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

import { Box, Flex, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

import { RoleBadge } from "@/components/common/RoleBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { navigationByRole, PRIMARY_ACTION_LABEL } from "@/constants/navigation";
import { useRole } from "@/components/layout/RoleContext";
import { getInitials } from "@/lib/initials";
import { ROLE_META } from "@/types/role";

export function AppSidebar() {
  const pathname = usePathname();
  const { role, name, jobTitle, notificationCount, primaryActionCount } = useRole();

  const navigationItems = navigationByRole[role];
  const roleLabel = ROLE_META[role].label;

  return (
    <Box
      as="aside"
      position="fixed"
      top="0"
      left="0"
      zIndex="20"
      h="100vh"
      w="232px"
      bg="white"
      borderRightWidth="1px"
      borderColor="grey.20"
      px="12px"
      py="16px"
      display="flex"
      flexDirection="column"
      gap="14px"
    >
      <Flex align="center" gap="10px" px="6px">
        <Text fontSize="20px" fontWeight="800" letterSpacing="0.5px" color="brand.50" lineHeight="1">
          b<Text as="span" color="orange.50">o</Text>rong
        </Text>

        <Text fontSize="10px" fontWeight="700" color="grey.40" borderLeftWidth="1px" borderColor="grey.20" pl="10px" lineHeight="1.3">
          Performance<br />Review
        </Text>
      </Flex>

      <RoleBadge label={roleLabel} />

      <VStack align="stretch" gap="2px" flex="1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const displayCount = item.label === "Notifications" ? notificationCount
            : item.label === PRIMARY_ACTION_LABEL[role] ? primaryActionCount
            : item.count;

          return (
            <NextLink key={item.href} href={item.href} prefetch={false} style={{ textDecoration: "none" }}>
              <Flex
                align="center"
                minH="36px"
                px="10px"
                gap="10px"
                borderRadius="6px"
                bg={isActive ? "brand.10" : "transparent"}
                color={isActive ? "brand.70" : "grey.60"}
                _hover={{ bg: "grey.10", color: "brand.70" }}
                transition="background .12s, color .12s"
              >
                <Icon as={item.icon} boxSize="17px" flexShrink="0" />

                <Text flex="1" fontSize="13px" fontWeight={isActive ? "700" : "500"}>
                  {item.label}
                </Text>

                {displayCount !== undefined && displayCount > 0 && (
                  <Flex
                    minW="20px"
                    h="17px"
                    px="6px"
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg={item.label === "Notifications" ? "grey.20" : "warning.50"}
                    color={item.label === "Notifications" ? "grey.60" : "white"}
                    fontSize="11px"
                    fontWeight="700"
                  >
                    {displayCount}
                  </Flex>
                )}
              </Flex>
            </NextLink>
          );
        })}
      </VStack>

      <Flex align="center" gap="8px" p="8px" bg="grey.10" borderRadius="8px">
        <UserAvatar initials={getInitials(name)} bg="brand.50" color="white" />

        <Box minW="0" flex="1">
          <Text fontSize="12px" fontWeight="600" color="grey.80" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
            {name}
          </Text>
          <Text fontSize="11px" color="grey.60" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
            {jobTitle || roleLabel}
          </Text>
        </Box>

        <SignOutButton>
          <IconButton aria-label="Sign out" size="xs" variant="ghost" color="grey.60">
            <FiLogOut />
          </IconButton>
        </SignOutButton>
      </Flex>
    </Box>
  );
}
