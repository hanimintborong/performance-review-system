"use client";

import { useState, useTransition } from "react";
import Papa from "papaparse";
import { Dialog, Flex, Portal, Text } from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";

import { importEmployeesAction, type NewEmployeeInput } from "@/app/(system)/employees/actions";
import { parseEmployeeRow } from "@/app/(system)/employees/parseEmployeeRow";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { toaster } from "@/components/ui/toaster";

export function ImportEmployeesDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [rows, setRows] = useState<NewEmployeeInput[]>([]);
  const [skipped, setSkipped] = useState(0);

  function handleFile(file: File) {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data.map(parseEmployeeRow);
        setRows(parsed.filter((r): r is NewEmployeeInput => r !== null));
        setSkipped(parsed.filter((r) => r === null).length);
      },
    });
  }

  function submit() {
    startTransition(async () => {
      const count = await importEmployeesAction(rows);
      toaster.create({ title: `${count} employees imported`, type: "success" });
      setOpen(false);
      setRows([]);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
      <Dialog.Trigger asChild>
        <SecondaryButton><FiUploadCloud /> Import CSV</SecondaryButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="480px">
            <Dialog.Header><Dialog.Title fontSize="15px">Import employees from CSV</Dialog.Title></Dialog.Header>
            <Dialog.Body>
              <Flex direction="column" gap="10px">
                <Text fontSize="12px" color="grey.60">
                  Columns required: <b>name, email</b>. Optional: department, jobTitle, managerEmail, systemRole
                  (employee/manager/hr/topManagement — defaults to employee).
                </Text>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                {rows.length > 0 && (
                  <Text fontSize="12px" color="success.70">{rows.length} row(s) ready to import.</Text>
                )}
                {skipped > 0 && (
                  <Text fontSize="12px" color="error.70">{skipped} row(s) skipped (missing name or email).</Text>
                )}
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild><SecondaryButton>Cancel</SecondaryButton></Dialog.ActionTrigger>
              <PrimaryButton onClick={submit} disabled={rows.length === 0} loading={isPending}>
                Import {rows.length || ""} employees
              </PrimaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
