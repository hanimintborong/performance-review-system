"use client";

import { Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { FiCalendar, FiClipboard, FiClock, FiList, FiUsers } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import { InfoTile } from "@/components/common/InfoTile";

type PlanInfoGridProps = {
  templateTitle: string;
  reviewPeriod: string;
  departments: string;
  employeeDeadline: string;
  managerDeadline: string;
  hrReviewDeadline: string;
  managementReviewPeriod: string;
  participantCount: string;
};

export function PlanInfoGrid(props: PlanInfoGridProps) {
  return (
    <AppCard p="16px 20px">
      <Flex align="center" gap="8px" mb="14px">
        <Flex w="26px" h="26px" borderRadius="7px" align="center" justify="center" bg="brand.10" color="brand.60" flexShrink="0">
          <Icon as={FiClipboard} boxSize="13px" />
        </Flex>
        <Text fontSize="13px" fontWeight="700" color="grey.80">Cycle information</Text>
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap="12px">
        <InfoTile icon={FiList} label="Template" value={props.templateTitle} />
        <InfoTile icon={FiCalendar} label="Review period" value={props.reviewPeriod} />
        <InfoTile icon={FiUsers} label="Departments" value={props.departments} />
        <InfoTile icon={FiClock} label="Employee deadline" value={props.employeeDeadline} />
        <InfoTile icon={FiCalendar} label="Manager deadline" value={props.managerDeadline} />
        <InfoTile icon={FiUsers} label="HR review deadline" value={props.hrReviewDeadline} />
        <InfoTile icon={FiCalendar} label="Management review period" value={props.managementReviewPeriod} />
        <InfoTile icon={FiUsers} label="Participants" value={props.participantCount} />
      </Grid>
    </AppCard>
  );
}
