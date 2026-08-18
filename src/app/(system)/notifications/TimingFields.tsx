"use client";

import { Flex, Input, NativeSelect, Text } from "@chakra-ui/react";

import type { CustomNotificationTiming } from "@/types/notification";

const KIND_LABELS: Record<CustomNotificationTiming["kind"], string> = {
  immediately: "Immediately",
  date: "On a specific date",
  interval: "Every X days while pending",
};

type TimingFieldsProps = {
  timing: CustomNotificationTiming;
  onChange: (timing: CustomNotificationTiming) => void;
};

export function TimingFields({ timing, onChange }: TimingFieldsProps) {
  return (
    <Flex direction="column" gap="8px">
      <Text fontSize="11px" fontWeight="700" color="grey.60">When to send</Text>
      <NativeSelect.Root size="sm">
        <NativeSelect.Field
          value={timing.kind}
          onChange={(e) => {
            const kind = e.target.value as CustomNotificationTiming["kind"];
            if (kind === "immediately") onChange({ kind });
            else if (kind === "date") onChange({ kind, date: new Date().toISOString().slice(0, 10) });
            else onChange({ kind, everyDays: 3 });
          }}
          pl="12px"
          pr="30px"
        >
          {Object.entries(KIND_LABELS).map(([kind, label]) => <option key={kind} value={kind}>{label}</option>)}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      {timing.kind === "date" && (
        <Input size="sm" px="12px" type="date" value={timing.date} onChange={(e) => onChange({ kind: "date", date: e.target.value })} />
      )}

      {timing.kind === "interval" && (
        <Flex align="center" gap="8px">
          <Text fontSize="12px" color="grey.60">Every</Text>
          <Input size="sm" px="12px" w="80px" type="number" min={1} value={timing.everyDays} onChange={(e) => onChange({ kind: "interval", everyDays: Number(e.target.value) || 1 })} />
          <Text fontSize="12px" color="grey.60">day(s), until stopped</Text>
        </Flex>
      )}
    </Flex>
  );
}
