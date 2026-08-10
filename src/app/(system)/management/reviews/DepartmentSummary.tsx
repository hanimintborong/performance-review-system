import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { DEPARTMENTS } from "@/constants/departments";
import type { ReviewRow } from "@/data/queries";

export function DepartmentSummary({ rows }: { rows: ReviewRow[] }) {
  const summaries = DEPARTMENTS.map((dept) => {
    const deptRows = rows.filter((r) => r.employee.department === dept);
    const completed = deptRows.filter((r) => r.status === "Finalised").length;
    return { dept, completed, total: deptRows.length };
  }).filter((d) => d.total > 0);

  return (
    <AppCard p="16px 20px">
      <Text fontSize="15px" fontWeight="700" color="grey.80" mb="12px">Department summary</Text>
      <Flex direction="column" gap="12px">
        {summaries.map((d) => {
          const pct = d.total > 0 ? Math.round((d.completed / d.total) * 100) : 0;
          return (
            <Flex key={d.dept} align="center" gap="12px" display="grid" gridTemplateColumns="180px 1fr 70px">
              <Text fontSize="13px" fontWeight="600" color="grey.80">{d.dept}</Text>
              <Flex h="8px" bg="grey.10" borderRadius="full" overflow="hidden">
                <Flex h="100%" w={`${pct}%`} bg={pct === 100 ? "success.50" : "brand.50"} borderRadius="full" />
              </Flex>
              <Text fontSize="12px" color="grey.60" textAlign="right">{d.completed} / {d.total}</Text>
            </Flex>
          );
        })}
      </Flex>
    </AppCard>
  );
}
