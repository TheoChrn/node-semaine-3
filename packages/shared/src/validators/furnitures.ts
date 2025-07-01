import { z } from "zod";

export const createFurnitureSchema = z.object({
  keyword: z.string(),
  value: z.string(),
  typeId: z.string().uuid(),
  createdBy: z.string().uuid(),
  rawMaterials: z.array(z.string().uuid()),
});
