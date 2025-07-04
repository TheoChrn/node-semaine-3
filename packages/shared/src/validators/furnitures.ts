import { z } from "zod";
import { furnitureTypesValues, rawMaterialsValues } from "../enums";

export const furnitureFormSchema = z.object({
  value: z.string().trim().min(1, "Un nom de meuble est requis"),
  type: z.enum(furnitureTypesValues),
  rawMaterials: z
    .array(z.enum(rawMaterialsValues))
    .min(1, "Veuillez sélectionner au moins un matériau"),
  quantity: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number().min(1)),
});

export const createFurnitureSchema = furnitureFormSchema.extend({
  createdBy: z.string().uuid(),
});

export const updateFurnitureSchema = furnitureFormSchema.extend({
  id: z.string().uuid(),
  createdBy: z.string().uuid(),
});

export type FurnitureFormInput = z.input<typeof furnitureFormSchema>;
export type CreateFurnitureInput = z.infer<typeof createFurnitureSchema>;
export type UpdateFurnitureInput = z.infer<typeof updateFurnitureSchema>;
