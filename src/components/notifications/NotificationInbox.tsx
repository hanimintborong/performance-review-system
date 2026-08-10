import { Flex, Text } from "@chakra-ui/react";

import { NotificationRowList } from "@/components/notifications/NotificationRowList";
import { AppCard } from "@/components/common/AppCard";
import type { NotificationView } from "@/lib/notificationView";

type NotificationInboxProps = {
  title: string;
  description: string;
  items: NotificationView[];
};

export function NotificationInbox({ title, description, items }: NotificationInboxProps) {
  const unread = items.filter((i) => !i.read).length;

  return (
    <AppCard>
      <Flex direction="column" gap="2px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Text fontSize="15px" fontWeight="700" color="grey.80">{title}</Text>
        <Text fontSize="12px" color="grey.60">{description} · {unread} unread</Text>
      </Flex>

      <NotificationRowList items={items} />
    </AppCard>
  );
}
