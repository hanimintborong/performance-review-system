"use client";

import { Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

type OkrObjectiveHeaderProps = {
  title: string;
  weightage: number;
  editable: boolean;
  onChange: (patch: { title?: string; weightage?: number }) => void;
  onRemove?: () => void;
};

export function OkrObjectiveHeader({ title, weightage, editable, onChange, onRemove }: OkrObjectiveHeaderProps) {
  return (
    <Flex align="center" gap="8px">
      {editable ? (
        <Input size="sm" bg="white" flex="1" placeholder="Objective title" value={title} onChange={(e) => onChange({ title: e.target.value })} />
      ) : (
        <Text fontSize="13px" fontWeight="700" color="grey.80" flex="1">{title || "Untitled objective"}</Text>
      )}

      {editable ? (
        <Input size="sm" bg="white" type="number" w="90px" placeholder="Weightage %" value={weightage || ""} onChange={(e) => onChange({ weightage: Number(e.target.value) })} />
      ) : (
        <Text fontSize="12px" fontWeight="700" color="brand.50">{weightage}%</Text>
      )}

      {onRemove && (
        <IconButton aria-label="Remove objective" size="xs" variant="ghost" onClick={onRemove}>
          <FiTrash2 />
        </IconButton>
      )}
    </Flex>
  );
}
