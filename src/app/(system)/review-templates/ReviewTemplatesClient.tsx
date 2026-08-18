"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { Flex, Text } from "@chakra-ui/react";

import {
  deleteReviewTemplateAction,
  duplicateTemplateAction,
  toggleTemplateStatusAction,
} from "@/app/(system)/review-templates/reviewTemplateActions";
import { getTemplateColumns } from "@/app/(system)/review-templates/columns";
import { AppCard } from "@/components/common/AppCard";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { DataTable } from "@/components/common/DataTable";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { toaster } from "@/components/ui/toaster";
import type { ReviewTemplate } from "@/types/template";

type ReviewTemplatesClientProps = {
  templates: ReviewTemplate[];
  templateUsage: Record<string, string[]>;
};

export function ReviewTemplatesClient({ templates, templateUsage }: ReviewTemplatesClientProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState("all");
  const [pendingDelete, setPendingDelete] = useState<ReviewTemplate | null>(null);
  const [blockedDelete, setBlockedDelete] = useState<{ template: ReviewTemplate; plans: string[] } | null>(null);

  const statusOptions: FilterOption[] = useMemo(() => {
    const counts = new Map<string, number>();
    templates.forEach((t) => counts.set(t.status, (counts.get(t.status) ?? 0) + 1));

    return [
      { key: "all", label: `All (${templates.length})` },
      ...Array.from(counts.entries()).map(([status, count]) => ({ key: status, label: `${status} (${count})` })),
    ];
  }, [templates]);

  const rows = templates.filter((t) => statusFilter === "all" || t.status === statusFilter);

  const columns = getTemplateColumns({
    onToggleStatus: (template) => {
      startTransition(async () => {
        const nextStatus = await toggleTemplateStatusAction(template.templateId);
        if (nextStatus) toaster.create({ title: `Template ${nextStatus.toLowerCase()}`, description: template.title, type: "success" });
      });
    },
    onDuplicate: (template) => {
      startTransition(async () => {
        const copy = await duplicateTemplateAction(template.templateId);
        if (copy) toaster.create({ title: "Template duplicated", description: copy.title, type: "success" });
      });
    },
    onEdit: (template) => router.push(`/review-templates/${template.templateId}/edit`),
    onDelete: (template) => {
      const usedByPlans = templateUsage[template.templateId];
      if (template.isMasterTemplate) {
        setBlockedDelete({ template, plans: [] });
      } else if (usedByPlans?.length) {
        setBlockedDelete({ template, plans: usedByPlans });
      } else {
        setPendingDelete(template);
      }
    },
  });

  return (
    <AppCard>
      <Flex align="center" justify="space-between" gap="12px" p="16px 20px" borderBottomWidth="1px" borderColor="grey.20" flexWrap="wrap">
        <Flex direction="column" gap="6px">
          <Text fontSize="15px" fontWeight="700" color="grey.80">Review templates</Text>
          <FilterBar options={statusOptions} activeKey={statusFilter} onChange={setStatusFilter} />
        </Flex>

        <NextLink href="/review-templates/new">
          <PrimaryButton>Create template</PrimaryButton>
        </NextLink>
      </Flex>

      <DataTable columns={columns} rows={rows} rowKey={(t) => t.templateId} emptyMessage="No templates match this filter." />

      <ConfirmationDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete review template?"
        description={`"${pendingDelete?.title}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => {
          if (!pendingDelete) return;
          const template = pendingDelete;
          startTransition(async () => {
            try {
              await deleteReviewTemplateAction(template.templateId);
              toaster.create({ title: "Template deleted", description: template.title, type: "success" });
            } catch (err) {
              toaster.create({ title: "Could not delete template", description: err instanceof Error ? err.message : undefined, type: "error" });
            }
          });
        }}
      />

      <ConfirmationDialog
        open={blockedDelete !== null}
        onOpenChange={(open) => !open && setBlockedDelete(null)}
        title="Can't delete this template"
        description={blockedDelete
          ? blockedDelete.template.isMasterTemplate
            ? `"${blockedDelete.template.title}" is the master template. Unmark it as master (in its edit page) before deleting.`
            : `"${blockedDelete.template.title}" is still used by ${blockedDelete.plans.length} cycle${blockedDelete.plans.length === 1 ? "" : "s"} that isn't archived: ${blockedDelete.plans.join(", ")}. Archive those cycles first, then delete the template.`
          : ""}
        confirmLabel="Got it"
        onConfirm={() => setBlockedDelete(null)}
      />
    </AppCard>
  );
}
