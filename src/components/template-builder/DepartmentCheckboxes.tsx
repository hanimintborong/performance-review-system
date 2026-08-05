import { Checkbox, Flex } from "@chakra-ui/react";

import { DEPARTMENTS } from "@/constants/departments";

type DepartmentCheckboxesProps = {
  selected: string[];
  onChange: (departments: string[]) => void;
};

export function DepartmentCheckboxes({ selected, onChange }: DepartmentCheckboxesProps) {
  function toggle(department: string, checked: boolean) {
    onChange(checked ? [...selected, department] : selected.filter((d) => d !== department));
  }

  return (
    <Flex gap="14px" flexWrap="wrap">
      {DEPARTMENTS.map((department) => (
        <Checkbox.Root
          key={department}
          checked={selected.includes(department)}
          onCheckedChange={(e) => toggle(department, e.checked === true)}
          size="sm"
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label fontSize="12px">{department}</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Flex>
  );
}
