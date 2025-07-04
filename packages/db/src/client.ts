import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@projet-node-semaine-3/shared/config";
import { schema } from "./schemas";

const { POSTGRES_URL } = env;

console.log("POSTGRES_URL status:", POSTGRES_URL ? "Set" : "Not set");
console.log(
  "POSTGRES_URL (masked):",
  POSTGRES_URL ? POSTGRES_URL.replace(/:[^:@]*@/, ":***@") : "undefined"
);

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

// Test de connexion seulement en production pour diagnostiquer
if (process.env.NODE_ENV === "production") {
  pool
    .connect()
    .then((client) => {
      console.log("✅ Database connected successfully");
      return client.query("SELECT NOW()");
    })
    .then((result) => {
      console.log("✅ Database query test successful:", result.rows[0]);
    })
    .catch((err) => {
      console.error("❌ Database connection failed:", err.message);
      console.error("Error code:", err.code);
      console.error("Full error:", err);
    });
}
