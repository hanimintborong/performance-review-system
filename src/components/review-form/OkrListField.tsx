"use client";

import { Flex, Text } from "@chakra-ui/react";

import { OkrListFooter } from "@/components/review-form/OkrListFooter";
import { OkrObjectiveRow } from "@/components/review-form/OkrObjectiveRow";
import { blankOkrObjective, parseOkrList, stringifyOkrList, totalWeightage, totalWeightageScore, type OkrObjective } from "@/lib/okrList";
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

  function commit(next: OkrObjective[]) {
    onChange?.(stringifyOkrList(next));
  }

  return (
    <Flex direction="column" gap="10px">
      {objectives.length === 0 && <Text fontSize="12px" color="grey.50">No objectives added yet.</Text>}
      {objectives.map((objective) => (
        <OkrObjectiveRow
          key={objective.id}
          objective={objective}
          isEmployeeEditing={isEmployeeEditing}
          isManagerEditing={isManagerEditing}
          onChange={(patch) => commit(objectives.map((o) => (o.id === objective.id ? { ...o, ...patch } : o)))}
          onRemove={isEmployeeEditing ? () => commit(objectives.filter((o) => o.id !== objective.id)) : undefined}
        />
      ))}

      <OkrListFooter
        isEmployeeEditing={isEmployeeEditing}
        weightageUsed={totalWeightage(objectives)}
        targetWeightage={targetWeightage}
        totalScore={totalWeightageScore(objectives)}
        hasObjectives={objectives.length > 0}
        onAdd={() => commit([...objectives, blankOkrObjective(crypto.randomUUID())])}
      />
    </Flex>
  );
}
