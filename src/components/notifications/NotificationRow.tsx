"use client";

import NextLink from "next/link";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";

import { NOTIFICATION_TYPE_ICON } from "@/constants/notificationTypes";
import type { NotificationView } from "@/lib/notificationView";

type NotificationRowProps = {
  item: NotificationView;
  onToggleRead: () => void;
  loading: boolean;
};

export function NotificationRow({ item, onToggleRead, loading }: NotificationRowProps) {
  const TypeIcon = NOTIFICATION_TYPE_ICON[item.type];

  const body = (
    <Flex align="start" gap="10px" p="14px 20px" bg={item.read ? "white" : "brand.10"} borderBottomWidth="1px" borderColor="grey.10">
      <Flex w="7px" flexShrink="0" justify="center" mt="8px">
        {!item.read && <Flex w="7px" h="7px" borderRadius="full" bg="brand.50" />}
      </Flex>

      <Flex w="34px" h="34px" borderRadius="9px" align="center" justify="center" flexShrink="0" bg={item.read ? "grey.10" : "brand.20"} color={item.read ? "grey.50" : "brand.70"}>
        <Icon as={TypeIcon} boxSize="15px" />
      </Flex>

      <Flex direction="column" flex="1" gap="2px" minW="0">
        <Text fontSize="13px" fontWeight={item.read ? "600" : "700"} color="grey.80">{item.title}</Text>
        <Text fontSize="12px" color="grey.60">{item.message}</Text>
        <Text fontSize="11px" color="grey.40" mt="2px">{item.createdAt.slice(0, 10)}</Text>
      </Flex>

      <Flex
        as="button"
        aria-label={item.read ? "Mark as unread" : "Mark as read"}
        align="center"
        gap="4px"
        flexShrink="0"
        cursor="pointer"
        opacity={loading ? 0.5 : 1}
        color={item.read ? "grey.40" : "brand.50"}
        fontSize="11px"
        fontWeight="600"
        onClick={(e) => {
          e.preventDefault();
          onToggleRead();
        }}
      >
        <Icon as={item.read ? FiCheckCircle : FiCircle} boxSize="14px" />
        {item.read ? "Read" : "Mark read"}
      </Flex>
    </Flex>
  );

  return item.href ? <NextLink href={item.href} style={{ textDecoration: "none" }}>{body}</NextLink> : body;
}
