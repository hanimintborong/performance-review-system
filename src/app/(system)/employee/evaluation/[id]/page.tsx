import { notFound, redirect } from "next/navigation";

import { SelfAssessmentForm } from "@/app/(system)/employee/evaluation/[id]/SelfAssessmentForm";
import { getReviewPlanById, getReviewResponse, getReviewRowById, getReviewTemplateById } from "@/data/queries";
import { getCurrentSystemUser } from "@/lib/currentSystemUser";

type PageProps = { params: Promise<{ id: string }> };

export default async function SelfAssessmentPage({ params }: PageProps) {
  const { id } = await params;
  const systemUser = await getCurrentSystemUser();
  const row = await getReviewRowById(id);

  if (!row) notFound();
  if (!systemUser || row.employee.employeeId !== systemUser.employeeId) redirect("/employee/evaluation");

  const plan = await getReviewPlanById(row.planId);
  const template = plan ? await getReviewTemplateById(plan.templateId) : undefined;
  const response = await getReviewResponse(id);

  if (!template) notFound();

  return <SelfAssessmentForm row={row} sections={template.sections} response={response} />;
}
