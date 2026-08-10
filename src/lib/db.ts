import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";

const globalForDb = globalThis as unknown as { pgClient?: ReturnType<typeof postgres> };

function getClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set in .env.local");

  if (!globalForDb.pgClient) {
    globalForDb.pgClient = postgres(url, { prepare: false });
  }
  return globalForDb.pgClient;
}

export const db = drizzle(getClient(), { schema });
