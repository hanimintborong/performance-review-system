import { Box, Flex, Text } from "@chakra-ui/react";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
};

export function ToggleSwitch({ checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <Flex align="center" gap="10px" p="10px 12px" bg="grey.10" borderRadius="8px">
      <Box
        as="button"
        aria-label={label}
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        w="36px"
        h="20px"
        borderRadius="full"
        border="0"
        bg={checked ? "brand.50" : "grey.30"}
        position="relative"
        flexShrink="0"
        cursor="pointer"
        transition="background .15s"
        p="0"
      >
        <Box
          position="absolute"
          top="2px"
          left={checked ? "18px" : "2px"}
          w="16px"
          h="16px"
          borderRadius="full"
          bg="white"
          transition="left .15s"
        />
      </Box>

      <Flex direction="column" flex="1">
        <Text fontSize="12px" fontWeight="700" color="grey.80">{label}</Text>
        {description && <Text fontSize="11px" color="grey.60">{description}</Text>}
      </Flex>
    </Flex>
  );
}
