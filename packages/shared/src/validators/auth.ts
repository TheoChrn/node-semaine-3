import { z } from "zod";

const passwordSchema = z
  .string()
  .min(12, "Le mot de passe doit contenir au moins 12 caractères")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
  );

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;

export const registerUserSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterUserInput = Omit<
  z.infer<typeof registerUserSchema>,
  "confirmPassword"
>;
