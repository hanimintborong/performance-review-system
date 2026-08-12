"use client";

import { Flex, Text } from "@chakra-ui/react";

import { LabeledText } from "@/components/review-form/LabeledText";
import { RatingButtons } from "@/components/review-form/RatingButtons";
import { weightageScore, type OkrObjective } from "@/lib/okrList";

const RATING_LEGEND = "1 Does not meet · 2 Below expectations · 3 Meets expectations · 4 Exceeds expectations · 5 Outstanding";

type OkrManagerFieldsProps = {
  objective: OkrObjective;
  editable: boolean;
  onChange: (patch: Partial<OkrObjective>) => void;
};

export function OkrManagerFields({ objective, editable, onChange }: OkrManagerFieldsProps) {
  return (
    <Flex direction="column" gap="8px" mt="4px" pt="8px" borderTopWidth="1px" borderColor="grey.20">
      <Flex align="center" gap="10px" wrap="wrap">
        <Text fontSize="11px" fontWeight="700" color="grey.60">Final rating</Text>
        <RatingButtons max={5} value={objective.managerScore} readOnly={!editable} onChange={(v) => onChange({ managerScore: v })} />
      </Flex>

      {editable && <Text fontSize="10px" color="grey.50">{RATING_LEGEND}</Text>}

      <Text fontSize="11px" fontWeight="700" color="success.70">
        Weightage score: {weightageScore(objective)}%
      </Text>

      <LabeledText
        label="Feedback / remarks"
        placeholder="Share your feedback on this objective…"
        value={objective.managerComment}
        editable={editable}
        onChange={(v) => onChange({ managerComment: v })}
      />
    </Flex>
  );
}
