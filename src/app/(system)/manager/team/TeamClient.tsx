"use client";

import { useMemo, useState, useTransition } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { getTeamColumns } from "@/app/(system)/manager/team/columns";
import { sendReminderAction } from "@/app/(system)/manager/team/teamActions";
import { TeamOverview } from "@/app/(system)/manager/team/TeamOverview";
import { AppCard } from "@/components/common/AppCard";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { SearchInput } from "@/components/common/SearchInput";
import { toaster } from "@/components/ui/toaster";
import type { ReviewRow } from "@/data/queries";

const IN_PROGRESS_STATUSES = ["Not Started", "Self-Assessment In Progress"];

export function TeamClient({ rows, planTitle }: { rows: ReviewRow[]; planTitle: string }) {
  const needsAction = rows.filter((r) => r.status === "Employee Submitted").length;
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
    const inProgress = rows.filter((r) => IN_PROGRESS_STATUSES.includes(r.status)).length;
    const overdue = rows.filter((r) => r.status === "Overdue").length;
    const completed = rows.filter((r) => r.status === "Finalised").length;

    return [
      { key: "action", label: `Needs your review (${needsAction})` },
      { key: "in_progress", label: `In progress (${inProgress})` },
      { key: "overdue", label: `Overdue (${overdue})` },
      { key: "completed", label: `Completed (${completed})` },
      { key: "all", label: `All (${rows.length})` },
    ];
  }, [rows, needsAction]);

  const filtered = rows.filter((r) => {
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
      <TeamOverview rows={rows} />

      <AppCard>
        <Flex direction="column" gap="10px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20">
          <Flex direction="column" gap="2px">
            <Text fontSize="15px" fontWeight="700" color="grey.80">My team</Text>
            <Text fontSize="12px" color="grey.60">Evaluate your direct reports&apos; reviews · {planTitle}</Text>
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
