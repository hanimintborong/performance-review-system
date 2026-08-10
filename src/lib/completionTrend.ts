export type TrendPoint = { label: string; value: number };

export function buildCompletionTrend(finalizedDates: string[]): TrendPoint[] {
  if (finalizedDates.length === 0) return [];

  const times = finalizedDates.map((d) => new Date(d).getTime()).sort((a, b) => a - b);
  const weekMs = 7 * 86400000;
  const startWeek = Math.floor(times[0] / weekMs);
  const endWeek = Math.floor(Date.now() / weekMs);

  const points: TrendPoint[] = [];
  for (let w = startWeek; w <= endWeek; w += 1) {
    const weekEndExclusive = (w + 1) * weekMs;
    const cumulative = times.filter((t) => t < weekEndExclusive).length;
    const label = new Date(w * weekMs).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    points.push({ label, value: cumulative });
  }

  return points;
}
