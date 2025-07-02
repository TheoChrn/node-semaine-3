import { CreateFurnitureInput } from "@/controllers/furnitures";
import { db, schema } from "@projet-node-semaine-3/db";
import { eq } from "drizzle-orm";

export const furnitures = {
  create: async (input: CreateFurnitureInput) => {
    const { rawMaterials, ...restInput } = input;
    return db.transaction(async (tx) => {
      const [furniture] = await tx
        .insert(schema.furnitures)
        .values(restInput)
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
  getAll: () => {
    return db
      .select({
        id: schema.furnitures.id,
        value: schema.furnitures.value,
        keyword: schema.furnitures.keyword,
        type: schema.furnitures.type,
      })
      .from(schema.furnitures)
      .leftJoin(
        schema.rawMaterials,
        eq(schema.rawMaterials.id, schema.furnitures.id)
      );
  },
};
