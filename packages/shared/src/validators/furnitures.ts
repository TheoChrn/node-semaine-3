import { z } from "zod";
import { furnitureTypesValues, rawMaterialsValues } from "../enums";

export const createFurnitureSchema = z.object({
  value: z.string().trim().min(1, "Un nom de meuble est requis"),
  type: z.enum(furnitureTypesValues),
  rawMaterials: z.array(z.enum(rawMaterialsValues)),
});

export type CreateFurnitureInput = z.infer<typeof createFurnitureSchema>;
