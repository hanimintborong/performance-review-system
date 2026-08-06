"use client";

import { Flex, Input, Text, Textarea } from "@chakra-ui/react";

import { RatingButtons } from "@/components/review-form/RatingButtons";
import { parseKpiAnswer, stringifyKpiAnswer } from "@/lib/kpiAnswer";

type KpiOkrFieldsProps = {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
};

export function KpiOkrFields({ value, onChange, readOnly }: KpiOkrFieldsProps) {
  const kpi = parseKpiAnswer(value);

  function update(patch: Partial<typeof kpi>) {
    onChange?.(stringifyKpiAnswer({ ...kpi, ...patch }));
  }

  return (
    <Flex direction="column" gap="8px" p="10px" bg="grey.10" borderRadius="8px">
      <Flex align="center" gap="10px">
        <Text fontSize="11px" fontWeight="700" color="grey.60">Self-score</Text>
        <RatingButtons max={5} value={kpi.selfScore} readOnly={readOnly} onChange={(v) => update({ selfScore: v })} />
      </Flex>

      <Field label="Achievement" value={kpi.achievement} readOnly={readOnly} onChange={(v) => update({ achievement: v })} />
      <Field label="Challenge" value={kpi.challenge} readOnly={readOnly} onChange={(v) => update({ challenge: v })} />
      <Field label="Supporting evidence" value={kpi.evidence} readOnly={readOnly} onChange={(v) => update({ evidence: v })} />
      <Field label="Comment" value={kpi.comment} readOnly={readOnly} onChange={(v) => update({ comment: v })} />
    </Flex>
  );
}

function Field({ label, value, readOnly, onChange }: { label: string; value: string; readOnly?: boolean; onChange: (v: string) => void }) {
  return (
    <Flex direction="column" gap="4px">
      <Text fontSize="11px" color="grey.60">{label}</Text>
      {readOnly ? (
        <Text fontSize="12px" color="grey.80">{value || "—"}</Text>
      ) : label === "Achievement" || label === "Challenge" ? (
        <Input size="sm" bg="white" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Textarea size="sm" bg="white" rows={2} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </Flex>
  );
}
