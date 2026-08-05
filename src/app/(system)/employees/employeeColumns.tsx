import { Flex, Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { UserAvatar } from "@/components/common/UserAvatar";
import { ROLE_META } from "@/types/role";
import type { Employee } from "@/types/employee";

export const employeeColumns: DataTableColumn<Employee>[] = [
  {
    key: "name",
    label: "Employee",
    width: "1.6fr",
    render: (e) => (
      <Flex align="center" gap="10px">
        <UserAvatar initials={e.initials} />
        <Flex direction="column">
          <Text fontSize="13px" fontWeight="600" color="grey.80">{e.name}</Text>
          <Text fontSize="11px" color="grey.60">{e.jobTitle}</Text>
        </Flex>
      </Flex>
    ),
  },
  { key: "email", label: "Email", width: "1.4fr", render: (e) => e.email },
  { key: "department", label: "Department", width: "1.2fr", render: (e) => e.department },
  { key: "manager", label: "Manager", width: "1.2fr", render: (e) => e.managerName ?? "—" },
  { key: "role", label: "Role", width: "1fr", render: (e) => ROLE_META[e.systemRole].label },
];
