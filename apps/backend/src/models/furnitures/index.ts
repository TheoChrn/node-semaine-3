import { CreateFurnitureInput } from "@/controllers/furnitures";
import { jsonAgg } from "@/utils/agg";
import { db, schema } from "@projet-node-semaine-3/db";
import { eq, sql } from "drizzle-orm";

import { arrayToObject } from "@projet-node-semaine-3/shared/format";

export const furnitures = {
  create: async (input: CreateFurnitureInput) => {
    const { rawMaterials, ...restInput } = input;
    return db.transaction(async (tx) => {
      const [furniture] = await tx
        .insert(schema.furnitures)
        .values({
          ...restInput,
          createdBy: "e17c1925-c7e6-4807-9491-46c81dea0a81",
        })
        .returning({ id: schema.furnitures.id });

      if (!furniture) throw new Error("Insertion meuble a échoué");

      await tx.insert(schema.furnituresRawMaterials).values(
        rawMaterials.map((id) => ({
          furnitureId: furniture.id,
          materialId: id,
        }))
      );
    });
  },
  getAll: async () => {
    const materials = db
      .select({
        furnitureId: schema.furnituresRawMaterials.furnitureId,
        type: schema.rawMaterialTypes.value,
        materials: jsonAgg({
          id: schema.rawMaterials.id,
          value: schema.rawMaterials.value,
        }).as("materials_data"),
      })
      .from(schema.furnituresRawMaterials)
      .leftJoin(
        schema.rawMaterials,
        eq(schema.rawMaterials.id, schema.furnituresRawMaterials.materialId)
      )
      .leftJoin(
        schema.rawMaterialTypes,
        eq(schema.rawMaterialTypes.id, schema.rawMaterials.typeId)
      )
      .groupBy(
        schema.furnituresRawMaterials.furnitureId,
        schema.rawMaterialTypes.value
      )
      .as("rawMaterials");

    return db
      .select({
        id: schema.furnitures.id,
        value: schema.furnitures.value,
        keyword: schema.furnitures.keyword,
        type: schema.furnitures.type,
        materialsByType: jsonAgg({
          type: materials.type,
          materials: sql`${materials.materials}`,
        }).as("materials_by_type"),
      })
      .from(schema.furnitures)
      .leftJoin(materials, eq(materials.furnitureId, schema.furnitures.id))
      .groupBy(
        schema.furnitures.id,
        schema.furnitures.value,
        schema.furnitures.keyword,
        schema.furnitures.type
      )
      .then((rows) =>
        rows.map(({ materialsByType, ...row }) => ({
          ...row,
          materials: arrayToObject(materialsByType, "type"),
        }))
      );
  },
};
