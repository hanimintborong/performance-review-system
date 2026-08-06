export type QuestionAnswer = {
  questionId: string;
  value: string;
};

export type ReviewResponse = {
  assignmentId: string;
  answers: QuestionAnswer[];
  employeeComment: string;
  managerComment: string;
  employeeSubmittedAt: string | null;
  managerSubmittedAt: string | null;
};

export function mergeAnswers(existing: QuestionAnswer[], updates: Record<string, string>): QuestionAnswer[] {
  const byId = new Map(existing.map((a) => [a.questionId, a.value]));
  Object.entries(updates).forEach(([questionId, value]) => byId.set(questionId, value));
  return Array.from(byId.entries()).map(([questionId, value]) => ({ questionId, value }));
}

export function blankReviewResponse(assignmentId: string): ReviewResponse {
  return {
    assignmentId,
    answers: [],
    employeeComment: "",
    managerComment: "",
    employeeSubmittedAt: null,
    managerSubmittedAt: null,
  };
}
