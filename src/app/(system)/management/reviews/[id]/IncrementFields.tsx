"use client";

import { Flex, Input, NumberInput, Text } from "@chakra-ui/react";

type IncrementFieldsProps = {
  percentage: number | null;
  effectiveDate: string;
  onPercentageChange: (value: number | null) => void;
  onEffectiveDateChange: (value: string) => void;
};

export function IncrementFields({ percentage, effectiveDate, onPercentageChange, onEffectiveDateChange }: IncrementFieldsProps) {
  return (
    <Flex gap="12px">
      <Flex direction="column" gap="4px" flex="1">
        <Text fontSize="11px" fontWeight="700" color="grey.60">Increment %</Text>
        <NumberInput.Root
          value={percentage === null ? "" : String(percentage)}
          min={0}
          max={100}
          onValueChange={(e) => onPercentageChange(Number.isNaN(e.valueAsNumber) ? null : e.valueAsNumber)}
          size="sm"
        >
          <NumberInput.Input placeholder="e.g. 5" px="12px" />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
      </Flex>

      <Flex direction="column" gap="4px" flex="1">
        <Text fontSize="11px" fontWeight="700" color="grey.60">Effective date</Text>
        <Input size="sm" px="12px" type="date" value={effectiveDate} onChange={(e) => onEffectiveDateChange(e.target.value)} />
      </Flex>
    </Flex>
  );
}
