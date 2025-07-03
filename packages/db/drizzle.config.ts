import { env } from "@projet-node-semaine-3/shared/config";
import type { Config } from "drizzle-kit";

const { POSTGRES_URL } = env;

if (!POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}

export default {
  dialect: "postgresql",
  out: "src/migrations",
  schema: "./src/schemas/**/*.ts",
  dbCredentials: { url: POSTGRES_URL },
  verbose: true,
  strict: true,
  casing: "snake_case",
} satisfies Config;
