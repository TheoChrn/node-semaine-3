export {};

declare global {
  interface EnvConfig {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    CORS_ORIGIN: string;
    POSTGRES_URL: string;
    JWT_SECRET: string;
  }
}
