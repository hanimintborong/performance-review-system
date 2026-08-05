import { Box, Flex, Input, type FlexProps } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

type SearchInputProps = FlexProps & {
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
};

export function SearchInput({
  placeholder = "Search…",
  value,
  onValueChange,
  ...rest
}: SearchInputProps) {
  return (
    <Flex align="center" gap="8px" px="12px" bg="grey.10" borderRadius="8px" {...rest}>
      <Box color="grey.40" flexShrink="0">
        <FiSearch size={15} />
      </Box>

      <Input
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        variant="flushed"
        border="none"
        outline="none"
        fontSize="13px"
        color="grey.80"
        _placeholder={{ color: "grey.40" }}
        _focus={{ boxShadow: "none" }}
      />
    </Flex>
  );
}
