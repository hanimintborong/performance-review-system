"use client";

import { Grid } from "@chakra-ui/react";
import { FiHelpCircle, FiList, FiUsers } from "react-icons/fi";

import { AppCard } from "@/components/common/AppCard";
import { InfoTile } from "@/components/common/InfoTile";

type TemplateInfoGridProps = {
  sectionCount: string;
  questionCount: string;
  departments: string;
};

export function TemplateInfoGrid({ sectionCount, questionCount, departments }: TemplateInfoGridProps) {
  return (
    <AppCard p="16px 20px">
      <Grid templateColumns="repeat(3, 1fr)" gap="12px">
        <InfoTile icon={FiList} label="Sections" value={sectionCount} />
        <InfoTile icon={FiHelpCircle} label="Questions" value={questionCount} />
        <InfoTile icon={FiUsers} label="Assigned departments" value={departments} />
      </Grid>
    </AppCard>
  );
}
