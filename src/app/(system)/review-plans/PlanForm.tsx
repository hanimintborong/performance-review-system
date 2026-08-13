"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FiInfo, FiSend } from "react-icons/fi";
import { Flex, Grid, Input, NativeSelect, Text } from "@chakra-ui/react";

import { saveReviewPlanAction } from "@/app/(system)/review-plans/reviewPlanActions";
import { AppCard } from "@/components/common/AppCard";
import { MultiSelectChips } from "@/components/common/MultiSelectChips";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { toaster } from "@/components/ui/toaster";
import { DEPARTMENTS } from "@/constants/departments";
import { addDays, formatDate, formatDateRange, midpointDate } from "@/lib/date";
import type { Employee } from "@/types/employee";
import type { ReviewPlan } from "@/types/review";
import type { ReviewTemplate } from "@/types/template";

type PlanFormProps = {
  initialPlan: ReviewPlan;
  initialStart: string;
  initialEnd: string;
  mode: "create" | "edit";
  employees: Employee[];
  templates: ReviewTemplate[];
};

export function PlanForm({ initialPlan, initialStart, initialEnd, mode, employees, templates }: PlanFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const activeTemplates = templates.filter((t) => t.status === "Active");
  const staff = employees.filter((e) => e.systemRole === "employee");

  const [title, setTitle] = useState(initialPlan.title);
  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);
  const [templateId, setTemplateId] = useState(initialPlan.templateId || activeTemplates[0]?.templateId || "");
  const [departments, setDepartments] = useState(initialPlan.departments);
  const [allowExtension, setAllowExtension] = useState(true);

  const staffCount = staff.filter((e) => departments.includes(e.department)).length;
  const isInvalid = !title.trim() || !templateId || departments.length === 0;

  function toggleDepartment(department: string) {
    setDepartments((prev) => (prev.includes(department) ? prev.filter((d) => d !== department) : [...prev, department]));
  }

  function buildPlan(status: ReviewPlan["status"]): ReviewPlan {
    return {
      ...initialPlan,
      title,
      description: initialPlan.description || `${title} Borong Review.`,
      templateId,
      reviewPeriod: formatDateRange(startDate, endDate),
      startDate,
      employeeDeadline: midpointDate(startDate, endDate),
      managerDeadline: endDate,
      hrReviewDeadline: addDays(endDate, 7),
      managementReviewPeriod: formatDateRange(addDays(endDate, 8), addDays(endDate, 14)),
      departments,
      participantCount: staffCount,
      status,
    };
  }

  function persist(status: ReviewPlan["status"], message: string) {
    const plan = buildPlan(status);
    startTransition(async () => {
      const createdCount = await saveReviewPlanAction(plan);
      const assignmentNote = createdCount > 0 ? ` · ${createdCount} assignment${createdCount === 1 ? "" : "s"} created` : "";
      toaster.create({ title: message, description: `${plan.title || "Untitled cycle"} · ${plan.reviewPeriod}${assignmentNote}`, type: "success" });
      router.push("/review-plans");
    });
  }

  return (
    <AppCard>
      <Flex direction="column" p="14px 20px" borderBottomWidth="1px" borderColor="grey.20">
        <Text fontSize="15px" fontWeight="700" color="grey.80">
          {mode === "create" ? "Create review cycle" : "Edit review cycle"}
        </Text>
        <Text fontSize="12px" color="grey.60" mt="1px">
          Customize the review before publishing — it stays a draft until you publish it
        </Text>
      </Flex>

      <Grid templateColumns="1fr 1fr" gap="14px 16px" p="16px 20px">
        <Field label="Cycle name" span={2}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Year-End Review 2026" size="sm" px="12px" />
        </Field>

        <Field label="Start date">
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} size="sm" px="12px" />
        </Field>

        <Field label="End date">
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} size="sm" px="12px" />
        </Field>

        {startDate && endDate && (
          <Text fontSize="11px" color="grey.50" gridColumn="1/-1" mt="-6px">
            Employee deadline: {formatDate(midpointDate(startDate, endDate))} (midpoint) · Manager deadline: {formatDate(endDate)} (end date)
          </Text>
        )}

        <Field label="Form template" span={2}>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field value={templateId} onChange={(e) => setTemplateId(e.target.value)} pl="12px" pr="30px">
              {activeTemplates.map((t) => <option key={t.templateId} value={t.templateId}>{t.title}</option>)}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Text fontSize="11px" color="grey.40">You can edit sections and questions in the template builder before publishing</Text>
        </Field>

        <Field label="Participating departments" span={2}>
          <MultiSelectChips options={DEPARTMENTS} selected={departments} onToggle={toggleDepartment} />
          <Text fontSize="11px" color="grey.40">{staffCount} staff will be included</Text>
        </Field>

        <Flex gridColumn="1/-1">
          <ToggleSwitch
            checked={allowExtension}
            onChange={setAllowExtension}
            label="Allow deadline extension"
            description="HR can extend the end date after publishing — everyone in the cycle is notified automatically"
          />
        </Flex>
      </Grid>

      <Flex align="center" gap="10px" p="11px 16px" bg="grey.10">
        <Flex flex="1" align="center" gap="6px" fontSize="12px" color="grey.60">
          <FiInfo size={14} /> Publishing opens the window on the start date and notifies all evaluators.
        </Flex>

        <SecondaryButton onClick={() => persist("Draft", "Saved as draft")} loading={isPending}>Save as draft</SecondaryButton>

        <PrimaryButton onClick={() => persist("Active", "Cycle published")} disabled={isInvalid} loading={isPending}>
          <FiSend /> Publish cycle
        </PrimaryButton>
      </Flex>
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
