import { relations } from "drizzle-orm";
import { furnitures } from "../furnitures";
import { rawMaterials } from "../raw-materials";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

export const furnituresRawMaterials = pgTable(
  "furniture_materials",
  {
    furnitureId: uuid("furniture_id")
      .notNull()
      .references(() => furnitures.id, { onDelete: "cascade" }),
    materialId: uuid("material_id")
      .notNull()
      .references(() => rawMaterials.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.furnitureId, t.materialId] })]
);

export const furnitureMaterialsRelations = relations(
  furnituresRawMaterials,
  ({ one }) => ({
    furniture: one(furnitures, {
      fields: [furnituresRawMaterials.furnitureId],
      references: [furnitures.id],
    }),
    material: one(rawMaterials, {
      fields: [furnituresRawMaterials.materialId],
      references: [rawMaterials.id],
    }),
  })
);
