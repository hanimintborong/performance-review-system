import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import type { WfhRequestRow } from "@/data/queries";

export function TeamWfhUpcoming({ requests }: { requests: WfhRequestRow[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = requests
    .filter((r) => r.status === "Approved" && r.date >= today)
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .slice(0, 8);

  return (
    <AppCard p="16px 20px">
      <Text fontSize="13px" fontWeight="700" color="grey.80" mb="10px">Upcoming team WFH</Text>

      {upcoming.length === 0 ? (
        <Text fontSize="12px" color="grey.60">No approved WFH days coming up.</Text>
      ) : (
        <Flex direction="column" gap="8px">
          {upcoming.map((r) => (
            <Flex key={r.requestId} align="center" gap="10px" fontSize="12px">
              <Text fontWeight="700" color="brand.70" w="90px" flexShrink="0">{r.date}</Text>
              <Text color="grey.80" flex="1">{r.employee.name}</Text>
              <Text color="grey.50">{r.duration}</Text>
            </Flex>
          ))}
        </Flex>
      )}
    </AppCard>
  );
}
