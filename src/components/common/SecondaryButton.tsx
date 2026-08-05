import { Button, type ButtonProps } from "@chakra-ui/react";

export function SecondaryButton(props: ButtonProps) {
  return (
    <Button
      bg="transparent"
      color="brand.50"
      borderWidth="1px"
      borderColor="brand.50"
      borderRadius="8px"
      fontSize="13px"
      fontWeight="700"
      h="36px"
      px="14px"
      _hover={{ bg: "brand.10" }}
      _active={{ bg: "brand.20" }}
      {...props}
    />
  );
}
