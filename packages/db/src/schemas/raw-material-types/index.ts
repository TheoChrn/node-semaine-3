import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

const rawMaterialTypeValue = ["bois", "fer", "plastique"] as const;

export type RawMaterialTypesValues = typeof rawMaterialTypeValue;
export type RawMaterialTypesValue = RawMaterialTypesValues[number];

export const rawMaterialsTypeRecord = {
  BOIS: "bois",
  FER: "fer",
  PLASTIQUE: "plastique",
} as const satisfies Record<string, RawMaterialTypesValue>;

export const rawMaterialTypes = pgTable("raw_material_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text({ enum: rawMaterialTypeValue }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
