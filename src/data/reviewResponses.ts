import "server-only";

import { eq } from "drizzle-orm";

import { reviewResponses as reviewResponsesTable } from "@/db/schema";
import { db } from "@/lib/db";
import { blankReviewResponse, type ReviewResponse } from "@/types/reviewResponse";

export async function getReviewResponse(assignmentId: string): Promise<ReviewResponse> {
  const [record] = await db
    .select()
    .from(reviewResponsesTable)
    .where(eq(reviewResponsesTable.assignmentId, assignmentId))
    .limit(1);
  return record ?? blankReviewResponse(assignmentId);
}

export async function saveReviewResponse(response: ReviewResponse): Promise<void> {
  await db.insert(reviewResponsesTable).values(response).onConflictDoUpdate({
    target: reviewResponsesTable.assignmentId,
    set: response,
  });
}
