import { ReviewPlansClient } from "@/app/(system)/review-plans/ReviewPlansClient";
import { getReviewPlanRows } from "@/data/queries";

export default async function ReviewPlansPage() {
  const plans = await getReviewPlanRows();

  return <ReviewPlansClient plans={plans} />;
}
