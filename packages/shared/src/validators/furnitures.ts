import { z } from "zod";

export const createFurnitureSchema = z.object({
  keyword: z.string().uuid(),
  name: z.string(),
  furnitureTypeId: z.string().uuid(),
  rawMaterialId: z.string().uuid(),
});
