import { ReviewTemplatesClient } from "@/app/(system)/review-templates/ReviewTemplatesClient";
import { getReviewPlans, getReviewTemplates } from "@/data/queries";

export default async function ReviewTemplatesPage() {
  const [templates, plans] = await Promise.all([getReviewTemplates(), getReviewPlans()]);

  const templateUsage: Record<string, string[]> = {};
  plans.filter((p) => p.status !== "Closed").forEach((p) => {
    (templateUsage[p.templateId] ??= []).push(p.title);
  });

  return <ReviewTemplatesClient templates={templates} templateUsage={templateUsage} />;
}
