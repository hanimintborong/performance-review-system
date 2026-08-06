export type KpiAnswerValue = {
  selfScore: number;
  achievement: string;
  challenge: string;
  evidence: string;
  comment: string;
};

const BLANK: KpiAnswerValue = { selfScore: 0, achievement: "", challenge: "", evidence: "", comment: "" };

export function parseKpiAnswer(raw: string | undefined): KpiAnswerValue {
  if (!raw) return { ...BLANK };
  try {
    return { ...BLANK, ...JSON.parse(raw) };
  } catch {
    return { ...BLANK };
  }
}

export function stringifyKpiAnswer(value: KpiAnswerValue): string {
  return JSON.stringify(value);
}
