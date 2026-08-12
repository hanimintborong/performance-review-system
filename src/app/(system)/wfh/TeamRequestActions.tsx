import { Flex } from "@chakra-ui/react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import type { WfhRequestRow } from "@/data/queries";

type TeamRequestActionsProps = {
  row: WfhRequestRow;
  isProcessing: boolean;
  onView: () => void;
  onApprove: () => void;
  onReject: () => void;
};

export function TeamRequestActions({ row, isProcessing, onView, onApprove, onReject }: TeamRequestActionsProps) {
  return (
    <Flex gap="6px" justify="flex-end">
      <SecondaryButton h="30px" px="10px" onClick={onView}>View</SecondaryButton>
      {row.status === "Pending Approval" && (
        <>
          <SecondaryButton h="30px" px="10px" loading={isProcessing} onClick={onReject}>Reject</SecondaryButton>
          <PrimaryButton h="30px" px="10px" loading={isProcessing} onClick={onApprove}>Approve</PrimaryButton>
        </>
      )}
    </Flex>
  );
}
