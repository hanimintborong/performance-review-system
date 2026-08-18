export type OkrObjective = {
  id: string;
  title: string;
  weightage: number;
  selfScore: number | null;
  achievement: string;
  managerScore: number | null;
  managerComment: string;
};

const BLANK: Omit<OkrObjective, "id"> = {
  title: "",
  weightage: 0,
  selfScore: null,
  achievement: "",
  managerScore: null,
  managerComment: "",
};

export function blankOkrObjective(id: string): OkrObjective {
  return { id, ...BLANK };
}

export function parseOkrList(raw: string | undefined): OkrObjective[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((o, i) => ({ ...blankOkrObjective(String(i)), ...o }));
  } catch {
    return [];
  }
}

export function stringifyOkrList(objectives: OkrObjective[]): string {
  return JSON.stringify(objectives);
}

export function weightageScore(objective: OkrObjective, ratingMax = 5): number {
  if (objective.managerScore === null) return 0;
  return Math.round(objective.weightage * (objective.managerScore / ratingMax) * 10) / 10;
}

export function totalWeightage(objectives: OkrObjective[]): number {
  return Math.round(objectives.reduce((sum, o) => sum + (o.weightage || 0), 0) * 10) / 10;
}

export function totalWeightageScore(objectives: OkrObjective[]): number {
  return Math.round(objectives.reduce((sum, o) => sum + weightageScore(o), 0) * 10) / 10;
}
