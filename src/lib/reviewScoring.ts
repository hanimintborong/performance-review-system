import { parseKpiAnswer } from "@/lib/kpiAnswer";
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

export function computeScore(sections: TemplateSection[], answers: QuestionAnswer[], respondent?: Respondent): number | null {
  const answerByQuestion = new Map(answers.map((a) => [a.questionId, a.value]));
  const scores: number[] = [];

  sections.forEach((section) => {
    section.questions.forEach((question) => {
      if (respondent && question.respondent !== respondent) return;

      const raw = answerByQuestion.get(question.questionId);
      if (raw === undefined) return;

      const score = scoreableValue(question, raw);
      if (score !== null) scores.push(score);
    });
  });

  if (scores.length === 0) return null;
  return Math.round((scores.reduce((sum, s) => sum + s, 0) / scores.length) * 10) / 10;
}
