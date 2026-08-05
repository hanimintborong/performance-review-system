import { ReviewTemplatesClient } from "@/app/(system)/review-templates/ReviewTemplatesClient";
import { getReviewTemplates } from "@/data/queries";

export default async function ReviewTemplatesPage() {
  const templates = await getReviewTemplates();

  return <ReviewTemplatesClient templates={templates} />;
}
