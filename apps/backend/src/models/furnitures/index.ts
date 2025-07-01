import { CreateFurnitureInput } from "@/controllers/furnitures";
import { db, schema } from "@projet-node-semaine-3/db";

export const furnitures = {
  create: async (input: CreateFurnitureInput) => {
    return db.insert(schema.furnitures).values(input);
  },
};
