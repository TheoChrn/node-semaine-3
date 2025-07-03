import { db, schema } from "@projet-node-semaine-3/db";
import { eq } from "drizzle-orm";

export const materials = {
  get: async (input: { id: string }) => {
    return db
      .select({
        value: schema.rawMaterials.value,
        description: schema.rawMaterials.description,
      })
      .from(schema.rawMaterials)
      .where(eq(schema.rawMaterials.id, input.id))
      .then((rows) => rows[0]!);
  },
};
