import type { Config } from "drizzle-kit";
import { env } from "../shared/dist/config/config";

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
