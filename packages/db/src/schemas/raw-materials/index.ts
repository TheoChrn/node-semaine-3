import { rawMaterialTypes } from "../raw-material-types";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

const woodMaterials = ["frêne", "chêne", "noyer"] as const;
const ironMaterials = ["acier", "inox", "aluminium"] as const;
const plasticMaterials = ["plastique"] as const;

const rawMaterialsValues = [
  ...woodMaterials,
  ...ironMaterials,
  ...plasticMaterials,
] as const;

export type RawMaterialsValues = typeof rawMaterialsValues;
export type RawMaterialsValue = RawMaterialsValues[number];

export const rawMaterialsRecord = {
  FRENE: "frêne",
  CHENE: "chêne",
  NOYER: "noyer",
  ACIER: "acier",
  INOX: "inox",
  ALUMINIUM: "aluminium",
  PLASTIQUE: "plastique",
} as const satisfies Record<string, RawMaterialsValue>;

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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const rawMaterialsRelations = relations(rawMaterials, ({ one }) => ({
  type: one(rawMaterialTypes, {
    fields: [rawMaterials.typeId],
    references: [rawMaterialTypes.id],
  }),
}));
