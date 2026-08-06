import "server-only";

import { getDb } from "@/lib/firebaseAdmin";
import { blankReviewResponse, type ReviewResponse } from "@/types/reviewResponse";

const COLLECTION = "reviewResponses";

export async function getReviewResponse(assignmentId: string): Promise<ReviewResponse> {
  const doc = await getDb().collection(COLLECTION).doc(assignmentId).get();
  return doc.exists ? (doc.data() as ReviewResponse) : blankReviewResponse(assignmentId);
}

export async function saveReviewResponse(response: ReviewResponse): Promise<void> {
  await getDb().collection(COLLECTION).doc(response.assignmentId).set(response);
}
