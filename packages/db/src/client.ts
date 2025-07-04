import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@projet-node-semaine-3/shared/config";
import { schema } from "./schemas";

const { POSTGRES_URL } = env;

const pool = new Pool({
  connectionString: POSTGRES_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,
        }
      : false,
});

export const db = drizzle(pool, {
  schema,
  casing: "snake_case",
});
