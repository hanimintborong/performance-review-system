"use client";

import { Box, Text } from "@chakra-ui/react";

import { CoreValueTable } from "@/components/review-form/CoreValueTable";
import { buildCoreValueRows, stringifyCoreValueList } from "@/lib/coreValueList";
import type { Respondent } from "@/types/template";

type CoreValueListFieldProps = {
  value: string;
  onChange?: (value: string) => void;
  editableRespondent?: Respondent;
  labels: string[];
  ratingScaleMax: number;
  sectionWeightage?: number;
};

export function CoreValueListField({ value, onChange, editableRespondent, labels, ratingScaleMax, sectionWeightage }: CoreValueListFieldProps) {
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
    <Box overflowX="auto">
      <CoreValueTable
        rows={rows}
        ratingScaleMax={ratingScaleMax}
        isEmployeeEditing={isEmployeeEditing}
        isManagerEditing={isManagerEditing}
        sectionWeightage={sectionWeightage}
        onChangeRow={updateRow}
      />
    </Box>
  );
}
