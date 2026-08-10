"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Flex, Menu, Portal } from "@chakra-ui/react";
import { FiEye, FiMoreHorizontal } from "react-icons/fi";

import { MenuAction } from "@/components/common/MenuAction";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import type { ReviewRow } from "@/data/queries";

type TeamRowActionsProps = {
  row: ReviewRow;
  label: string;
  isSending: boolean;
  onSendReminder: () => void;
};

export function TeamRowActions({ row, label, isSending, onSendReminder }: TeamRowActionsProps) {
  const router = useRouter();

  const primary = label === "Send reminder" ? (
    <SecondaryButton h="30px" px="12px" loading={isSending} onClick={onSendReminder}>Send reminder</SecondaryButton>
  ) : (
    <NextLink href={`/manager/reviews/${row.assignmentId}`}>
      <SecondaryButton h="30px" px="12px">{label}</SecondaryButton>
    </NextLink>
  );

  return (
    <Flex justify="flex-end" gap="6px">
      {primary}
      <Menu.Root>
        <Menu.Trigger asChild>
          <SecondaryButton h="30px" px="8px" aria-label="More actions"><FiMoreHorizontal /></SecondaryButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content fontSize="13px" minW="160px" borderRadius="10px" borderWidth="1px" borderColor="grey.20" boxShadow="0 10px 28px rgba(20,16,40,0.14)" p="6px">
              <MenuAction icon={<FiEye size={14} />} value="view" onSelect={() => router.push(`/manager/reviews/${row.assignmentId}`)}>
                View details
              </MenuAction>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
}
