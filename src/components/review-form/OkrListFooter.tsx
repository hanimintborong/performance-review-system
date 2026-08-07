"use client";

import { Flex, Text } from "@chakra-ui/react";

import { PrimaryButton } from "@/components/common/PrimaryButton";

type OkrListFooterProps = {
  isEmployeeEditing: boolean;
  weightageUsed: number;
  targetWeightage: number;
  totalScore: number;
  hasObjectives: boolean;
  onAdd: () => void;
};

export function OkrListFooter({ isEmployeeEditing, weightageUsed, targetWeightage, totalScore, hasObjectives, onAdd }: OkrListFooterProps) {
  return (
    <>
      {isEmployeeEditing && (
        <Flex align="center" justify="space-between" wrap="wrap" gap="8px">
          <PrimaryButton size="xs" type="button" onClick={onAdd}>+ Add objective</PrimaryButton>
          <Text fontSize="11px" fontWeight="700" color={weightageUsed === targetWeightage ? "success.70" : "error.50"}>
            Weightage used: {weightageUsed}% / {targetWeightage}%
          </Text>
        </Flex>
      )}

      {hasObjectives && (
        <Text fontSize="11px" fontWeight="700" color="grey.60" alignSelf="flex-end">
          Total weightage score: {totalScore}%
        </Text>
      )}
    </>
  );
}
