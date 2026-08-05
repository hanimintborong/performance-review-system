"use client";

import { Fragment, type ReactNode } from "react";
import { Grid, Icon, Text } from "@chakra-ui/react";
import { FiCheck, FiMinus } from "react-icons/fi";

import { mockPermissions } from "@/data/mockPermissions";

const COLUMNS: { key: "hr" | "manager" | "employee" | "topManagement"; label: string }[] = [
  { key: "hr", label: "HR" },
  { key: "manager", label: "Manager" },
  { key: "employee", label: "Employee" },
  { key: "topManagement", label: "Top Mgmt" },
];

export function PermissionMatrix() {
  return (
    <Grid templateColumns="2fr repeat(4, 90px)" gap="0">
      <HeaderCell>Capability</HeaderCell>
      {COLUMNS.map((c) => <HeaderCell key={c.key} center>{c.label}</HeaderCell>)}

      {mockPermissions.map((row) => (
        <Fragment key={row.capability}>
          <Text fontSize="12px" color="grey.80" py="9px" borderBottomWidth="1px" borderColor="grey.10">
            {row.capability}
          </Text>
          {COLUMNS.map((c) => (
            <Cell key={`${row.capability}-${c.key}`} checked={row[c.key]} />
          ))}
        </Fragment>
      ))}
    </Grid>
  );
}

function HeaderCell({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <Text fontSize="11px" fontWeight="700" color="grey.60" bg="grey.10" py="8px" px="4px" textAlign={center ? "center" : "left"}>
      {children}
    </Text>
  );
}

function Cell({ checked }: { checked: boolean }) {
  return (
    <Text textAlign="center" py="9px" borderBottomWidth="1px" borderColor="grey.10">
      <Icon as={checked ? FiCheck : FiMinus} color={checked ? "success.50" : "grey.30"} boxSize="15px" />
    </Text>
  );
}
