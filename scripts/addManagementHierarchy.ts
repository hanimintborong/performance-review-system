import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import { mockEmployees } from "@/data/mockEmployees";
import { mockReviewAssignments } from "@/data/mockReviewAssignments";

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

const NEW_ASSIGNMENT_IDS = ["ASG015", "ASG016", "ASG017", "ASG018", "ASG019"];

async function run() {
  const db = getDb();

  const employeeBatch = db.batch();
  mockEmployees.forEach((employee) => employeeBatch.set(db.collection("employees").doc(employee.employeeId), employee));
  await employeeBatch.commit();
  console.log(`Updated ${mockEmployees.length} employees (added CTO/CFO, fixed manager chain).`);

  const newAssignments = mockReviewAssignments.filter((a) => NEW_ASSIGNMENT_IDS.includes(a.assignmentId));
  const assignmentBatch = db.batch();
  newAssignments.forEach((a) => assignmentBatch.set(db.collection("reviewAssignments").doc(a.assignmentId), a));
  await assignmentBatch.commit();
  console.log(`Added ${newAssignments.length} manager self-review assignments (did not touch existing ones).`);

  console.log("Done.");
}

run().catch((error) => {
  console.error("Failed:", error);
  process.exit(1);
});
