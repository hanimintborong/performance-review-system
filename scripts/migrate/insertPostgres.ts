import { db } from "./pgClient";
import {
  employees,
  notificationHistory,
  notifications,
  reviewAssignments,
  reviewPlans,
  reviewResponses,
  reviewTemplates,
  systemUsers,
} from "@/db/schema";

const TABLE_BY_COLLECTION = {
  employees,
  users: systemUsers,
  reviewTemplates,
  reviewPlans,
  reviewAssignments,
  reviewResponses,
  notificationHistory,
  notifications,
};

export async function insertAll(data: Record<string, Record<string, unknown>[]>) {
  for (const [collection, table] of Object.entries(TABLE_BY_COLLECTION)) {
    const rows = data[collection];
    if (!rows || rows.length === 0) continue;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await db.insert(table).values(rows as any[]).onConflictDoNothing();
  }
}
