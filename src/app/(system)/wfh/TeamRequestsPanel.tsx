"use client";

import { useState, useTransition } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { RejectWfhDialog } from "@/app/(system)/wfh/RejectWfhDialog";
import { TeamWfhUpcoming } from "@/app/(system)/wfh/TeamWfhUpcoming";
import { getTeamRequestColumns } from "@/app/(system)/wfh/teamRequestColumns";
import { approveWfhRequestAction } from "@/app/(system)/wfh/wfhApprovalActions";
import { WfhRequestDetailDialog } from "@/app/(system)/wfh/WfhRequestDetailDialog";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { toaster } from "@/components/ui/toaster";
import type { WfhRequestRow } from "@/data/queries";

export function TeamRequestsPanel({ requests }: { requests: WfhRequestRow[] }) {
  const [, startTransition] = useTransition();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectingRow, setRejectingRow] = useState<WfhRequestRow | null>(null);
  const [viewingRow, setViewingRow] = useState<WfhRequestRow | null>(null);

  function handleApprove(requestId: string) {
    setProcessingId(requestId);
    startTransition(async () => {
      await approveWfhRequestAction(requestId);
      toaster.create({ title: "Request approved", type: "success" });
      setProcessingId(null);
    });
  }

  return (
    <Flex direction="column" gap="14px">
      <TeamWfhUpcoming requests={requests} />

      <AppCard>
        <Flex direction="column" gap="2px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
          <Text fontSize="15px" fontWeight="700" color="grey.80">Team WFH requests</Text>
          <Text fontSize="12px" color="grey.60">{requests.length} request(s) from your direct reports</Text>
        </Flex>

        <DataTable
          columns={getTeamRequestColumns({
            onView: setViewingRow,
            onApprove: handleApprove,
            onReject: setRejectingRow,
            isProcessing: (id) => processingId === id,
          })}
          rows={requests}
          rowKey={(r) => r.requestId}
          emptyMessage="No WFH requests from your team."
        />
      </AppCard>

      <RejectWfhDialog row={rejectingRow} onClose={() => setRejectingRow(null)} />
      <WfhRequestDetailDialog row={viewingRow} onClose={() => setViewingRow(null)} />
    </Flex>
  );
}
