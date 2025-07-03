import { rawMaterialTypes } from "../raw-material-types";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rawMaterialsValues } from "@projet-node-semaine-3/shared/enums";

export const rawMaterialsEnum = pgEnum(
  "raw_materials_value",
  rawMaterialsValues
);

export const rawMaterials = pgTable("raw_materials", {
  id: uuid("id").defaultRandom().primaryKey(),
  value: rawMaterialsEnum("value").notNull(),
  typeId: uuid("type_id")
    .references(() => rawMaterialTypes.id, { onDelete: "cascade" })
    .notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const rawMaterialsRelations = relations(rawMaterials, ({ one }) => ({
  type: one(rawMaterialTypes, {
    fields: [rawMaterials.typeId],
    references: [rawMaterialTypes.id],
  }),
}));
