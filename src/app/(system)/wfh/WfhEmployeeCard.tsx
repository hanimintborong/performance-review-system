import { Flex, Text } from "@chakra-ui/react";

import { UserAvatar } from "@/components/common/UserAvatar";
import type { Employee } from "@/types/employee";

export function WfhEmployeeCard({ employee }: { employee: Employee }) {
  return (
    <Flex align="center" gap="10px" bg="grey.10" borderRadius="8px" p="12px 14px">
      <UserAvatar initials={employee.initials} size="36px" />
      <Flex direction="column">
        <Text fontSize="13px" fontWeight="700" color="grey.80">{employee.name}</Text>
        <Text fontSize="11px" color="grey.50">{employee.department}</Text>
      </Flex>
    </Flex>
  );
}
