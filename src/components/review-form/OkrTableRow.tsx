"use client";

import { IconButton, Input, Table, Text } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

import { RatingButtons } from "@/components/review-form/RatingButtons";
import { TableTextCell } from "@/components/review-form/TableTextCell";
import { weightageScore, type OkrObjective } from "@/lib/okrList";

type OkrTableRowProps = {
  index: number;
  objective: OkrObjective;
  isEmployeeEditing: boolean;
  isManagerEditing: boolean;
  onChange: (patch: Partial<OkrObjective>) => void;
  onRemove?: () => void;
};

export function OkrTableRow({ index, objective, isEmployeeEditing, isManagerEditing, onChange, onRemove }: OkrTableRowProps) {
  const employeeMuted = isManagerEditing;
  const managerMuted = isEmployeeEditing;

  return (
    <Table.Row>
      <Table.Cell fontSize="12px" textAlign="center" verticalAlign="middle" px="16px" py="18px">
        {index + 1}
        {onRemove && <IconButton aria-label="Remove objective" size="2xs" variant="ghost" ml="4px" onClick={onRemove}><FiTrash2 /></IconButton>}
      </Table.Cell>
      <Table.Cell verticalAlign="middle" px="16px" py="18px" bg={employeeMuted ? "grey.10" : undefined} opacity={employeeMuted ? 0.5 : 1}>
        {isEmployeeEditing
          ? <Input size="sm" bg="white" fontSize="12px" px="14px" h="38px" value={objective.title} placeholder="Objective title" onChange={(e) => onChange({ title: e.target.value })} />
          : <Text fontSize="12px">{objective.title || "—"}</Text>}
      </Table.Cell>
      <Table.Cell textAlign="center" verticalAlign="middle" px="16px" py="18px" bg={employeeMuted ? "grey.10" : undefined} opacity={employeeMuted ? 0.5 : 1}>
        {isEmployeeEditing
          ? <Input size="sm" bg="white" fontSize="12px" px="14px" h="38px" textAlign="center" type="number" value={objective.weightage || ""} onChange={(e) => onChange({ weightage: Number(e.target.value) })} />
          : <Text fontSize="12px">{objective.weightage}%</Text>}
      </Table.Cell>
      <Table.Cell verticalAlign="middle" textAlign="center" px="16px" py="18px" bg={employeeMuted ? "grey.10" : undefined} opacity={employeeMuted ? 0.5 : 1}>
        <RatingButtons compact max={5} value={objective.selfScore} readOnly={!isEmployeeEditing} onChange={(v) => onChange({ selfScore: v })} />
      </Table.Cell>
      <TableTextCell value={objective.achievement} editable={isEmployeeEditing} muted={employeeMuted} onChange={(v) => onChange({ achievement: v })} />
      <Table.Cell verticalAlign="middle" textAlign="center" px="16px" py="18px" bg={managerMuted ? "grey.10" : undefined} opacity={managerMuted ? 0.5 : 1}>
        <RatingButtons compact max={5} value={objective.managerScore} readOnly={!isManagerEditing} onChange={(v) => onChange({ managerScore: v })} />
      </Table.Cell>
      <Table.Cell bg="grey.10" fontWeight="700" fontSize="12px" textAlign="center" verticalAlign="middle" px="16px" py="18px">
        {weightageScore(objective)}%
      </Table.Cell>
      <TableTextCell value={objective.managerComment} editable={isManagerEditing} muted={managerMuted} onChange={(v) => onChange({ managerComment: v })} />
    </Table.Row>
  );
}
