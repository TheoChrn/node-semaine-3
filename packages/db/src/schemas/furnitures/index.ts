import { furnitureTypes } from "@/schemas/furnitures-type";
import { users } from "@/schemas/users";
import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const furnitures = pgTable("funitures", {
  id: uuid("id").defaultRandom().primaryKey(),
  value: varchar("value", { length: 255 }).notNull(),
  createdBy: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  typeId: uuid()
    .references(() => furnitureTypes.id, { onDelete: "cascade" })
    .notNull(),
  keyword: varchar("keyword", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const furnituresRelations = relations(furnitures, ({ one }) => ({
  type: one(furnitureTypes, {
    fields: [furnitures.typeId],
    references: [furnitureTypes.id],
  }),
  user: one(users, {
    fields: [furnitures.createdBy],
    references: [users.id],
  }),
}));
