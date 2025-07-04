import { jsonAgg } from "@/utils/agg";
import { db, schema } from "@projet-node-semaine-3/db";
import { eq, sql } from "drizzle-orm";

import { rawMaterialValueToId } from "@projet-node-semaine-3/shared/enums";
import { arrayToObject, groupBy } from "@projet-node-semaine-3/shared/format";
import { CreateFurnitureInput } from "@projet-node-semaine-3/shared/validators";

export const furnitures = {
  create: async (input: CreateFurnitureInput) => {
    const { rawMaterials, ...restInput } = input;

    return await db.transaction(async (tx) => {
      const furniture = await tx
        .insert(schema.furnitures)
        .values(restInput)
        .returning({ id: schema.furnitures.id })
        .then((rows) => rows[0]);

      if (!furniture) throw new Error("Insertion meuble a échoué");

      await tx.insert(schema.furnituresRawMaterials).values(
        rawMaterials.map((value) => ({
          furnitureId: furniture.id,
          materialId: rawMaterialValueToId[value],
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
        schema.furnitures.type
      )
      .then((rows) => {
        const unGroupped = rows.map(({ materialsByType, ...row }) => ({
          ...row,
          materials: arrayToObject(materialsByType, "type"),
        }));

        const groupped = groupBy(unGroupped, "type");

        return {
          unGroupped,
          groupped,
        };
      });
  },
};
