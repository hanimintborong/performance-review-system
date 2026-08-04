"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";

import {
  FiBell,
  FiChevronRight,
  FiSearch,
} from "react-icons/fi";

import {
  useRole,
  type UserRole,
} from "@/components/layout/RoleContext";

const roleRoute: Record<UserRole, string> = {
  hr: "/dashboard",
  manager: "/manager/team",
  employee: "/employee/reviews",
};

const pageTitles: Record<string, string> = {
  "/dashboard": "HR dashboard",
  "/reviews": "Reviews",
  "/review-plans": "Review cycles",
  "/reports": "Analytics",
  "/roles-access": "Roles & permissions",
  "/wfh": "WFH requests",
  "/notifications": "Notifications",
  "/manager/team": "My team",
  "/employee/reviews": "My reviews",
  "/employee/evaluation": "My evaluation",
};

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, setRole } = useRole();

  const pageTitle = pageTitles[pathname] ?? "Performance Review";

  function changeRole(newRole: UserRole) {
    setRole(newRole);
    router.push(roleRoute[newRole]);
  }

  return (
    <Flex
      as="header"
      position="fixed"
      top="0"
      left="292px"
      right="0"
      zIndex="15"
      h="76px"
      bg="white"
      borderBottomWidth="1px"
      borderColor="#E4E4E7"
      align="center"
      justify="space-between"
      px="30px"
    >
      {/* Breadcrumb and page title */}
      <Box>
        <Flex
          align="center"
          gap="8px"
          color="#9A949D"
          fontSize="13px"
        >
          <Text>Performance Review</Text>
          <FiChevronRight size={14} />
          <Text>Mid-Year Review 2026</Text>
        </Flex>

        <Text
          mt="2px"
          fontSize="23px"
          fontWeight="600"
          color="#18151C"
          lineHeight="1.2"
        >
          {pageTitle}
        </Text>
      </Box>

      <Flex align="center" gap="14px">
        {/* Search */}
        <Flex
          w="268px"
          h="42px"
          align="center"
          gap="10px"
          px="14px"
          bg="#F3F3F3"
          borderRadius="11px"
        >
          <Box color="#8F8992">
            <FiSearch size={18} />
          </Box>

          <Input
            placeholder="Search staff..."
            variant="flushed"
            border="none"
            outline="none"
            fontSize="15px"
            color="#454047"
            _placeholder={{
              color: "#817B84",
            }}
            _focus={{
              boxShadow: "none",
            }}
          />
        </Flex>

        {/* Role switcher */}
        <Flex
          h="42px"
          align="center"
          bg="#F3F3F3"
          borderRadius="11px"
          p="3px"
        >
          <RoleButton
            label="HR Admin"
            active={role === "hr"}
            onClick={() => changeRole("hr")}
          />

          <RoleButton
            label="Manager"
            active={role === "manager"}
            onClick={() => changeRole("manager")}
          />

          <RoleButton
            label="Employee"
            active={role === "employee"}
            onClick={() => changeRole("employee")}
          />
        </Flex>

        {/* Notification */}
        <Box position="relative">
          <IconButton
            aria-label="View notifications"
            variant="outline"
            borderColor="#E4E4E7"
            borderRadius="11px"
            w="44px"
            h="44px"
            color="#5B5560"
          >
            <FiBell />
          </IconButton>

          <Box
            position="absolute"
            top="8px"
            right="9px"
            w="7px"
            h="7px"
            borderRadius="full"
            bg="#EF4444"
            borderWidth="1px"
            borderColor="white"
          />
        </Box>
      </Flex>
    </Flex>
  );
}

type RoleButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function RoleButton({
  label,
  active,
  onClick,
}: RoleButtonProps) {
  return (
    <Button
      h="36px"
      px="16px"
      bg={active ? "white" : "transparent"}
      color={active ? "#30235C" : "#514B52"}
      borderRadius="8px"
      boxShadow={
        active
          ? "0 1px 4px rgba(32, 24, 64, 0.12)"
          : "none"
      }
      fontSize="14px"
      fontWeight={active ? "700" : "600"}
      _hover={{
        bg: active ? "white" : "#EAE8ED",
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}