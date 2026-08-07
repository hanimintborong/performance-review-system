"use client";

import { Flex, Input, NativeSelect, Text, Textarea } from "@chakra-ui/react";

import { CoreValueListField } from "@/components/review-form/CoreValueListField";
import { KpiOkrFields } from "@/components/review-form/KpiOkrFields";
import { OkrListField } from "@/components/review-form/OkrListField";
import { RatingButtons } from "@/components/review-form/RatingButtons";
import type { Respondent, TemplateQuestion } from "@/types/template";

type QuestionAnswerFieldProps = {
  question: TemplateQuestion;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  editableRespondent?: Respondent;
};

export function QuestionAnswerField({ question, value, onChange, readOnly, editableRespondent }: QuestionAnswerFieldProps) {
  const label = (
    <Text fontSize="13px" color="grey.80" fontWeight="600">
      {question.text}
      {question.required && <Text as="span" color="error.50"> *</Text>}
    </Text>
  );

  if (question.type === "okr_list") {
    return (
      <Flex direction="column" gap="6px">
        {label}
        <OkrListField value={value} onChange={onChange} editableRespondent={editableRespondent} targetWeightage={question.weightage ?? 100} />
      </Flex>
    );
  }

  if (question.type === "core_value_list") {
    return (
      <Flex direction="column" gap="6px">
        {label}
        <CoreValueListField
          value={value}
          onChange={onChange}
          editableRespondent={editableRespondent}
          labels={question.options ?? []}
          ratingScaleMax={question.ratingScaleMax ?? 5}
        />
      </Flex>
    );
  }

  if (question.type === "kpi_okr") {
    return (
      <Flex direction="column" gap="6px">
        {label}
        <KpiOkrFields value={value} onChange={onChange} readOnly={readOnly} />
      </Flex>
    );
  }

  if (question.type === "rating_scale" || question.type === "core_value_rating") {
    return (
      <Flex direction="column" gap="6px">
        {label}
        <RatingButtons max={question.ratingScaleMax ?? 5} value={Number(value) || 0} readOnly={readOnly} onChange={(v) => onChange?.(String(v))} />
      </Flex>
    );
  }

  if (readOnly) {
    return (
      <Flex direction="column" gap="4px">
        {label}
        <Text fontSize="13px" color="grey.60">{value || "—"}</Text>
      </Flex>
    );
  }

  if (question.type === "dropdown") {
    return (
      <Flex direction="column" gap="6px">
        {label}
        <NativeSelect.Root size="sm">
          <NativeSelect.Field value={value} onChange={(e) => onChange?.(e.target.value)}>
            <option value="">Select…</option>
            {(question.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>
    );
  }

  if (question.type === "long_text") {
    return (
      <Flex direction="column" gap="6px">
        {label}
        <Textarea size="sm" rows={3} value={value} onChange={(e) => onChange?.(e.target.value)} />
      </Flex>
    );
  }

  if (question.type === "file_upload") {
    return (
      <Flex direction="column" gap="6px">
        {label}
        <Input size="sm" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder="File name or link (upload coming later)" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="6px">
      {label}
      <Input
        size="sm"
        type={question.type === "number" || question.type === "percentage" ? "number" : "text"}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </Flex>
  );
}
