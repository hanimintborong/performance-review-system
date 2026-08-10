import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const COLLECTIONS = [
  "employees",
  "users",
  "reviewTemplates",
  "reviewPlans",
  "reviewAssignments",
  "reviewResponses",
  "notificationRules",
  "notificationHistory",
  "notifications",
] as const;

function getSourceDb() {
  const app = initializeApp(
    {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    },
    "migration-source",
  );
  return getFirestore(app);
}

export async function fetchAllCollections() {
  const db = getSourceDb();
  const result: Record<string, Record<string, unknown>[]> = {};

  for (const name of COLLECTIONS) {
    const snapshot = await db.collection(name).get();
    result[name] = snapshot.docs.map((doc) => doc.data());
  }

  return result;
}
