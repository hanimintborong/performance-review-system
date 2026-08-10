import { fetchAllCollections } from "./migrate/fetchFirestore";
import { insertAll } from "./migrate/insertPostgres";
import { closeDb } from "./migrate/pgClient";

async function main() {
  console.log("Fetching data from Firestore...");
  const data = await fetchAllCollections();

  Object.entries(data).forEach(([name, docs]) => {
    console.log(`  ${name}: ${docs.length} docs`);
  });

  console.log("Inserting into Neon Postgres...");
  await insertAll(data);
  await closeDb();

  console.log("Done. Verify the counts above match your Firestore console.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
