import { furnitures } from "@/schemas/furnitures";
import { relations } from "drizzle-orm";
import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

const furnitureTypesValues = ["armoire", "étagère"] as const;

export type FurnitureTypesValues = typeof furnitureTypesValues;
export type FurnitureTypesValue = FurnitureTypesValues[number];

export const furnitureTypesRecord = {
  ARMOIRE: "armoire",
  ETAGERE: "étagère",
} as const satisfies Record<string, FurnitureTypesValue>;

export const furnitureTypes = pgTable("furniture_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text({ enum: furnitureTypesValues }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const furnitureTypesRelations = relations(
  furnitureTypes,
  ({ many }) => ({
    furnitures: many(furnitures),
  })
);
