"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

import { OkrTable } from "@/components/review-form/OkrTable";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { blankOkrObjective, parseOkrList, stringifyOkrList, totalWeightage } from "@/lib/okrList";
import type { Respondent } from "@/types/template";

type OkrListFieldProps = {
  value: string;
  onChange?: (value: string) => void;
  editableRespondent?: Respondent;
  targetWeightage: number;
};

export function OkrListField({ value, onChange, editableRespondent, targetWeightage }: OkrListFieldProps) {
  const objectives = parseOkrList(value);
  const isEmployeeEditing = editableRespondent === "employee";
  const isManagerEditing = editableRespondent === "manager";
  const weightageUsed = totalWeightage(objectives);

  function commit(next: typeof objectives) {
    onChange?.(stringifyOkrList(next));
  }

  return (
    <Flex direction="column" gap="8px">
      {objectives.length === 0
        ? <Text fontSize="12px" color="grey.50">No objectives added yet.</Text>
        : (
          <Box overflowX="auto">
            <OkrTable
              objectives={objectives}
              isEmployeeEditing={isEmployeeEditing}
              isManagerEditing={isManagerEditing}
              onChangeRow={(id, patch) => commit(objectives.map((o) => (o.id === id ? { ...o, ...patch } : o)))}
              onRemoveRow={isEmployeeEditing ? (id) => commit(objectives.filter((o) => o.id !== id)) : undefined}
            />
          </Box>
        )}

      {isEmployeeEditing && (
        <Flex align="center" justify="space-between" wrap="wrap" gap="8px">
          <PrimaryButton size="xs" type="button" onClick={() => commit([...objectives, blankOkrObjective(crypto.randomUUID())])}>
            + Add objective
          </PrimaryButton>
          <Text fontSize="11px" fontWeight="700" color={weightageUsed === targetWeightage ? "success.70" : "error.50"}>
            Weightage used: {weightageUsed}% / {targetWeightage}%
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
