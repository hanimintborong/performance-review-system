"use client";

import { Flex, Text } from "@chakra-ui/react";

import { LabeledText } from "@/components/review-form/LabeledText";
import { OkrManagerFields } from "@/components/review-form/OkrManagerFields";
import { OkrObjectiveHeader } from "@/components/review-form/OkrObjectiveHeader";
import { RatingButtons } from "@/components/review-form/RatingButtons";
import type { OkrObjective } from "@/lib/okrList";

type OkrObjectiveRowProps = {
  objective: OkrObjective;
  isEmployeeEditing: boolean;
  isManagerEditing: boolean;
  onChange: (patch: Partial<OkrObjective>) => void;
  onRemove?: () => void;
};

export function OkrObjectiveRow({ objective, isEmployeeEditing, isManagerEditing, onChange, onRemove }: OkrObjectiveRowProps) {
  const showManager = isManagerEditing || objective.managerScore > 0 || Boolean(objective.managerComment);

  return (
    <Flex direction="column" gap="8px" p="12px" bg="grey.10" borderRadius="8px">
      <OkrObjectiveHeader title={objective.title} weightage={objective.weightage} editable={isEmployeeEditing} onChange={onChange} onRemove={onRemove} />

      <Flex align="center" gap="10px">
        <Text fontSize="11px" fontWeight="700" color="grey.60">Self-assessment rating</Text>
        <RatingButtons max={5} value={objective.selfScore} readOnly={!isEmployeeEditing} onChange={(v) => onChange({ selfScore: v })} />
      </Flex>

      <LabeledText
        label="Actual performance achieved (details, examples, supporting docs)"
        value={objective.achievement}
        editable={isEmployeeEditing}
        onChange={(v) => onChange({ achievement: v })}
      />

      {showManager && <OkrManagerFields objective={objective} editable={isManagerEditing} onChange={onChange} />}
    </Flex>
  );
}
