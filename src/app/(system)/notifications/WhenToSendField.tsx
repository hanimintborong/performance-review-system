"use client";

import { useState } from "react";
import { Flex, Input, NativeSelect, Text } from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";

import { RelativeTimingFields } from "@/app/(system)/notifications/RelativeTimingFields";
import { RuleInfoCallout } from "@/app/(system)/notifications/RuleInfoCallout";
import { describeSchedule } from "@/lib/describeSchedule";
import { parseWhenToSend } from "@/lib/parseWhenToSend";

type WhenToSendFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function WhenToSendField({ value, onChange }: WhenToSendFieldProps) {
  const parsed = parseWhenToSend(value);
  const [mode, setMode] = useState<"relative" | "date">(parsed?.kind === "date" ? "date" : "relative");
  const [reference, setReference] = useState(parsed?.kind === "relative" ? parsed.reference : parsed?.kind === "launch" ? "Cycle launch" : "Employee deadline");
  const [days, setDays] = useState(parsed?.kind === "relative" ? parsed.days : 3);
  const [direction, setDirection] = useState<"before" | "after">(parsed?.kind === "relative" ? parsed.direction : "before");
  const [date, setDate] = useState(parsed?.kind === "date" ? parsed.date : "");

  function composeRelative(patch: Partial<{ reference: string; days: number; direction: "before" | "after" }>) {
    const next = { reference, days, direction, ...patch };
    setReference(next.reference);
    setDays(next.days);
    setDirection(next.direction);
    onChange(next.reference === "Cycle launch" ? "On cycle launch" : `${next.days} day${next.days === 1 ? "" : "s"} ${next.direction} ${next.reference}`);
  }

  return (
    <Flex direction="column" gap="10px">
      <Flex direction="column" gap="1px">
        <Text fontSize="12px" fontWeight="600" color="grey.70">When should this be sent?</Text>
        <Text fontSize="10px" color="grey.40">Sets the trigger date only — who receives it is chosen in Delivery below.</Text>
      </Flex>

      <NativeSelect.Root size="sm" w="160px">
        <NativeSelect.Field borderRadius="10px" pl="12px" value={mode} onChange={(e) => setMode(e.target.value as "relative" | "date")}>
          <option value="relative">Relative timing</option>
          <option value="date">Specific date</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      {mode === "relative" ? (
        <Flex gap="8px" align="center" flexWrap="wrap">
          <Text fontSize="12px" fontWeight="600" color="grey.60">Send</Text>
          <RelativeTimingFields reference={reference} days={days} direction={direction} onChange={composeRelative} />
        </Flex>
      ) : (
        <Input borderRadius="10px" pl="12px" size="sm" type="date" w="180px" value={date} onChange={(e) => { setDate(e.target.value); onChange(e.target.value ? `On ${e.target.value}` : ""); }} />
      )}

      <RuleInfoCallout icon={FiInfo}>
        The notification will be sent {describeSchedule(value)}.
      </RuleInfoCallout>
    </Flex>
  );
}
