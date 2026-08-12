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
    <Flex direction="column" gap="10px" p="14px" bg="white" borderWidth="1px" borderColor="grey.20" borderRadius="10px">
      <OkrObjectiveHeader title={objective.title} weightage={objective.weightage} editable={isEmployeeEditing} onChange={onChange} onRemove={onRemove} />

      <Flex direction="column" gap="6px" pb="10px" borderBottomWidth="1px" borderColor="grey.10">
        <Text fontSize="11px" fontWeight="700" color="grey.60">Self-assessment rating</Text>
        <RatingButtons max={5} value={objective.selfScore} readOnly={!isEmployeeEditing} onChange={(v) => onChange({ selfScore: v })} />
      </Flex>

      <LabeledText
        label="Actual performance achieved (details, examples, supporting docs)"
        placeholder="Describe what you delivered, with examples or supporting docs…"
        value={objective.achievement}
        editable={isEmployeeEditing}
        onChange={(v) => onChange({ achievement: v })}
      />

      {showManager && <OkrManagerFields objective={objective} editable={isManagerEditing} onChange={onChange} />}
    </Flex>
  );
}
