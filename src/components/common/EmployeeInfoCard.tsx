import { Flex, Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import { UserAvatar } from "@/components/common/UserAvatar";
import type { Employee } from "@/types/employee";

type EmployeeInfoCardProps = {
  employee: Employee;
};

export function EmployeeInfoCard({ employee }: EmployeeInfoCardProps) {
  return (
    <AppCard p="16px 20px">
      <Flex align="center" gap="14px">
        <UserAvatar initials={employee.initials} size="44px" />

        <Flex direction="column" minW="0">
          <Text fontSize="15px" fontWeight="700" color="grey.80">
            {employee.name}
          </Text>
          <Text fontSize="12px" color="grey.60">
            {employee.jobTitle} · {employee.department}
          </Text>
          <Text fontSize="12px" color="grey.40">
            {employee.email}
          </Text>
        </Flex>
      </Flex>
    </AppCard>
  );
}
