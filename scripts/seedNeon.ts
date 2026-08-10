import { db, closeDb } from "./migrate/pgClient";
import {
  employees,
  notificationHistory,
  notificationRules,
  reviewAssignments,
  reviewPlans,
  reviewTemplates,
} from "@/db/schema";
import { mockEmployees } from "@/data/mockEmployees";
import { mockNotificationHistory } from "@/data/mockNotificationHistory";
import { mockNotificationRules } from "@/data/mockNotificationRules";
import { mockReviewAssignments } from "@/data/mockReviewAssignments";
import { mockReviewPlans } from "@/data/mockReviewPlans";
import { mockReviewTemplates } from "@/data/mockReviewTemplates";

async function seed() {
  console.log("Seeding Neon Postgres with mock data...");

  await db.insert(employees).values(mockEmployees).onConflictDoNothing();
  console.log(`  employees: ${mockEmployees.length}`);

  await db.insert(reviewTemplates).values(mockReviewTemplates).onConflictDoNothing();
  console.log(`  reviewTemplates: ${mockReviewTemplates.length}`);

  await db.insert(reviewPlans).values(mockReviewPlans).onConflictDoNothing();
  console.log(`  reviewPlans: ${mockReviewPlans.length}`);

  await db.insert(reviewAssignments).values(mockReviewAssignments).onConflictDoNothing();
  console.log(`  reviewAssignments: ${mockReviewAssignments.length}`);

  await db.insert(notificationRules).values(mockNotificationRules).onConflictDoNothing();
  console.log(`  notificationRules: ${mockNotificationRules.length}`);

  await db.insert(notificationHistory).values(mockNotificationHistory).onConflictDoNothing();
  console.log(`  notificationHistory: ${mockNotificationHistory.length}`);

  await closeDb();
  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
