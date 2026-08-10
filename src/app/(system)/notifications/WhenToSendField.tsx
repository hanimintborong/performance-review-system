"use client";

import { useState } from "react";
import { Flex, Input, NativeSelect, Text } from "@chakra-ui/react";

import { RelativeTimingFields } from "@/app/(system)/notifications/RelativeTimingFields";

type WhenToSendFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function WhenToSendField({ value, onChange }: WhenToSendFieldProps) {
  const [mode, setMode] = useState<"relative" | "date">(value.startsWith("On ") && !value.includes("launch") ? "date" : "relative");
  const [reference, setReference] = useState("Employee deadline");
  const [days, setDays] = useState(3);
  const [direction, setDirection] = useState<"before" | "after">("before");
  const [date, setDate] = useState("");

  function composeRelative(patch: Partial<{ reference: string; days: number; direction: "before" | "after" }>) {
    const next = { reference, days, direction, ...patch };
    setReference(next.reference);
    setDays(next.days);
    setDirection(next.direction);
    onChange(next.reference === "Cycle launch" ? "On cycle launch" : `${next.days} day${next.days === 1 ? "" : "s"} ${next.direction} ${next.reference}`);
  }

  return (
    <Flex direction="column" gap="6px">
      <Text fontSize="11px" color="grey.50">Currently saved: {value || "not set"}</Text>
      <Flex gap="8px" align="center" flexWrap="wrap">
        <NativeSelect.Root size="sm" w="140px">
          <NativeSelect.Field borderRadius="10px" pl="12px" value={mode} onChange={(e) => setMode(e.target.value as "relative" | "date")}>
            <option value="relative">Relative timing</option>
            <option value="date">Specific date</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        {mode === "relative" ? (
          <RelativeTimingFields reference={reference} days={days} direction={direction} onChange={composeRelative} />
        ) : (
          <Input borderRadius="10px" pl="12px" size="sm" type="date" value={date} onChange={(e) => { setDate(e.target.value); onChange(e.target.value ? `On ${e.target.value}` : ""); }} />
        )}
      </Flex>
    </Flex>
  );
}
