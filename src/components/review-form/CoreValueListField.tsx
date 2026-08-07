"use client";

import { Flex, Text } from "@chakra-ui/react";

import { CoreValueRow } from "@/components/review-form/CoreValueRow";
import { buildCoreValueRows, stringifyCoreValueList } from "@/lib/coreValueList";
import type { Respondent } from "@/types/template";

type CoreValueListFieldProps = {
  value: string;
  onChange?: (value: string) => void;
  editableRespondent?: Respondent;
  labels: string[];
  ratingScaleMax: number;
};

export function CoreValueListField({ value, onChange, editableRespondent, labels, ratingScaleMax }: CoreValueListFieldProps) {
  const rows = buildCoreValueRows(labels, value);
  const isEmployeeEditing = editableRespondent === "employee";
  const isManagerEditing = editableRespondent === "manager";

  function updateRow(label: string, patch: Partial<(typeof rows)[number]>) {
    onChange?.(stringifyCoreValueList(rows.map((r) => (r.label === label ? { ...r, ...patch } : r))));
  }

  if (labels.length === 0) {
    return <Text fontSize="12px" color="grey.50">HR has not listed any core values for this question yet.</Text>;
  }

  return (
    <Flex direction="column" gap="10px">
      {rows.map((row) => (
        <CoreValueRow
          key={row.label}
          row={row}
          ratingScaleMax={ratingScaleMax}
          isEmployeeEditing={isEmployeeEditing}
          isManagerEditing={isManagerEditing}
          onChange={(patch) => updateRow(row.label, patch)}
        />
      ))}
    </Flex>
  );
}
