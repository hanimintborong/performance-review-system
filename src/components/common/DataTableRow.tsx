"use client";

import type { ReactNode } from "react";
import { Box, Grid } from "@chakra-ui/react";

export type DataTableColumn<T> = {
  key: string;
  label: string;
  width: string;
  align?: "left" | "right";
  render: (row: T) => ReactNode;
};

type DataTableRowProps<T> = {
  row?: T;
  columns: DataTableColumn<T>[];
  template: string;
  header?: boolean;
};

export function DataTableRow<T>({ row, columns, template, header }: DataTableRowProps<T>) {
  return (
    <Grid
      templateColumns={template}
      gap="8px"
      alignItems="center"
      px="20px"
      py={header ? "8px" : "10px"}
      bg={header ? "grey.10" : "transparent"}
      borderBottomWidth={header ? "0" : "1px"}
      borderColor="grey.10"
      fontSize={header ? "11px" : "13px"}
      fontWeight={header ? "700" : "400"}
      color={header ? "grey.60" : "grey.80"}
    >
      {columns.map((column) => (
        <Box key={column.key} textAlign={column.align ?? "left"} minW="0">
          {header || !row ? column.label : column.render(row)}
        </Box>
      ))}
    </Grid>
  );
}
