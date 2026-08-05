import { Button, type ButtonProps } from "@chakra-ui/react";

export function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      bg="brand.50"
      color="white"
      borderRadius="8px"
      fontSize="13px"
      fontWeight="700"
      h="36px"
      px="14px"
      _hover={{ bg: "brand.70" }}
      _active={{ bg: "brand.80" }}
      {...props}
    />
  );
}
