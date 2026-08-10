export type ParsedTiming =
  | { kind: "relative"; days: number; direction: "before" | "after"; reference: string }
  | { kind: "date"; date: string }
  | { kind: "launch" };

export function parseWhenToSend(whenToSend: string): ParsedTiming | null {
  if (whenToSend === "On cycle launch") return { kind: "launch" };

  const dateMatch = whenToSend.match(/^On (\d{4}-\d{2}-\d{2})$/);
  if (dateMatch) return { kind: "date", date: dateMatch[1] };

  const relativeMatch = whenToSend.match(/^(\d+) days? (before|after) (.+)$/);
  if (relativeMatch) {
    return {
      kind: "relative",
      days: Number(relativeMatch[1]),
      direction: relativeMatch[2] as "before" | "after",
      reference: relativeMatch[3],
    };
  }

  return null;
}
