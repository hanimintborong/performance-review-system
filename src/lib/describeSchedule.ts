import { parseWhenToSend } from "@/lib/parseWhenToSend";

const REFERENCE_PHRASE: Record<string, string> = {
  "Employee deadline": "the employee deadline",
  "Manager deadline": "the manager deadline",
  "Employee submission": "the employee submission",
  Finalisation: "finalisation",
};

export function describeSchedule(whenToSend: string): string {
  const parsed = parseWhenToSend(whenToSend);
  if (!parsed) return "not set";
  if (parsed.kind === "launch") return "on cycle launch";
  if (parsed.kind === "date") return `on ${parsed.date}`;

  const dayLabel = `${parsed.days} day${parsed.days === 1 ? "" : "s"}`;
  const referenceLabel = REFERENCE_PHRASE[parsed.reference] ?? parsed.reference.toLowerCase();
  return `${dayLabel} ${parsed.direction} ${referenceLabel}`;
}
