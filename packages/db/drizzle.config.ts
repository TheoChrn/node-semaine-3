import type { Config } from "drizzle-kit";
import { env } from "@projet-node-semaine-3/shared";

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}

const { POSTGRES_URL } = env;

const nonPoolingUrl = process.env.POSTGRES_URL.replace(":6543", ":5432");

export default {
  schema: "./src/schemas",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  casing: "snake_case",
} satisfies Config;
