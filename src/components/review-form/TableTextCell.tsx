"use client";

import { Table, Text, Textarea } from "@chakra-ui/react";

type TableTextCellProps = {
  value: string;
  editable: boolean;
  muted?: boolean;
  onChange: (value: string) => void;
};

export function TableTextCell({ value, editable, muted, onChange }: TableTextCellProps) {
  return (
    <Table.Cell verticalAlign="middle" px={editable ? "8px" : "16px"} py="18px" bg={muted ? "grey.10" : undefined} opacity={muted ? 0.5 : 1}>
      {editable
        ? <Textarea size="sm" bg="white" fontSize="12px" px="14px" py="10px" rows={3} resize="vertical" value={value} onChange={(e) => onChange(e.target.value)} />
        : <Text fontSize="12px">{value || "—"}</Text>}
    </Table.Cell>
  );
}
