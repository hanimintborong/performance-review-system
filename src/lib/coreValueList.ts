export type CoreValueRow = {
  label: string;
  behaviour: string;
  selfScore: number;
  managerScore: number;
  managerComment: string;
};

function blankCoreValueRow(label: string): CoreValueRow {
  return { label, behaviour: "", selfScore: 0, managerScore: 0, managerComment: "" };
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
