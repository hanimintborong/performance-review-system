import { Flex } from "@chakra-ui/react";

type MultiSelectChipsProps = {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
};

export function MultiSelectChips({ options, selected, onToggle }: MultiSelectChipsProps) {
  return (
    <Flex gap="6px" flexWrap="wrap">
      {options.map((option) => {
        const active = selected.includes(option);

        return (
          <Flex
            as="button"
            key={option}
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
            onClick={() => onToggle(option)}
          >
            {option}
          </Flex>
        );
      })}
    </Flex>
  );
}
