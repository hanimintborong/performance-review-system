import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

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

const OLD_TO_NEW: Record<string, string> = {
  Procurement: "Revenue",
  "Product & Design": "Product",
  "Sales & Partnerships": "Revenue",
  "Finance & Ops": "Finance",
  "Human Resources": "People & Culture",
};

function remap(department: string): string {
  return OLD_TO_NEW[department] ?? department;
}

async function run() {
  const db = getDb();

  const employees = await db.collection("employees").get();
  const employeeBatch = db.batch();
  let employeeChanges = 0;
  employees.docs.forEach((doc) => {
    const department = doc.data().department as string;
    const next = remap(department);
    if (next !== department) {
      employeeBatch.update(doc.ref, { department: next });
      employeeChanges += 1;
    }
  });
  if (employeeChanges > 0) await employeeBatch.commit();
  console.log(`Updated ${employeeChanges} employee department(s).`);

  for (const collection of ["reviewPlans", "reviewTemplates"] as const) {
    const field = collection === "reviewPlans" ? "departments" : "assignedDepartments";
    const snapshot = await db.collection(collection).get();
    const batch = db.batch();
    let changes = 0;
    snapshot.docs.forEach((doc) => {
      const list = (doc.data()[field] as string[] | undefined) ?? [];
      const next = list.map(remap);
      if (JSON.stringify(next) !== JSON.stringify(list)) {
        batch.update(doc.ref, { [field]: next });
        changes += 1;
      }
    });
    if (changes > 0) await batch.commit();
    console.log(`Updated ${changes} ${collection} document(s).`);
  }

  console.log("Done.");
}

run().catch((error) => {
  console.error("Failed:", error);
  process.exit(1);
});
