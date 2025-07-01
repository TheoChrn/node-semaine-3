import { companies } from "../companies";
import { rawMaterials } from "../raw-materials";
import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  timestamp,
  text,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";

const rawMaterialTypeValue = ["bois", "fer", "plastique"] as const;

export type RawMaterialTypesValues = typeof rawMaterialTypeValue;
export type RawMaterialTypesValue = RawMaterialTypesValues[number];

export const rawMaterialsTypeRecord = {
  BOIS: "bois",
  FER: "fer",
  PLASTIQUE: "plastique",
} as const satisfies Record<string, RawMaterialTypesValue>;

export const rawMaterialTypesEnum = pgEnum(
  "raw_material_types_value",
  rawMaterialTypeValue
);

export const rawMaterialTypes = pgTable(
  "raw_material_types",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    value: rawMaterialTypesEnum("value").notNull(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueValue: unique().on(table.value),
  })
);

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
