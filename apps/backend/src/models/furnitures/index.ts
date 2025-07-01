import { CreateFurnitureInput } from "@/controllers/furnitures";
import { db, schema } from "@projet-node-semaine-3/db";

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
};
