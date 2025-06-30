import { companies } from "@/schemas/companies";
import { rawMaterials } from "@/schemas/raw-materials";
import { relations } from "drizzle-orm";
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
  companyId: uuid()
    .references(() => companies.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const rawMaterialTypesRelations = relations(
  rawMaterialTypes,
  ({ many, one }) => ({
    materials: many(rawMaterials),
    company: one(companies, {
      fields: [rawMaterialTypes.companyId],
      references: [companies.id],
    }),
  })
);
