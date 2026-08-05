"use client";

import { Box } from "@chakra-ui/react";

import { DataTableRow, type DataTableColumn } from "@/components/common/DataTableRow";
import { EmptyState } from "@/components/common/EmptyState";

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
};

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  const template = columns.map((column) => column.width).join(" ");

  return (
    <Box>
      <DataTableRow columns={columns} template={template} header />

      {rows.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        rows.map((row) => (
          <DataTableRow key={rowKey(row)} row={row} columns={columns} template={template} />
        ))
      )}
    </Box>
  );
}
