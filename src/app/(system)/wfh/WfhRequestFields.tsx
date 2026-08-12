import type { ReactNode } from "react";
import { Flex, Input, NativeSelect, Text, Textarea } from "@chakra-ui/react";

import { WfhAcknowledgementCard } from "@/app/(system)/wfh/WfhAcknowledgementCard";
import { WfhAvailabilityOptions } from "@/app/(system)/wfh/WfhAvailabilityOptions";
import { WfhEmployeeCard } from "@/app/(system)/wfh/WfhEmployeeCard";
import type { NewWfhRequestInput } from "@/app/(system)/wfh/wfhActions";
import { WFH_DURATIONS, type WfhAvailability, type WfhDuration } from "@/types/wfh";
import type { Employee } from "@/types/employee";

type WfhRequestFieldsProps = {
  employee: Employee;
  form: NewWfhRequestInput;
  onChange: (form: NewWfhRequestInput) => void;
};

export function WfhRequestFields({ employee, form, onChange }: WfhRequestFieldsProps) {
  function toggleAvailability(option: WfhAvailability) {
    onChange({
      ...form,
      availability: form.availability.includes(option)
        ? form.availability.filter((a) => a !== option)
        : [...form.availability, option],
    });
  }

  return (
    <Flex direction="column" gap="14px">
      <WfhEmployeeCard employee={employee} />

      <Flex gap="12px">
        <Field label="WFH date" required flex="1">
          <Input type="date" size="sm" px="12px" value={form.date} onChange={(e) => onChange({ ...form, date: e.target.value })} />
        </Field>

        <Field label="Duration" flex="1">
          <NativeSelect.Root size="sm">
            <NativeSelect.Field value={form.duration} onChange={(e) => onChange({ ...form, duration: e.target.value as WfhDuration })} pl="12px" pr="30px">
              {WFH_DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field>
      </Flex>

      <SectionHeading title="Work details" />
      <Field label="Reason" required>
        <Input size="sm" px="12px" placeholder="e.g. Medical appointment" value={form.reason} onChange={(e) => onChange({ ...form, reason: e.target.value })} />
      </Field>
      <Field label="Work plan / tasks" required>
        <Textarea size="sm" px="12px" py="8px" rows={3} placeholder="What will you work on?" value={form.workPlan} onChange={(e) => onChange({ ...form, workPlan: e.target.value })} />
      </Field>

      <SectionHeading title="Contact & availability" />
      <Flex gap="16px" wrap="wrap">
        <Field label="Availability" required flex="1.4" minW="220px">
          <WfhAvailabilityOptions selected={form.availability} onToggle={toggleAvailability} />
          {form.availability.includes("Other") && (
            <Input
              mt="8px"
              size="sm"
              px="12px"
              placeholder="Please specify"
              value={form.availabilityOtherDetail}
              onChange={(e) => onChange({ ...form, availabilityOtherDetail: e.target.value })}
            />
          )}
        </Field>
        <Field label="Contact number" required flex="1" minW="160px">
          <Input size="sm" px="12px" placeholder="e.g. 012-3456789" value={form.contactNumber} onChange={(e) => onChange({ ...form, contactNumber: e.target.value })} />
        </Field>
      </Flex>

      <SectionHeading title="Additional information" />
      <Field label="Additional notes (optional)">
        <Textarea size="sm" px="12px" py="8px" rows={2} placeholder="Add any additional information…" value={form.additionalNotes} onChange={(e) => onChange({ ...form, additionalNotes: e.target.value })} />
      </Field>

      <WfhAcknowledgementCard checked={form.acknowledged} onChange={(acknowledged) => onChange({ ...form, acknowledged })} />
    </Flex>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <Text fontSize="13px" fontWeight="700" color="grey.80" pt="10px" borderTopWidth="1px" borderColor="grey.20">
      {title}
    </Text>
  );
}

function Field({ label, required, flex, minW, children }: { label: string; required?: boolean; flex?: string; minW?: string; children: ReactNode }) {
  return (
    <Flex direction="column" gap="4px" flex={flex} minW={minW}>
      <Text fontSize="11px" fontWeight="700" color="grey.60">
        {label} {required && <Text as="span" color="error.60">*</Text>}
      </Text>
      {children}
    </Flex>
  );
}
