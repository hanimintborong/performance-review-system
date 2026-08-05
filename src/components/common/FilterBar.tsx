import { Flex } from "@chakra-ui/react";

export type FilterOption = {
  key: string;
  label: string;
};

type FilterBarProps = {
  options: FilterOption[];
  activeKey: string;
  onChange: (key: string) => void;
};

export function FilterBar({ options, activeKey, onChange }: FilterBarProps) {
  return (
    <Flex gap="6px" flexShrink="0" flexWrap="wrap">
      {options.map((option) => {
        const active = option.key === activeKey;

        return (
          <Flex
            as="button"
            key={option.key}
            align="center"
            borderWidth="1px"
            borderColor={active ? "brand.50" : "grey.30"}
            bg={active ? "brand.10" : "white"}
            color={active ? "brand.70" : "grey.60"}
            fontSize="12px"
            fontWeight="700"
            px="11px"
            py="5px"
            borderRadius="full"
            cursor="pointer"
            onClick={() => onChange(option.key)}
          >
            {option.label}
          </Flex>
        );
      })}
    </Flex>
  );
}
