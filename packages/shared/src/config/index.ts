import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { EnvConfig } from "../types";

const NODE_ENV = process.env.NODE_ENV || "development";
const envFile = NODE_ENV === "production" ? ".env.production" : ".env";

dotenv.config({
  path: path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    `../../../../${envFile}`
  ),
});

export const env: EnvConfig = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV as EnvConfig["NODE_ENV"],
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  POSTGRES_URL: process.env.POSTGRES_URL!,
  JWT_SECRET:
    process.env.JWT_SECRET || "SecretTresBienGardeNePasDivulgerPubliquement",
};
