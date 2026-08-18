"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { Flex, Text } from "@chakra-ui/react";

import { getPlanColumns } from "@/app/(system)/review-plans/columns";
import { activateReviewPlanAction, closeReviewPlanAction, deletePlanAction, duplicatePlanAction } from "@/app/(system)/review-plans/reviewPlanActions";
import { AppCard } from "@/components/common/AppCard";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { toaster } from "@/components/ui/toaster";
import type { ReviewPlanRow } from "@/data/queries";

export function ReviewPlansClient({ plans }: { plans: ReviewPlanRow[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState("all");
  const [pendingDelete, setPendingDelete] = useState<ReviewPlanRow | null>(null);
  const [pendingActivate, setPendingActivate] = useState<ReviewPlanRow | null>(null);
  const [pendingClose, setPendingClose] = useState<ReviewPlanRow | null>(null);

  const statusOptions: FilterOption[] = useMemo(() => {
    const counts = new Map<string, number>();
    plans.forEach((plan) => counts.set(plan.status, (counts.get(plan.status) ?? 0) + 1));

    return [
      { key: "all", label: `All (${plans.length})` },
      ...Array.from(counts.entries()).map(([status, count]) => ({ key: status, label: `${status} (${count})` })),
    ];
  }, [plans]);

  const rows = plans.filter((plan) => statusFilter === "all" || plan.status === statusFilter);

  const columns = getPlanColumns({
    onEdit: (plan) => router.push(`/review-plans/${plan.planId}/edit`),
    onDuplicate: (plan) => {
      startTransition(async () => {
        const copy = await duplicatePlanAction(plan.planId);
        if (copy) toaster.create({ title: "Cycle duplicated", description: copy.title, type: "success" });
      });
    },
    onActivate: setPendingActivate,
    onClose: setPendingClose,
    onDelete: setPendingDelete,
  });

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

      <DataTable columns={columns} rows={rows} rowKey={(plan) => plan.planId} emptyMessage="No review cycles match this filter." />

      <ConfirmationDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete review cycle?"
        description={`"${pendingDelete?.title}" and all ${pendingDelete?.participantCount ?? 0} of its review assignments — including any submitted scores, progress, and results — will be permanently deleted. This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => {
          if (!pendingDelete) return;
          const plan = pendingDelete;
          startTransition(async () => {
            await deletePlanAction(plan.planId);
            toaster.create({ title: "Cycle deleted", description: plan.title, type: "success" });
          });
        }}
      />

      <ConfirmationDialog
        open={pendingActivate !== null}
        onOpenChange={(open) => !open && setPendingActivate(null)}
        title="Activate this cycle?"
        description="This opens the cycle to every assigned employee and manager and notifies them immediately. Make sure the template and departments are final."
        confirmLabel="Activate"
        onConfirm={() => {
          if (!pendingActivate) return;
          const plan = pendingActivate;
          startTransition(async () => {
            const createdCount = await activateReviewPlanAction(plan.planId);
            toaster.create({ title: "Cycle activated", description: `${plan.title} · ${createdCount} assignment${createdCount === 1 ? "" : "s"} created`, type: "success" });
          });
        }}
      />

      <ConfirmationDialog
        open={pendingClose !== null}
        onOpenChange={(open) => !open && setPendingClose(null)}
        title="Close this cycle?"
        description="No more submissions or edits will be allowed once closed. All existing records stay viewable. This can't be reopened."
        confirmLabel="Close cycle"
        onConfirm={() => {
          if (!pendingClose) return;
          const plan = pendingClose;
          startTransition(async () => {
            await closeReviewPlanAction(plan.planId);
            toaster.create({ title: "Cycle closed", description: plan.title, type: "success" });
          });
        }}
      />
    </AppCard>
  );
}
