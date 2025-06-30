import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";

const userRole = ["user", "admin"] as const;
export type UserRoleValues = typeof userRole;
export type UserRole = UserRoleValues[number];

export const userRolesValues = {
  USER: "user",
  ADMIN: "admin",
} as const satisfies Record<string, UserRole>;

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: text({ enum: userRole }).notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
