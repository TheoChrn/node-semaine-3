import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { furnitures } from "../furnitures";

const userRole = ["user", "admin"] as const;
export type UserRoleValues = typeof userRole;
export type UserRole = UserRoleValues[number];

export const userRolesValues = {
  USER: "user",
  ADMIN: "admin",
} as const satisfies Record<string, UserRole>;

export const roleEnum = pgEnum("role_value", userRole);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  furnitures: many(furnitures),
}));
