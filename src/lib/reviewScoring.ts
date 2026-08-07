import { parseCoreValueList } from "@/lib/coreValueList";
import { parseKpiAnswer } from "@/lib/kpiAnswer";
import { parseOkrList } from "@/lib/okrList";
import type { Respondent, TemplateQuestion, TemplateSection } from "@/types/template";
import type { QuestionAnswer } from "@/types/reviewResponse";

function scoreableValue(question: TemplateQuestion, raw: string): number | null {
  if (raw === "" || raw === undefined) return null;

  if (question.type === "rating_scale" || question.type === "core_value_rating") {
    const max = question.ratingScaleMax ?? 5;
    const value = Number(raw);
    return Number.isFinite(value) ? (value / max) * 5 : null;
  }

  if (question.type === "kpi_okr") {
    const score = parseKpiAnswer(raw).selfScore;
    return score > 0 ? score : null;
  }

  return null;
}

function okrListScore(raw: string, respondent?: Respondent): number | null {
  const objectives = parseOkrList(raw).filter((o) => o.weightage > 0);
  const totalWeight = objectives.reduce((sum, o) => sum + o.weightage, 0);
  if (totalWeight === 0) return null;

  const useManagerScore = respondent === "manager";
  const weighted = objectives.reduce((sum, o) => sum + (useManagerScore ? o.managerScore : o.selfScore) * o.weightage, 0);

  const value = weighted / totalWeight;
  return value > 0 ? value : null;
}

function coreValueListScore(raw: string, ratingScaleMax: number, respondent?: Respondent): number | null {
  const useManagerScore = respondent === "manager";
  const scores = parseCoreValueList(raw)
    .map((row) => (useManagerScore ? row.managerScore : row.selfScore))
    .filter((score) => score > 0)
    .map((score) => (score / ratingScaleMax) * 5);

  if (scores.length === 0) return null;
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}

export function computeScore(sections: TemplateSection[], answers: QuestionAnswer[], respondent?: Respondent): number | null {
  const answerByQuestion = new Map(answers.map((a) => [a.questionId, a.value]));
  const scores: number[] = [];

  sections.forEach((section) => {
    section.questions.forEach((question) => {
      const raw = answerByQuestion.get(question.questionId);
      if (raw === undefined) return;

      if (question.type === "okr_list") {
        const score = okrListScore(raw, respondent);
        if (score !== null) scores.push(score);
        return;
      }

      if (question.type === "core_value_list") {
        const score = coreValueListScore(raw, question.ratingScaleMax ?? 5, respondent);
        if (score !== null) scores.push(score);
        return;
      }

      if (respondent && question.respondent !== respondent) return;

      const score = scoreableValue(question, raw);
      if (score !== null) scores.push(score);
    });
  });

  if (scores.length === 0) return null;
  return Math.round((scores.reduce((sum, s) => sum + s, 0) / scores.length) * 10) / 10;
}
