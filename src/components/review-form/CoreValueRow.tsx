"use client";

import { Flex, Text } from "@chakra-ui/react";

import { CoreValueManagerFields } from "@/components/review-form/CoreValueManagerFields";
import { LabeledText } from "@/components/review-form/LabeledText";
import { RatingButtons } from "@/components/review-form/RatingButtons";
import type { CoreValueRow as CoreValueRowType } from "@/lib/coreValueList";

type CoreValueRowProps = {
  row: CoreValueRowType;
  ratingScaleMax: number;
  isEmployeeEditing: boolean;
  isManagerEditing: boolean;
  onChange: (patch: Partial<CoreValueRowType>) => void;
};

export function CoreValueRow({ row, ratingScaleMax, isEmployeeEditing, isManagerEditing, onChange }: CoreValueRowProps) {
  const showManager = isManagerEditing || row.managerScore > 0 || Boolean(row.managerComment);

  return (
    <Flex direction="column" gap="10px" p="14px" bg="white" borderWidth="1px" borderColor="grey.20" borderRadius="10px">
      <Text fontSize="13px" fontWeight="700" color="grey.80">{row.label}</Text>

      <Flex direction="column" gap="6px" pb="10px" borderBottomWidth="1px" borderColor="grey.10">
        <Text fontSize="11px" fontWeight="700" color="grey.60">Self-assessment rating</Text>
        <RatingButtons max={ratingScaleMax} value={row.selfScore} readOnly={!isEmployeeEditing} onChange={(v) => onChange({ selfScore: v })} />
      </Flex>

      <LabeledText
        label="Critical success behaviour / example"
        placeholder="Share a specific example that shows this value in action…"
        value={row.behaviour}
        editable={isEmployeeEditing}
        onChange={(v) => onChange({ behaviour: v })}
      />

      {showManager && (
        <CoreValueManagerFields row={row} ratingScaleMax={ratingScaleMax} editable={isManagerEditing} onChange={onChange} />
      )}
    </Flex>
  );
}
