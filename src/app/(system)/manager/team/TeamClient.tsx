"use client";

import { useMemo, useState, useTransition } from "react";
import { Flex, NativeSelect, Text } from "@chakra-ui/react";

import { getTeamColumns } from "@/app/(system)/manager/team/columns";
import { sendReminderAction } from "@/app/(system)/manager/team/teamActions";
import { TeamOverview } from "@/app/(system)/manager/team/TeamOverview";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { SearchInput } from "@/components/common/SearchInput";
import { toaster } from "@/components/ui/toaster";
import type { ReviewRow } from "@/data/queries";
import type { ReviewPlan } from "@/types/review";

const IN_PROGRESS_STATUSES = ["Not Started", "Self-Assessment"];
const ALL = "All plans";

export function TeamClient({ rows, plans }: { rows: ReviewRow[]; plans: ReviewPlan[] }) {
  const [planId, setPlanId] = useState(ALL);
  const visibleRows = planId === ALL ? rows : rows.filter((r) => r.planId === planId);

  const needsAction = visibleRows.filter((r) => r.status === "Employee Submitted").length;
  const [filter, setFilter] = useState(needsAction > 0 ? "action" : "all");
  const [search, setSearch] = useState("");
  const [, startTransition] = useTransition();
  const [sendingId, setSendingId] = useState<string | null>(null);

  function handleSendReminder(row: ReviewRow) {
    setSendingId(row.assignmentId);
    startTransition(async () => {
      await sendReminderAction(row.assignmentId);
      toaster.create({ title: "Reminder sent", description: row.employee.name, type: "success" });
      setSendingId(null);
    });
  }

  const options: FilterOption[] = useMemo(() => {
    const inProgress = visibleRows.filter((r) => IN_PROGRESS_STATUSES.includes(r.status)).length;
    const overdue = visibleRows.filter((r) => r.status === "Overdue").length;
    const completed = visibleRows.filter((r) => r.status === "Finalised").length;

    return [
      { key: "action", label: `Needs your review (${needsAction})` },
      { key: "in_progress", label: `In progress (${inProgress})` },
      { key: "overdue", label: `Overdue (${overdue})` },
      { key: "completed", label: `Completed (${completed})` },
      { key: "all", label: `All (${visibleRows.length})` },
    ];
  }, [visibleRows, needsAction]);

  const filtered = visibleRows.filter((r) => {
    const matchesFilter = filter === "action" ? r.status === "Employee Submitted"
      : filter === "in_progress" ? IN_PROGRESS_STATUSES.includes(r.status)
      : filter === "overdue" ? r.status === "Overdue"
      : filter === "completed" ? r.status === "Finalised"
      : true;
    const matchesSearch = r.employee.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Flex direction="column" gap="14px">
      <Flex justify="flex-end">
        <NativeSelect.Root w="220px" size="sm">
          <NativeSelect.Field value={planId} onChange={(e) => setPlanId(e.target.value)} fontSize="12px" pl="12px" pr="26px">
            <option value={ALL}>{ALL}</option>
            {plans.map((p) => <option key={p.planId} value={p.planId}>{p.title}</option>)}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>

      <TeamOverview rows={visibleRows} />

      <AppCard>
        <Flex direction="column" gap="10px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
          <Flex direction="column" gap="2px">
            <Text fontSize="15px" fontWeight="700" color="grey.80">My team</Text>
            <Text fontSize="12px" color="grey.60">
              Evaluate your direct reports&apos; reviews {planId === ALL ? "across all active cycles" : `for ${plans.find((p) => p.planId === planId)?.title ?? planId}`}
            </Text>
          </Flex>
          <Flex justify="space-between" gap="10px" flexWrap="wrap">
            <FilterBar options={options} activeKey={filter} onChange={setFilter} />
            <SearchInput placeholder="Search employee…" value={search} onValueChange={setSearch} w="220px" h="34px" />
          </Flex>
        </Flex>

        <DataTable
          columns={getTeamColumns({ onSendReminder: handleSendReminder, isSending: (id) => sendingId === id })}
          rows={filtered}
          rowKey={(r) => r.assignmentId}
          emptyMessage="No team members in this view."
        />
      </AppCard>
    </Flex>
  );
}
