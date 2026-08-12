"use client";

import { Dialog, Flex, Portal, Text } from "@chakra-ui/react";
import { FiBriefcase, FiCalendar, FiCheckCircle, FiClock, FiFileText, FiMessageSquare, FiPhone, FiUser } from "react-icons/fi";

import { IconField, Section } from "@/app/(system)/wfh/WfhDetailField";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { WFH_STATUS_STYLE } from "@/constants/statusColors";
import type { WfhRequestRow } from "@/data/queries";

type WfhRequestDetailDialogProps = {
  row: WfhRequestRow | null;
  onClose: () => void;
};

export function WfhRequestDetailDialog({ row, onClose }: WfhRequestDetailDialogProps) {
  return (
    <Dialog.Root open={row !== null} onOpenChange={(e) => !e.open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="12px" maxW="480px">
            <Dialog.Header p="22px 26px 6px"><Dialog.Title fontSize="15px">WFH request details</Dialog.Title></Dialog.Header>
            <Dialog.Body p="10px 26px" maxH="65vh" overflowY="auto">
              {row && (
                <Flex direction="column" gap="10px">
                  <Section>
                    <Flex align="center" gap="10px" flex="1">
                      <UserAvatar initials={row.employee.initials} size="40px" />
                      <Flex direction="column">
                        <Text fontSize="13px" fontWeight="700" color="grey.80">{row.employee.name}</Text>
                        <Text fontSize="11px" color="grey.50">{row.employee.department}</Text>
                      </Flex>
                    </Flex>
                    <Flex direction="column" align="flex-end" gap="4px">
                      <Text fontSize="11px" fontWeight="600" color="grey.60">Status</Text>
                      <StatusBadge label={row.status} style={WFH_STATUS_STYLE[row.status]} />
                    </Flex>
                  </Section>

                  <Section>
                    <IconField icon={FiCalendar} label="Date" value={row.date} />
                    <IconField icon={FiClock} label="Duration" value={row.duration} />
                  </Section>

                  <Section><IconField icon={FiFileText} label="Reason" value={row.reason} /></Section>
                  <Section><IconField icon={FiBriefcase} label="Work plan / tasks" value={row.workPlan} /></Section>

                  <Section>
                    <IconField
                      icon={FiPhone}
                      label="Availability"
                      value={row.availability.map((a) => (a === "Other" && row.availabilityOtherDetail ? `Other (${row.availabilityOtherDetail})` : a)).join(", ")}
                    />
                    <IconField icon={FiPhone} label="Contact number" value={row.contactNumber} />
                  </Section>

                  <Section><IconField icon={FiMessageSquare} label="Additional notes" value={row.additionalNotes ?? "—"} /></Section>

                  <Section>
                    <IconField icon={FiCheckCircle} label="Acknowledged" value={row.acknowledged ? "Yes" : "No"} />
                    <IconField icon={FiUser} label="Approver" value={row.approverName} />
                  </Section>

                  {row.approverComment && (
                    <Section><IconField icon={FiMessageSquare} label="Approver comment" value={row.approverComment} /></Section>
                  )}
                </Flex>
              )}
            </Dialog.Body>
            <Dialog.Footer p="16px 26px 22px">
              <SecondaryButton onClick={onClose}>Close</SecondaryButton>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
