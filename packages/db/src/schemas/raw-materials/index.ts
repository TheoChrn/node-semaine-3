import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";

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

const rawMaterialsTypeValue = ["bois", "fer", "plastique"] as const;

export type RawMaterialsTypeValues = typeof rawMaterialsTypeValue;
export type RawMaterialsTypeValue = RawMaterialsTypeValues[number];

export const rawMaterialsTypeRecord = {
  BOIS: "bois",
  FER: "fer",
  PLASTIQUE: "plastique",
} as const satisfies Record<string, RawMaterialsTypeValue>;

export const rawMaterials = pgTable("raw_materials", {
  id: uuid("id").defaultRandom().primaryKey(),
  value: text({ enum: rawMaterialsValues }).notNull(),
  type: text({ enum: rawMaterialsTypeValue }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
