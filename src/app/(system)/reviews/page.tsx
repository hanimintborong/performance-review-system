import { ReviewsClient } from "@/app/(system)/reviews/ReviewsClient";
import { getReviewPlans, getReviewRows } from "@/data/queries";

export default async function ReviewsPage() {
  const [allRows, plans] = await Promise.all([getReviewRows(), getReviewPlans()]);

  return <ReviewsClient allRows={allRows} plans={plans} />;
}
