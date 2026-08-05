import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { DEPARTMENTS } from "@/constants/departments";
import type { ReviewRow } from "@/data/queries";

export function DepartmentProgress({ rows }: { rows: ReviewRow[] }) {
  const rowsByDept = DEPARTMENTS.map((department) => {
    const deptRows = rows.filter((r) => r.employee.department === department);
    const completed = deptRows.filter((r) => r.status === "Finalised").length;
    return { department, completed, total: deptRows.length };
  }).filter((d) => d.total > 0);

  return (
    <AppCard p="16px 20px">
      <Text fontSize="15px" fontWeight="700" color="grey.80" mb="14px">Progress by department</Text>

      <Flex direction="column" gap="12px">
        {rowsByDept.length === 0 && <Text fontSize="12px" color="grey.60">No participants yet.</Text>}

        {rowsByDept.map((d) => {
          const pct = Math.round((d.completed / d.total) * 100);
          return (
            <Flex key={d.department} align="center" gap="12px" display="grid" gridTemplateColumns="150px 1fr 60px">
              <Text fontSize="13px" fontWeight="600" color="grey.80">{d.department}</Text>
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
