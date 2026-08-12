import { Checkbox, Flex, Grid, Icon, Text } from "@chakra-ui/react";

import { DEPARTMENTS, DEPARTMENT_ICONS } from "@/constants/departments";

type DepartmentCheckboxesProps = {
  selected: string[];
  onChange: (departments: string[]) => void;
};

export function DepartmentCheckboxes({ selected, onChange }: DepartmentCheckboxesProps) {
  function toggle(department: string, checked: boolean) {
    onChange(checked ? [...selected, department] : selected.filter((d) => d !== department));
  }

  const allSelected = selected.length === DEPARTMENTS.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <Flex direction="column" gap="10px">
      <Grid templateColumns="repeat(3, 1fr)" gap="10px">
        {DEPARTMENTS.map((department) => {
          const active = selected.includes(department);
          return (
            <Checkbox.Root
              key={department}
              checked={active}
              onCheckedChange={(e) => toggle(department, e.checked === true)}
              borderWidth="1px"
              borderColor={active ? "brand.50" : "grey.20"}
              bg={active ? "brand.10" : "white"}
              borderRadius="8px"
              p="10px 12px"
              gap="10px"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>
                <Flex align="center" gap="8px">
                  <Flex
                    align="center"
                    justify="center"
                    w="28px"
                    h="28px"
                    borderRadius="6px"
                    bg={active ? "brand.50" : "grey.10"}
                    color={active ? "white" : "grey.60"}
                    flexShrink="0"
                  >
                    <Icon as={DEPARTMENT_ICONS[department]} boxSize="14px" />
                  </Flex>
                  <Text fontSize="12px" fontWeight="600" color="grey.80">{department}</Text>
                </Flex>
              </Checkbox.Label>
            </Checkbox.Root>
          );
        })}
      </Grid>

      <Checkbox.Root
        size="sm"
        checked={allSelected ? true : someSelected ? "indeterminate" : false}
        onCheckedChange={(e) => onChange(e.checked ? [...DEPARTMENTS] : [])}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
        <Checkbox.Label fontSize="11px" fontWeight="600" color="grey.60">Select all</Checkbox.Label>
      </Checkbox.Root>
    </Flex>
  );
}
