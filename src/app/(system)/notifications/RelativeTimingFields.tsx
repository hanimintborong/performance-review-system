"use client";

import { Input, NativeSelect } from "@chakra-ui/react";

export const TIMING_REFERENCES = ["Cycle launch", "Employee deadline", "Manager deadline", "Employee submission", "Finalisation"];

type RelativeTimingFieldsProps = {
  reference: string;
  days: number;
  direction: "before" | "after";
  onChange: (patch: Partial<{ reference: string; days: number; direction: "before" | "after" }>) => void;
};

export function RelativeTimingFields({ reference, days, direction, onChange }: RelativeTimingFieldsProps) {
  return (
    <>
      <NativeSelect.Root size="sm" flex="1" minW="150px">
        <NativeSelect.Field borderRadius="10px" pl="12px" value={reference} onChange={(e) => onChange({ reference: e.target.value })}>
          {TIMING_REFERENCES.map((r) => <option key={r} value={r}>{r}</option>)}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      {reference !== "Cycle launch" && (
        <>
          <Input borderRadius="10px" pl="12px" size="sm" type="number" min={0} w="70px" value={days} onChange={(e) => onChange({ days: Number(e.target.value) })} />
          <NativeSelect.Root size="sm" w="100px">
            <NativeSelect.Field borderRadius="10px" pl="12px" value={direction} onChange={(e) => onChange({ direction: e.target.value as "before" | "after" })}>
              <option value="before">before</option>
              <option value="after">after</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </>
      )}
    </>
  );
}
