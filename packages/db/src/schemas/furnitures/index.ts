import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { furnitureTypes } from "../furnitures-type";
import { users } from "../users";
import { furnituresRawMaterials } from "../furnitures-materials";

export const furnitures = pgTable("furnitures", {
  id: uuid("id").defaultRandom().primaryKey(),
  value: varchar("value", { length: 255 }).notNull(),
  createdBy: uuid("created_by")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  typeId: uuid("type_id")
    .references(() => furnitureTypes.id, { onDelete: "cascade" })
    .notNull(),
  keyword: varchar("keyword", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const furnituresRelations = relations(furnitures, ({ one, many }) => ({
  type: one(furnitureTypes, {
    fields: [furnitures.typeId],
    references: [furnitureTypes.id],
  }),
  user: one(users, {
    fields: [furnitures.createdBy],
    references: [users.id],
  }),
  furnitureMaterials: many(furnituresRawMaterials),
}));
