"use client";

import { Flex, Text, Textarea } from "@chakra-ui/react";

type LabeledTextProps = {
  label: string;
  value: string;
  editable: boolean;
  onChange: (value: string) => void;
};

export function LabeledText({ label, value, editable, onChange }: LabeledTextProps) {
  return (
    <Flex direction="column" gap="4px">
      <Text fontSize="11px" color="grey.60">{label}</Text>
      {editable ? (
        <Textarea size="sm" bg="white" rows={2} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Text fontSize="12px" color="grey.80">{value || "—"}</Text>
      )}
    </Flex>
  );
}
