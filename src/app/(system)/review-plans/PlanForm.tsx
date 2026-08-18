"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiInfo } from "react-icons/fi";
import { Flex, Grid, Input, NativeSelect, Text } from "@chakra-ui/react";

import { activateReviewPlanAction, saveReviewPlanAction } from "@/app/(system)/review-plans/reviewPlanActions";
import { AppCard } from "@/components/common/AppCard";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { MultiSelectChips } from "@/components/common/MultiSelectChips";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { toaster } from "@/components/ui/toaster";
import { DEPARTMENTS } from "@/constants/departments";
import type { Employee } from "@/types/employee";
import type { ReviewPlan } from "@/types/review";
import type { ReviewTemplate } from "@/types/template";

type PlanFormProps = {
  initialPlan: ReviewPlan;
  mode: "create" | "edit";
  employees: Employee[];
  templates: ReviewTemplate[];
};

export function PlanForm({ initialPlan, mode, employees, templates }: PlanFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmingActivate, setConfirmingActivate] = useState(false);
  const activeTemplates = templates.filter((t) => t.status === "Active");
  const staff = employees.filter((e) => e.systemRole === "employee");

  const [title, setTitle] = useState(initialPlan.title);
  const [templateId, setTemplateId] = useState(initialPlan.templateId || activeTemplates[0]?.templateId || "");
  const [departments, setDepartments] = useState(initialPlan.departments);

  const staffCount = staff.filter((e) => departments.includes(e.department)).length;
  const isInvalid = !title.trim() || !templateId || departments.length === 0;
  const canActivate = initialPlan.status === "Draft";

  function toggleDepartment(department: string) {
    setDepartments((prev) => (prev.includes(department) ? prev.filter((d) => d !== department) : [...prev, department]));
  }

  function buildPlan(): ReviewPlan {
    return {
      ...initialPlan,
      title,
      description: initialPlan.description || `${title} Borong Review.`,
      templateId,
      departments,
      participantCount: staffCount,
      status: initialPlan.status,
      createdAt: mode === "create" ? new Date().toISOString() : initialPlan.createdAt,
    };
  }

  function saveDraft() {
    const plan = buildPlan();
    startTransition(async () => {
      await saveReviewPlanAction(plan);
      toaster.create({ title: mode === "create" ? "Draft saved" : "Cycle updated", description: plan.title || "Untitled cycle", type: "success" });
      router.push(`/review-plans/${plan.planId}`);
    });
  }

  function saveAndActivate() {
    const plan = buildPlan();
    startTransition(async () => {
      await saveReviewPlanAction(plan);
      const createdCount = await activateReviewPlanAction(plan.planId);
      toaster.create({ title: "Cycle activated", description: `${plan.title || "Untitled cycle"} · ${createdCount} assignment${createdCount === 1 ? "" : "s"} created`, type: "success" });
      router.push(`/review-plans/${plan.planId}`);
    });
  }

  return (
    <AppCard>
      <Flex direction="column" p="14px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Text fontSize="15px" fontWeight="700" color="grey.80">
          {mode === "create" ? "Create review cycle" : "Edit review cycle"}
        </Text>
        <Text fontSize="12px" color="grey.60" mt="1px">
          Save as a draft to keep tweaking it, or activate it right away to open it up to staff.
        </Text>
      </Flex>

      <Grid templateColumns="1fr 1fr" gap="14px 16px" p="16px 20px">
        <Field label="Cycle name" span={2}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Year-End Review 2026" size="sm" px="12px" />
        </Field>

        <Field label="Form template" span={2}>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field value={templateId} onChange={(e) => setTemplateId(e.target.value)} pl="12px" pr="30px">
              {activeTemplates.map((t) => <option key={t.templateId} value={t.templateId}>{t.title}</option>)}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Text fontSize="11px" color="grey.40">You can edit sections and questions in the template builder before activating</Text>
        </Field>

        <Field label="Participating departments" span={2}>
          <MultiSelectChips options={DEPARTMENTS} selected={departments} onToggle={toggleDepartment} />
          <Text fontSize="11px" color="grey.40">{staffCount} staff will be included</Text>
        </Field>
      </Grid>

      <Flex align="center" gap="10px" p="11px 16px" bg="grey.10">
        <Flex flex="1" align="center" gap="6px" fontSize="12px" color="grey.60">
          <FiInfo size={14} /> Activating notifies every assigned employee and manager immediately.
        </Flex>

        <SecondaryButton onClick={saveDraft} disabled={isInvalid} loading={isPending}>Save draft</SecondaryButton>

        {canActivate && (
          <PrimaryButton onClick={() => setConfirmingActivate(true)} disabled={isInvalid} loading={isPending}>
            <FiCheckCircle /> Activate cycle
          </PrimaryButton>
        )}
      </Flex>

      <ConfirmationDialog
        open={confirmingActivate}
        onOpenChange={setConfirmingActivate}
        title="Activate this cycle?"
        description="This saves your changes and opens the cycle to every assigned employee and manager, notifying them immediately. Make sure the template and departments are final."
        confirmLabel="Activate"
        onConfirm={saveAndActivate}
      />
    </AppCard>
  );
}

function Field({ label, span = 1, children }: { label: string; span?: number; children: ReactNode }) {
  return (
    <Flex direction="column" gap="5px" gridColumn={span === 2 ? "1/-1" : undefined}>
      <Text fontSize="12px" fontWeight="700" color="grey.80">{label}</Text>
      {children}
    </Flex>
  );
}
