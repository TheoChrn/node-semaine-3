import { db, schema } from "@projet-node-semaine-3/db";
import { count, eq } from "drizzle-orm";

export const materials = {
  get: async (input: { id: string }) => {
    return db
      .select({
        value: schema.rawMaterials.value,
        description: schema.rawMaterials.description,
      })
      .from(schema.rawMaterials)
      .where(eq(schema.rawMaterials.id, input.id))
      .then((rows) => rows[0]!);
  },
  getStats: async () => {
    return db
      .select({
        nElement: count(schema.furnituresRawMaterials.materialId),
        value: schema.rawMaterials.value,
      })
      .from(schema.furnituresRawMaterials)
      .leftJoin(
        schema.rawMaterials,
        eq(schema.rawMaterials.id, schema.furnituresRawMaterials.materialId)
      )
      .groupBy(
        schema.furnituresRawMaterials.materialId,
        schema.rawMaterials.value
      );
  },
};
