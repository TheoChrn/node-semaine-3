import { db, schema } from "@projet-node-semaine-3/db";
import { createFurnitureSchema } from "@projet-node-semaine-3/shared/validators";
import { z } from "zod";

type CreateFurnitureInput = z.infer<typeof createFurnitureSchema>;

export const furniture = {
  create: async (input: CreateFurnitureInput) => {
    return db.insert(schema.furnitures).values(input);
  },
};
