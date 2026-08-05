"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import { Flex, Text } from "@chakra-ui/react";

import { planColumns } from "@/app/(system)/review-plans/columns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import type { ReviewPlanRow } from "@/data/queries";

export function ReviewPlansClient({ plans }: { plans: ReviewPlanRow[] }) {
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions: FilterOption[] = useMemo(() => {
    const counts = new Map<string, number>();
    plans.forEach((plan) => counts.set(plan.status, (counts.get(plan.status) ?? 0) + 1));

    return [
      { key: "all", label: `All (${plans.length})` },
      ...Array.from(counts.entries()).map(([status, count]) => ({ key: status, label: `${status} (${count})` })),
    ];
  }, [plans]);

  const rows = plans.filter((plan) => statusFilter === "all" || plan.status === statusFilter);

  return (
    <AppCard>
      <Flex align="center" justify="space-between" gap="12px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20" flexWrap="wrap">
        <Flex direction="column" gap="6px">
          <Text fontSize="15px" fontWeight="700" color="grey.80">Review cycles</Text>
          <FilterBar options={statusOptions} activeKey={statusFilter} onChange={setStatusFilter} />
        </Flex>

        <NextLink href="/review-plans/new">
          <PrimaryButton>Create plan</PrimaryButton>
        </NextLink>
      </Flex>

      <DataTable columns={planColumns} rows={rows} rowKey={(plan) => plan.planId} emptyMessage="No review cycles match this filter." />
    </AppCard>
  );
}
