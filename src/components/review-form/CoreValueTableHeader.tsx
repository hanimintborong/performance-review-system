"use client";

import { Table } from "@chakra-ui/react";

const COLUMNS: [string, string?][] = [
  ["Core Values", "170px"],
  ["Critical Success Behaviours", "250px"],
  ["Self-assessment Rating", "240px"],
  ["Manager Feedback / Remarks", "250px"],
  ["Manager's Final Rating", "240px"],
];

export function CoreValueTableHeader() {
  return (
    <Table.Header>
      <Table.Row bg="grey.10">
        {COLUMNS.map(([label, width]) => (
          <Table.ColumnHeader key={label} w={width} fontSize="11px" textAlign="center" verticalAlign="middle" px="12px" py="14px">
            {label}
          </Table.ColumnHeader>
        ))}
      </Table.Row>
    </Table.Header>
  );
}
