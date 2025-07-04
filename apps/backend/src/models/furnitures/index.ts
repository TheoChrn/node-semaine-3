import { jsonAgg } from "@/utils/agg";
import { db, schema } from "@projet-node-semaine-3/db";
import { eq, sql } from "drizzle-orm";

import { rawMaterialValueToId } from "@projet-node-semaine-3/shared/enums";
import { arrayToObject, groupBy } from "@projet-node-semaine-3/shared/format";
import {
  CreateFurnitureInput,
  UpdateFurnitureInput,
} from "@projet-node-semaine-3/shared/validators";
import { materials } from "@/models/materials";

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
  update: async (input: UpdateFurnitureInput) => {
    const { rawMaterials, ...restInput } = input;

    return await db.transaction(async (tx) => {
      const furniture = await tx
        .update(schema.furnitures)
        .set(restInput)
        .where(eq(schema.furnitures.id, input.id))
        .returning({ id: schema.furnitures.id })
        .then((rows) => rows[0]);

      if (!furniture) throw new Error("Mise à jour meuble échouée");

      await tx
        .delete(schema.furnituresRawMaterials)
        .where(eq(schema.furnituresRawMaterials.furnitureId, furniture.id));

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
        quantity: schema.furnitures.quantity,
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
  get: async (input: { id: string }) => {
    return await db
      .select({
        id: schema.furnitures.id,
        value: schema.furnitures.value,
        quantity: schema.furnitures.quantity,
        type: schema.furnitures.type,
        materials: jsonAgg({
          value: schema.rawMaterials.value,
        }),
      })
      .from(schema.furnituresRawMaterials)
      .leftJoin(
        schema.furnitures,
        eq(schema.furnituresRawMaterials.furnitureId, schema.furnitures.id)
      )
      .leftJoin(
        schema.rawMaterials,
        eq(schema.furnituresRawMaterials.materialId, schema.rawMaterials.id)
      )
      .where(eq(schema.furnituresRawMaterials.furnitureId, input.id))
      .groupBy(
        schema.furnitures.id,
        schema.furnitures.value,
        schema.furnitures.quantity,
        schema.furnitures.type
      )
      .then((rows) => ({
        ...rows[0],
        materials: rows[0]!.materials.map((val) => val.value),
      }));
  },
};
