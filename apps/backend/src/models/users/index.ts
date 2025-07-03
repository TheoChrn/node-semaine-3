import { logger } from "@/utils/logger";
import { db, schema } from "@projet-node-semaine-3/db";
import { RegisterUserInput } from "@projet-node-semaine-3/shared/validators";

export const user = {
  create: async (input: RegisterUserInput) => {
    return await db
      .insert(schema.users)
      .values(input)
      .returning({
        id: schema.users.id,
        email: schema.users.email,
        role: schema.users.role,
      })
      .then((rows) => rows[0]!);
  },
  getByEmail: async (input: { email: string }) => {
    return await db.query.users.findFirst({
      columns: { id: true, email: true, password: true, role: true },
      where: (user, { eq }) => eq(user.email, input.email),
    });
  },
};
