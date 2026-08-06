"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Flex, Text, Textarea } from "@chakra-ui/react";

import { saveSelfAssessmentDraftAction, submitSelfAssessmentAction } from "@/app/(system)/employee/evaluation/[id]/selfAssessmentActions";
import { AppCard } from "@/components/common/AppCard";
import { EmployeeInfoCard } from "@/components/common/EmployeeInfoCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { ReviewFormSection } from "@/components/review-form/ReviewFormSection";
import { toaster } from "@/components/ui/toaster";
import type { ReviewRow } from "@/data/queries";
import type { ReviewResponse } from "@/types/reviewResponse";
import type { TemplateSection } from "@/types/template";

type SelfAssessmentFormProps = {
  row: ReviewRow;
  sections: TemplateSection[];
  response: ReviewResponse;
};

export function SelfAssessmentForm({ row, sections, response }: SelfAssessmentFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const alreadySubmitted = response.employeeSubmittedAt !== null;

  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(response.answers.map((a) => [a.questionId, a.value])),
  );
  const [comment, setComment] = useState(response.employeeComment);

  function persist(submit: boolean) {
    startTransition(async () => {
      if (submit) {
        await submitSelfAssessmentAction(row.assignmentId, answers, comment);
        toaster.create({ title: "Self-assessment submitted", type: "success" });
        router.push("/employee/reviews");
      } else {
        await saveSelfAssessmentDraftAction(row.assignmentId, answers, comment);
        toaster.create({ title: "Draft saved", type: "success" });
      }
    });
  }

  return (
    <Flex direction="column" gap="14px">
      <EmployeeInfoCard employee={row.employee} />

      <AppCard p="14px 20px">
        <Text fontSize="15px" fontWeight="700" color="grey.80">{row.planTitle} — Self-Assessment</Text>
        <Text fontSize="12px" color="grey.60" mt="2px">Deadline: {row.deadline}</Text>
        {alreadySubmitted && (
          <Text fontSize="12px" color="success.70" mt="6px">
            You submitted this on {response.employeeSubmittedAt?.slice(0, 10)}. It&apos;s now read-only.
          </Text>
        )}
      </AppCard>

      {sections.map((section) => (
        <ReviewFormSection
          key={section.sectionId}
          section={section}
          answers={answers}
          editableRespondent={alreadySubmitted ? undefined : "employee"}
          onAnswerChange={(questionId, value) => setAnswers((prev) => ({ ...prev, [questionId]: value }))}
        />
      ))}

      <AppCard p="16px 20px">
        <Text fontSize="12px" fontWeight="700" color="grey.80" mb="6px">Overall comments & future goals</Text>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          disabled={alreadySubmitted}
          placeholder="Strengths, areas to develop, and goals for the next cycle…"
        />
      </AppCard>

      {!alreadySubmitted && (
        <Flex justify="flex-end" gap="10px">
          <SecondaryButton onClick={() => persist(false)} loading={isPending}>Save draft</SecondaryButton>
          <PrimaryButton onClick={() => persist(true)} loading={isPending}>Submit self-assessment</PrimaryButton>
        </Flex>
      )}
    </Flex>
  );
}
