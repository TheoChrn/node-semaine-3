import { z } from "zod";

export const createFurnitureSchema = z.object({
  keyword: z.string().transform((val) => val || null),
  value: z.string().trim().min(1, "Un nom de meuble est requis"),
  typeId: z.string().uuid(),
  createdBy: z.string().uuid(),
  rawMaterials: z.array(z.string().uuid()),
});

export type CreateFurnitureInput = z.infer<typeof createFurnitureSchema>;
