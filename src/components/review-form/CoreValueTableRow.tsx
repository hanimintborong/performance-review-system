"use client";

import { Table } from "@chakra-ui/react";

import { RatingButtons } from "@/components/review-form/RatingButtons";
import { TableTextCell } from "@/components/review-form/TableTextCell";
import type { CoreValueRow as CoreValueRowType } from "@/lib/coreValueList";

const LABEL_SWATCHES = ["orange.10", "success.10", "warning.10", "info.10", "error.10"] as const;

type CoreValueTableRowProps = {
  index: number;
  row: CoreValueRowType;
  ratingScaleMax: number;
  isEmployeeEditing: boolean;
  isManagerEditing: boolean;
  onChange: (patch: Partial<CoreValueRowType>) => void;
};

export function CoreValueTableRow({ index, row, ratingScaleMax, isEmployeeEditing, isManagerEditing, onChange }: CoreValueTableRowProps) {
  const employeeMuted = isManagerEditing;
  const managerMuted = isEmployeeEditing;

  return (
    <Table.Row>
      <Table.Cell bg={LABEL_SWATCHES[index % LABEL_SWATCHES.length]} fontWeight="700" fontSize="12px" verticalAlign="middle" px="16px" py="18px">
        {row.label}
      </Table.Cell>
      <TableTextCell value={row.behaviour} editable={isEmployeeEditing} muted={employeeMuted} onChange={(v) => onChange({ behaviour: v })} />
      <Table.Cell verticalAlign="middle" textAlign="center" px="16px" py="18px" bg={employeeMuted ? "grey.10" : undefined} opacity={employeeMuted ? 0.5 : 1}>
        <RatingButtons compact max={ratingScaleMax} value={row.selfScore} readOnly={!isEmployeeEditing} onChange={(v) => onChange({ selfScore: v })} />
      </Table.Cell>
      <TableTextCell value={row.managerComment} editable={isManagerEditing} muted={managerMuted} onChange={(v) => onChange({ managerComment: v })} />
      <Table.Cell verticalAlign="middle" textAlign="center" px="16px" py="18px" bg={managerMuted ? "grey.10" : undefined} opacity={managerMuted ? 0.5 : 1}>
        <RatingButtons compact max={ratingScaleMax} value={row.managerScore} readOnly={!isManagerEditing} onChange={(v) => onChange({ managerScore: v })} />
      </Table.Cell>
    </Table.Row>
  );
}
