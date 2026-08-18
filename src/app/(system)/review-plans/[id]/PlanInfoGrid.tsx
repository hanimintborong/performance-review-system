"use client";

import { Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { FiCalendar, FiClipboard, FiList, FiUsers } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import { InfoTile } from "@/components/common/InfoTile";

type PlanInfoGridProps = {
  templateTitle: string;
  departments: string;
  participantCount: string;
  activatedAt: string | null;
  closedAt: string | null;
};

export function PlanInfoGrid({ templateTitle, departments, participantCount, activatedAt, closedAt }: PlanInfoGridProps) {
  return (
    <AppCard p="16px 20px">
      <Flex align="center" gap="8px" mb="14px">
        <Flex w="26px" h="26px" borderRadius="7px" align="center" justify="center" bg="brand.10" color="brand.60" flexShrink="0">
          <Icon as={FiClipboard} boxSize="13px" />
        </Flex>
        <Text fontSize="13px" fontWeight="700" color="grey.80">Cycle information</Text>
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap="12px">
        <InfoTile icon={FiList} label="Template" value={templateTitle} />
        <InfoTile icon={FiUsers} label="Departments" value={departments} />
        <InfoTile icon={FiUsers} label="Participants" value={participantCount} />
        <InfoTile icon={FiCalendar} label="Activated" value={activatedAt ? activatedAt.slice(0, 10) : "Not yet activated"} />
        <InfoTile icon={FiCalendar} label="Closed" value={closedAt ? closedAt.slice(0, 10) : "Still open"} />
      </Grid>
    </AppCard>
  );
}
