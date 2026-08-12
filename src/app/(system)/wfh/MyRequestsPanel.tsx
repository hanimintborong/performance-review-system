"use client";

import { useState, useTransition } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { getMyRequestColumns } from "@/app/(system)/wfh/myRequestColumns";
import { NewWfhRequestDialog } from "@/app/(system)/wfh/NewWfhRequestDialog";
import { cancelWfhRequestAction } from "@/app/(system)/wfh/wfhActions";
import { WfhRequestDetailDialog } from "@/app/(system)/wfh/WfhRequestDetailDialog";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { toaster } from "@/components/ui/toaster";
import type { WfhRequestRow } from "@/data/queries";
import type { Employee } from "@/types/employee";

export function MyRequestsPanel({ employee, requests }: { employee: Employee; requests: WfhRequestRow[] }) {
  const [, startTransition] = useTransition();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [viewingRow, setViewingRow] = useState<WfhRequestRow | null>(null);

  function handleCancel(requestId: string) {
    setCancellingId(requestId);
    startTransition(async () => {
      await cancelWfhRequestAction(requestId);
      toaster.create({ title: "Request cancelled", type: "success" });
      setCancellingId(null);
    });
  }

  return (
    <AppCard>
      <Flex align="center" justify="space-between" gap="12px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Flex direction="column" gap="2px">
          <Text fontSize="15px" fontWeight="700" color="grey.80">My WFH requests</Text>
          <Text fontSize="12px" color="grey.60">{requests.length} request(s)</Text>
        </Flex>
        <NewWfhRequestDialog employee={employee} />
      </Flex>

      <DataTable
        columns={getMyRequestColumns({ onView: setViewingRow, onCancel: handleCancel, isCancelling: (id) => cancellingId === id })}
        rows={requests}
        rowKey={(r) => r.requestId}
        emptyMessage="No WFH requests yet."
      />

      <WfhRequestDetailDialog row={viewingRow} onClose={() => setViewingRow(null)} />
    </AppCard>
  );
}
