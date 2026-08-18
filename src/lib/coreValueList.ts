export type CoreValueRow = {
  label: string;
  behaviour: string;
  selfScore: number | null;
  managerScore: number | null;
  managerComment: string;
};

function blankCoreValueRow(label: string): CoreValueRow {
  return { label, behaviour: "", selfScore: null, managerScore: null, managerComment: "" };
}

export function parseCoreValueList(raw: string | undefined): CoreValueRow[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function stringifyCoreValueList(rows: CoreValueRow[]): string {
  return JSON.stringify(rows);
}

export function buildCoreValueRows(labels: string[], raw: string | undefined): CoreValueRow[] {
  const existingByLabel = new Map(parseCoreValueList(raw).map((row) => [row.label, row]));
  return labels.map((label) => ({ ...blankCoreValueRow(label), ...existingByLabel.get(label) }));
}

export function averageRating(rows: CoreValueRow[], ratingScaleMax = 5): number | null {
  const scores = rows
    .map((row) => row.managerScore ?? row.selfScore)
    .filter((score): score is number => score !== null)
    .map((score) => (score / ratingScaleMax) * 5);

  if (scores.length === 0) return null;
  return Math.round((scores.reduce((sum, s) => sum + s, 0) / scores.length) * 10) / 10;
}

export function weightedScore(rows: CoreValueRow[], ratingScaleMax = 5, sectionWeightage = 0): number {
  if (rows.length === 0 || sectionWeightage <= 0) return 0;
  const avgFraction = rows.reduce((sum, r) => sum + (r.managerScore ?? 0) / ratingScaleMax, 0) / rows.length;
  return Math.round(avgFraction * sectionWeightage * 10) / 10;
}
