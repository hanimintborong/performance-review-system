"use client";

import { Flex, Text, Textarea } from "@chakra-ui/react";

type LabeledTextProps = {
  label: string;
  value: string;
  editable: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function LabeledText({ label, value, editable, onChange, placeholder }: LabeledTextProps) {
  return (
    <Flex direction="column" gap="4px">
      <Text fontSize="11px" fontWeight="600" color="grey.70">{label}</Text>
      {editable ? (
        <Textarea size="sm" bg="white" px="12px" py="8px" rows={2} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Text fontSize="12px" color="grey.80">{value || "—"}</Text>
      )}
    </Flex>
  );
}
