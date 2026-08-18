import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import { mockEmployees } from "@/data/mockEmployees";
import { mockNotificationHistory } from "@/data/mockNotificationHistory";
import { mockReviewAssignments } from "@/data/mockReviewAssignments";
import { mockReviewPlans } from "@/data/mockReviewPlans";
import { mockReviewTemplates } from "@/data/mockReviewTemplates";

const COLLECTIONS: { name: string; docs: Record<string, unknown>[]; idField: string }[] = [
  { name: "employees", docs: mockEmployees, idField: "employeeId" },
  { name: "reviewTemplates", docs: mockReviewTemplates, idField: "templateId" },
  { name: "reviewPlans", docs: mockReviewPlans, idField: "planId" },
  { name: "reviewAssignments", docs: mockReviewAssignments, idField: "assignmentId" },
  { name: "notificationHistory", docs: mockNotificationHistory, idField: "historyId" },
];

function getDb() {
  const app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
  return getFirestore(app);
}

async function seed() {
  const db = getDb();

  for (const { name, docs, idField } of COLLECTIONS) {
    const batch = db.batch();
    for (const doc of docs) {
      const id = String(doc[idField]);
      batch.set(db.collection(name).doc(id), doc);
    }
    await batch.commit();
    console.log(`Seeded ${docs.length} docs into "${name}"`);
  }

  console.log("Done.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
