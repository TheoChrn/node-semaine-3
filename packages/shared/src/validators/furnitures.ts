import { z } from "zod";
import { furnitureTypesValues } from "../enums";

export const createFurnitureSchema = z.object({
  keyword: z.string().transform((val) => val || null),
  value: z.string().trim().min(1, "Un nom de meuble est requis"),
  type: z.enum(furnitureTypesValues),
  rawMaterials: z.array(z.string().uuid()),
});

export type CreateFurnitureInput = z.infer<typeof createFurnitureSchema>;
