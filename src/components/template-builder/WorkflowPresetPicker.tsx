"use client";

import { RadioCard } from "@chakra-ui/react";

import { WORKFLOW_PRESETS } from "@/constants/workflowPresets";
import type { WorkflowType } from "@/types/template";

type WorkflowPresetPickerProps = {
  value: WorkflowType;
  onChange: (value: WorkflowType) => void;
  locked?: boolean;
};

export function WorkflowPresetPicker({ value, onChange, locked }: WorkflowPresetPickerProps) {
  return (
    <RadioCard.Root
      value={value}
      onValueChange={(e) => e.value && onChange(e.value as WorkflowType)}
      disabled={locked}
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      gap="10px"
    >
      {WORKFLOW_PRESETS.map((preset) => (
        <RadioCard.Item key={preset.value} value={preset.value}>
          <RadioCard.ItemHiddenInput />
          <RadioCard.ItemControl p="12px" borderRadius="10px">
            <RadioCard.ItemContent>
              <RadioCard.ItemText fontSize="12px" fontWeight="700">{preset.label}</RadioCard.ItemText>
              <RadioCard.ItemDescription fontSize="11px" color="grey.60">{preset.description}</RadioCard.ItemDescription>
            </RadioCard.ItemContent>
            <RadioCard.ItemIndicator />
          </RadioCard.ItemControl>
        </RadioCard.Item>
      ))}
    </RadioCard.Root>
  );
}
