"use client";

import { useMemo, useState } from "react";
import { Flex, Grid, NativeSelect, Text } from "@chakra-ui/react";

import { managementReviewColumns } from "@/app/(system)/management/reviews/columns";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { StatCard } from "@/components/common/StatCard";
import { DEPARTMENTS } from "@/constants/departments";
import { IN_PROGRESS_STATUSES, READY_TO_FINALISE_STATUSES } from "@/constants/reviewStatusGroups";
import type { ReviewRow } from "@/data/queries";
import type { ReviewPlan } from "@/types/review";

const ALL = "All plans";

export function ManagementReviewsClient({ allRows, plans }: { allRows: ReviewRow[]; plans: ReviewPlan[] }) {
  const [planId, setPlanId] = useState(ALL);
  const planRows = allRows.filter((r) => planId === ALL || r.planId === planId);

  const readyToFinalise = planRows.filter((r) => READY_TO_FINALISE_STATUSES.includes(r.status)).length;
  const [statusFilter, setStatusFilter] = useState(readyToFinalise > 0 ? "ready" : "all");

  const statusOptions: FilterOption[] = useMemo(() => {
    const inProgress = planRows.filter((r) => IN_PROGRESS_STATUSES.includes(r.status)).length;
    const finalisedCount = planRows.filter((r) => r.status === "Finalised").length;

    return [
      { key: "ready", label: `Ready to finalise (${readyToFinalise})` },
      { key: "in_progress", label: `In progress (${inProgress})` },
      { key: "finalised", label: `Finalised (${finalisedCount})` },
      { key: "all", label: `All (${planRows.length})` },
    ];
  }, [planRows, readyToFinalise]);

  const rows = planRows.filter((r) => {
    if (statusFilter === "ready") return READY_TO_FINALISE_STATUSES.includes(r.status);
    if (statusFilter === "in_progress") return IN_PROGRESS_STATUSES.includes(r.status);
    if (statusFilter === "finalised") return r.status === "Finalised";
    return true;
  });

  const finalised = planRows.filter((r) => r.status === "Finalised");
  const scored = finalised.filter((r) => r.managerScore !== null);
  const avgScore = scored.length > 0 ? scored.reduce((sum, r) => sum + (r.managerScore ?? 0), 0) / scored.length : null;
  const completionRate = planRows.length > 0 ? Math.round((finalised.length / planRows.length) * 100) : 0;

  const deptSummaries = DEPARTMENTS.map((dept) => {
    const deptRows = planRows.filter((r) => r.employee.department === dept);
    const deptFinalised = deptRows.filter((r) => r.status === "Finalised");
    return { dept, completed: deptFinalised.length, total: deptRows.length };
  }).filter((d) => d.total > 0);

  return (
    <Flex direction="column" gap="14px">
      <Flex justify="flex-end">
        <NativeSelect.Root w="220px" size="sm">
          <NativeSelect.Field value={planId} onChange={(e) => setPlanId(e.target.value)} fontSize="12px">
            <option value={ALL}>{ALL}</option>
            {plans.map((p) => <option key={p.planId} value={p.planId}>{p.title}</option>)}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap="12px">
        <StatCard label="Total reviews" value={planRows.length} />
        <StatCard label="Finalised" value={finalised.length} valueColor="success.70" />
        <StatCard label="Completion rate" value={`${completionRate}%`} valueColor="brand.70" />
        <StatCard label="Average final score" value={avgScore !== null ? avgScore.toFixed(1) : "—"} valueColor="info.70" />
      </Grid>

      <AppCard p="16px 20px">
        <Text fontSize="15px" fontWeight="700" color="grey.80" mb="12px">Department summary</Text>
        <Flex direction="column" gap="12px">
          {deptSummaries.map((d) => {
            const pct = d.total > 0 ? Math.round((d.completed / d.total) * 100) : 0;
            return (
              <Flex key={d.dept} align="center" gap="12px" display="grid" gridTemplateColumns="180px 1fr 70px">
                <Text fontSize="13px" fontWeight="600" color="grey.80">{d.dept}</Text>
                <Flex h="8px" bg="grey.10" borderRadius="full" overflow="hidden">
                  <Flex h="100%" w={`${pct}%`} bg={pct === 100 ? "success.50" : "brand.50"} borderRadius="full" />
                </Flex>
                <Text fontSize="12px" color="grey.60" textAlign="right">{d.completed} / {d.total}</Text>
              </Flex>
            );
          })}
        </Flex>
      </AppCard>

      <AppCard>
        <Flex p="14px 20px" borderBottomWidth="1px" borderColor="grey.20">
          <FilterBar options={statusOptions} activeKey={statusFilter} onChange={setStatusFilter} />
        </Flex>
        <DataTable columns={managementReviewColumns} rows={rows} rowKey={(r) => r.assignmentId} emptyMessage="No reviews match this filter." />
      </AppCard>
    </Flex>
  );
}
