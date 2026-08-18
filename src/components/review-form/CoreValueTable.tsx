"use client";

import { Table } from "@chakra-ui/react";

import { CoreValueTableHeader } from "@/components/review-form/CoreValueTableHeader";
import { CoreValueTableRow } from "@/components/review-form/CoreValueTableRow";
import { averageRating, weightedScore, type CoreValueRow } from "@/lib/coreValueList";

type CoreValueTableProps = {
  rows: CoreValueRow[];
  ratingScaleMax: number;
  isEmployeeEditing: boolean;
  isManagerEditing: boolean;
  sectionWeightage?: number;
  onChangeRow: (label: string, patch: Partial<CoreValueRow>) => void;
};

export function CoreValueTable({ rows, ratingScaleMax, isEmployeeEditing, isManagerEditing, sectionWeightage, onChangeRow }: CoreValueTableProps) {
  const avg = averageRating(rows, ratingScaleMax);

  return (
    <Table.Root size="lg" variant="outline" showColumnBorder bg="white" borderRadius="8px" overflow="hidden">
      <CoreValueTableHeader />

      <Table.Body>
        {rows.map((row, index) => (
          <CoreValueTableRow
            key={row.label}
            index={index}
            row={row}
            ratingScaleMax={ratingScaleMax}
            isEmployeeEditing={isEmployeeEditing}
            isManagerEditing={isManagerEditing}
            onChange={(patch) => onChangeRow(row.label, patch)}
          />
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row bg="grey.10" fontWeight="700" borderTopWidth="2px" borderTopColor="grey.30">
          <Table.Cell colSpan={4} fontSize="13px" px="16px" py="14px" verticalAlign="middle">Average Rating</Table.Cell>
          <Table.Cell fontSize="13px" px="16px" py="14px" textAlign="center" verticalAlign="middle" color="brand.50">
            {avg ?? "—"}
          </Table.Cell>
        </Table.Row>
        <Table.Row bg="grey.10" fontWeight="700">
          <Table.Cell colSpan={4} fontSize="13px" px="16px" py="14px" verticalAlign="middle">
            Total Weightage Score {sectionWeightage ? `(of ${sectionWeightage}%)` : ""}
          </Table.Cell>
          <Table.Cell fontSize="13px" px="16px" py="14px" textAlign="center" verticalAlign="middle" color="brand.50">
            {sectionWeightage ? `${weightedScore(rows, ratingScaleMax, sectionWeightage)}%` : "—"}
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
}
