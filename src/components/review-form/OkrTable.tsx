"use client";

import { Table } from "@chakra-ui/react";

import { OkrTableHeader } from "@/components/review-form/OkrTableHeader";
import { OkrTableRow } from "@/components/review-form/OkrTableRow";
import { totalWeightage, totalWeightageScore, type OkrObjective } from "@/lib/okrList";

type OkrTableProps = {
  objectives: OkrObjective[];
  isEmployeeEditing: boolean;
  isManagerEditing: boolean;
  onChangeRow: (id: string, patch: Partial<OkrObjective>) => void;
  onRemoveRow?: (id: string) => void;
};

export function OkrTable({ objectives, isEmployeeEditing, isManagerEditing, onChangeRow, onRemoveRow }: OkrTableProps) {
  return (
    <Table.Root size="lg" variant="outline" showColumnBorder bg="white" borderRadius="8px" overflow="hidden">
      <OkrTableHeader />

      <Table.Body>
        {objectives.map((objective, index) => (
          <OkrTableRow
            key={objective.id}
            index={index}
            objective={objective}
            isEmployeeEditing={isEmployeeEditing}
            isManagerEditing={isManagerEditing}
            onChange={(patch) => onChangeRow(objective.id, patch)}
            onRemove={onRemoveRow ? () => onRemoveRow(objective.id) : undefined}
          />
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row bg="grey.10" fontWeight="700" borderTopWidth="2px" borderTopColor="grey.30">
          <Table.Cell colSpan={2} fontSize="13px" px="16px" py="14px" verticalAlign="middle">Total</Table.Cell>
          <Table.Cell fontSize="13px" px="16px" py="14px" textAlign="center" verticalAlign="middle">{totalWeightage(objectives)}%</Table.Cell>
          <Table.Cell colSpan={3} px="16px" py="14px" />
          <Table.Cell fontSize="13px" px="16px" py="14px" textAlign="center" verticalAlign="middle" color="brand.50">
            {totalWeightageScore(objectives)}%
          </Table.Cell>
          <Table.Cell px="16px" py="14px" />
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
}
