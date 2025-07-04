import { z } from "zod";
import { furnitureTypesValues, rawMaterialsValues } from "../enums";

export const createFurnitureFormSchema = z.object({
  value: z.string().trim().min(1, "Un nom de meuble est requis"),
  type: z.enum(furnitureTypesValues),
  rawMaterials: z
    .array(z.enum(rawMaterialsValues))
    .min(1, "Veuillez sélectionner au moins un matériau"),
});

export const createFurnitureSchema = createFurnitureFormSchema.extend({
  createdBy: z.string().uuid(),
});

export type CreateFurnitureFormInput = z.infer<
  typeof createFurnitureFormSchema
>;
export type CreateFurnitureInput = z.infer<typeof createFurnitureSchema>;
