"use client";

import { Table } from "@chakra-ui/react";

const COLUMNS: [string, string?][] = [
  ["No", "50px"],
  ["Key Responsibilities / Objectives", "230px"],
  ["Weightage (%)", "110px"],
  ["Self-assessment Rating", "240px"],
  ["Actual Performance Achieved", "230px"],
  ["Manager's Final Rating", "240px"],
  ["Weighted Score", "110px"],
  ["Feedback / Remarks", "210px"],
];

export function OkrTableHeader() {
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
