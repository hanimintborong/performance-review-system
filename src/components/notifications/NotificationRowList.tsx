"use client";

import { useTransition } from "react";
import { Flex } from "@chakra-ui/react";

import { markNotificationsReadAction } from "@/components/notifications/notificationActions";
import { NotificationRow } from "@/components/notifications/NotificationRow";
import { EmptyState } from "@/components/common/EmptyState";
import type { NotificationView } from "@/lib/notificationView";

export function NotificationRowList({ items }: { items: NotificationView[] }) {
  const [isPending, startTransition] = useTransition();

  function toggleRead(item: NotificationView) {
    startTransition(() => {
      markNotificationsReadAction(item.sourceItems, !item.read);
    });
  }

  if (items.length === 0) {
    return <EmptyState message="No notifications right now." />;
  }

  return (
    <Flex direction="column">
      {items.map((item) => (
        <NotificationRow key={item.key} item={item} onToggleRead={() => toggleRead(item)} loading={isPending} />
      ))}
    </Flex>
  );
}
