"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Flex, Text, Textarea } from "@chakra-ui/react";

import { saveManagerDraftAction, submitManagerEvaluationAction } from "@/app/(system)/manager/reviews/[id]/evaluationActions";
import { AppCard } from "@/components/common/AppCard";
import { DiscussionGuidanceBanner } from "@/components/common/DiscussionGuidanceBanner";
import { EmployeeInfoCard } from "@/components/common/EmployeeInfoCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ScoreBadge } from "@/components/common/ScoreBadge";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ReviewFormSection } from "@/components/review-form/ReviewFormSection";
import { toaster } from "@/components/ui/toaster";
import { REVIEW_STATUS_STYLE } from "@/constants/statusColors";
import type { ReviewRow } from "@/data/queries";
import { computeFinalWeightedScore } from "@/lib/reviewScoring";
import type { ReviewResponse } from "@/types/reviewResponse";
import type { ReviewStatus } from "@/types/review";
import type { TemplateSection } from "@/types/template";

const NOT_YET_SUBMITTED: ReviewStatus[] = ["Not Started", "Self-Assessment"];

type EvaluationFormProps = {
  row: ReviewRow;
  sections: TemplateSection[];
  response: ReviewResponse;
};

export function EvaluationForm({ row, sections, response }: EvaluationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const alreadySubmitted = response.managerSubmittedAt !== null;
  const cycleClosed = row.planStatus === "Closed";
  const locked = alreadySubmitted || cycleClosed;
  const waitingOnEmployee = NOT_YET_SUBMITTED.includes(row.status);

  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(response.answers.map((a) => [a.questionId, a.value])),
  );
  const [comment, setComment] = useState(response.managerComment);
  const finalScore = computeFinalWeightedScore(
    sections,
    Object.entries(answers).map(([questionId, value]) => ({ questionId, value })),
  );
  const hasWeightedSections = sections.some((s) => (s.weightage ?? 0) > 0);

  function persist(submit: boolean) {
    startTransition(async () => {
      try {
        if (submit) {
          await submitManagerEvaluationAction(row.assignmentId, answers, comment);
          toaster.create({ title: "Evaluation submitted", type: "success" });
          router.push("/manager/team");
        } else {
          await saveManagerDraftAction(row.assignmentId, answers, comment);
          toaster.create({ title: "Draft saved", type: "success" });
        }
      } catch (error) {
        toaster.create({ title: "Could not submit", description: error instanceof Error ? error.message : "Please try again.", type: "error" });
      }
    });
  }

  return (
    <Flex direction="column" gap="14px">
      <EmployeeInfoCard employee={row.employee} />

      <AppCard p="14px 20px">
        <Flex align="center" justify="space-between" flexWrap="wrap" gap="10px">
          <Flex direction="column" gap="2px">
            <Text fontSize="15px" fontWeight="700" color="grey.80">{row.planTitle} — Evaluation</Text>
            {cycleClosed && <Text fontSize="12px" color="error.70">This review cycle is closed. It&apos;s now read-only.</Text>}
          </Flex>
          <StatusBadge label={row.status} style={REVIEW_STATUS_STYLE[row.status]} />
        </Flex>
      </AppCard>

      {row.status === "Manager Submitted" && <DiscussionGuidanceBanner audience="manager" />}

      {hasWeightedSections && (
        <AppCard p="14px 20px">
          <Flex align="center" justify="space-between" flexWrap="wrap" gap="10px">
            <Flex direction="column" gap="2px">
              <Text fontSize="12px" fontWeight="700" color="grey.80">Final weighted score (live)</Text>
              <Text fontSize="11px" color="grey.60">Updates as you rate — based on your ratings only. Shows — until every weighted section is rated.</Text>
            </Flex>
            <ScoreBadge score={finalScore} max={100} />
          </Flex>
        </AppCard>
      )}

      {waitingOnEmployee ? (
        <AppCard p="24px">
          <Text fontSize="13px" color="grey.60">
            {row.employee.name} hasn&apos;t submitted their self-assessment yet — you can evaluate once they do.
          </Text>
        </AppCard>
      ) : (
        <>
          {sections.map((section) => (
            <ReviewFormSection
              key={section.sectionId}
              section={section}
              answers={answers}
              editableRespondent={locked ? undefined : "manager"}
              onAnswerChange={(questionId, value) => setAnswers((prev) => ({ ...prev, [questionId]: value }))}
            />
          ))}

          <AppCard p="16px 20px">
            <Text fontSize="12px" fontWeight="700" color="grey.80" mb="6px">Review meeting notes & overall feedback</Text>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              px="12px"
              py="8px"
              disabled={locked}
              placeholder="Key discussion points from the review conversation…"
            />
          </AppCard>

          {!locked && (
            <Flex justify="flex-end" gap="10px">
              <SecondaryButton onClick={() => persist(false)} loading={isPending}>Save draft</SecondaryButton>
              <PrimaryButton onClick={() => persist(true)} loading={isPending}>Submit evaluation</PrimaryButton>
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
}
