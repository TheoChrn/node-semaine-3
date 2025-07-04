import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "../users";
import { furnituresRawMaterials } from "../furnitures-materials";
import { furnitureTypesValues } from "@projet-node-semaine-3/shared/enums";

export const furnitureTypesEnum = pgEnum("type", furnitureTypesValues);

export const furnitures = pgTable("furnitures", {
  id: uuid("id").defaultRandom().primaryKey(),
  value: varchar("value", { length: 255 }).notNull(),
  createdBy: uuid("created_by")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: furnitureTypesEnum("type").notNull(),
  quantity: smallint("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const furnituresRelations = relations(furnitures, ({ one, many }) => ({
  user: one(users, {
    fields: [furnitures.createdBy],
    references: [users.id],
  }),
  furnitureMaterials: many(furnituresRawMaterials),
}));
