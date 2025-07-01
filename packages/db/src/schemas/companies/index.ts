import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

const companiesValues = ["BBois", "MetaLo", "pPlastique"] as const;

export type CompaniesValues = typeof companiesValues;
export type CompaniesValue = CompaniesValues[number];

export const companiesRecord = {
  BBOIS: "BBois",
  METALO: "MetaLo",
  PPLASTIQUE: "pPlastique",
} as const satisfies Record<string, CompaniesValue>;

export const nameEnum = pgEnum("name", companiesValues);

export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: nameEnum("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
