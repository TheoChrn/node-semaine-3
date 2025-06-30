import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const funitures = pgTable("funitures", {
  id: uuid("id").defaultRandom().primaryKey(),
  value: varchar("value", { length: 255 }).notNull(),
  keyword: varchar("keyword", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
