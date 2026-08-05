import { Flex, Text } from "@chakra-ui/react";

import { PermissionMatrix } from "@/app/(system)/roles-access/PermissionMatrix";
import { UsersSection } from "@/app/(system)/roles-access/UsersSection";
import { AppCard } from "@/components/common/AppCard";
import { getEmployees } from "@/data/queries";
import { listSystemUsers } from "@/lib/userRoles";

export default async function RolesAccessPage() {
  const [users, employees] = await Promise.all([listSystemUsers(), getEmployees()]);
  const employeeById = new Map(employees.map((e) => [e.employeeId, e]));

  const userRows = users.map((user) => {
    const employee = employeeById.get(user.employeeId);
    return {
      ...user,
      employeeName: employee?.name ?? "Unknown employee",
      employeeInitials: employee?.initials ?? "?",
      employeeJobTitle: employee?.jobTitle ?? "",
    };
  });

  return (
    <Flex direction="column" gap="14px">
      <AppCard p="16px 20px">
        <Text fontSize="15px" fontWeight="700" color="grey.80" mb="4px">Permission matrix</Text>
        <Text fontSize="12px" color="grey.60" mb="12px">What each role can see and do across the system.</Text>
        <PermissionMatrix />
      </AppCard>

      <UsersSection users={userRows} employees={employees} />
    </Flex>
  );
}
