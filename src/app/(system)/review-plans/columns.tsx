import NextLink from "next/link";

import { Flex, Text } from "@chakra-ui/react";

import type { DataTableColumn } from "@/components/common/DataTableRow";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PLAN_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewPlanRow } from "@/data/queries";

export const planColumns: DataTableColumn<ReviewPlanRow>[] = [
  {
    key: "title",
    label: "Cycle",
    width: "1.8fr",
    render: (plan) => (
      <Flex direction="column">
        <Text fontSize="13px" fontWeight="600" color="grey.80">{plan.title}</Text>
        <Text fontSize="11px" color="grey.60">{plan.reviewPeriod}</Text>
      </Flex>
    ),
  },
  { key: "template", label: "Template", width: "1.2fr", render: (plan) => plan.templateTitle },
  { key: "participants", label: "Participants", width: "110px", render: (plan) => plan.participantCount },
  {
    key: "status",
    label: "Status",
    width: "120px",
    render: (plan) => <StatusBadge label={plan.status} style={PLAN_STATUS_STYLE[plan.status]} />,
  },
  {
    key: "action",
    label: "",
    width: "170px",
    align: "right",
    render: (plan) => (
      <Flex justify="flex-end" gap="8px">
        <NextLink href={`/review-plans/${plan.planId}`}>
          <SecondaryButton h="30px" px="12px">View</SecondaryButton>
        </NextLink>
        <NextLink href={`/review-plans/${plan.planId}/edit`}>
          <SecondaryButton h="30px" px="12px">Edit</SecondaryButton>
        </NextLink>
      </Flex>
    ),
  },
];
