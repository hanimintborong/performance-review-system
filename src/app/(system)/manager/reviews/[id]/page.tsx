import { notFound, redirect } from "next/navigation";

import { EvaluationForm } from "@/app/(system)/manager/reviews/[id]/EvaluationForm";
import { getReviewAssignmentById, getReviewPlanById, getReviewResponse, getReviewRowById, getReviewTemplateById } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

type PageProps = { params: Promise<{ id: string }> };

export default async function ManagerEvaluationPage({ params }: PageProps) {
  const { id } = await params;
  const systemUser = await getCurrentSystemUser();
  const [assignment, row] = await Promise.all([getReviewAssignmentById(id), getReviewRowById(id)]);

  if (!assignment || !row) notFound();
  if (!systemUser || assignment.managerId !== systemUser.employeeId) redirect("/manager/team");

  const plan = await getReviewPlanById(row.planId);
  const template = plan ? await getReviewTemplateById(plan.templateId) : undefined;
  const response = await getReviewResponse(id);

  if (!template) notFound();

  return <EvaluationForm row={row} sections={template.sections} response={response} />;
}
