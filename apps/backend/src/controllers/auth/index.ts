import jwt from "jsonwebtoken";

import * as argon2 from "argon2";

import type { Request, Response } from "express";
import { APIResponse } from "@/utils/response";

import { models } from "@/models";
import { logger } from "@/utils/logger";
import { env } from "@projet-node-semaine-3/shared/config";
import {
  loginUserSchema,
  registerUserSchema,
} from "@projet-node-semaine-3/shared/validators";

const { JWT_SECRET, NODE_ENV } = env;

export const auth = {
  login: async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;

      const validation = loginUserSchema.safeParse(request.body);

      if (!validation.success) {
        APIResponse({
          response,
          message: validation.error.message,
          status: 401,
        });
        return;
      }

      const user = await models.user.getByEmail({ email });

      if (!user) {
        APIResponse({
          response,
          message: "L'email ou le mot de passe saisi est incorrecte",
          status: 401,
        });
        return;
      }

      const { password: userPassword, ...restUser } = user;

      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        APIResponse({
          response,
          message: "L'email ou le mot de passe saisi est incorrecte",
          status: 401,
        });
        return;
      }

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      response.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: NODE_ENV === "production" ? "none" : "lax",
        secure: NODE_ENV === "production",
        path: "/",
      });

      APIResponse({
        response,
        data: restUser,
        message: "Vous êtes bien connecté",
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la connexion de l'utilisateur: ${err.message}`
      );
      APIResponse({
        response,
        status: 500,
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  },
  register: async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;

      const validation = registerUserSchema.safeParse(request.body);

      if (!validation.success) {
        APIResponse({
          response,
          message: validation.error.message,
          status: 401,
        });
        return;
      }

      const existingUser = await models.user.getByEmail({ email });

      if (existingUser) {
        APIResponse({
          response,
          message: "Cet email est déjà utilisé !",
          status: 401,
        });
        return;
      }

      const hashedPassword = await argon2.hash(password);

      const newUser = await models.user.create({
        email,
        password: hashedPassword,
      });

      const accessToken = jwt.sign({ id: newUser!.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      response.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: NODE_ENV === "production" ? "none" : "strict",
        secure: NODE_ENV === "production",
      });
      APIResponse({
        response,
        data: newUser,
        message: "Vous êtes bien connecté",
      });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de l'utilisateur: ${err.message}`
      );
      APIResponse({
        response,
        message: "Erreur serveur",
        status: 500,
      });
    }
  },
  logout: async (_: Request, response: Response) => {
    response.cookie("accessToken", "", {
      httpOnly: true,
      sameSite: NODE_ENV === "production" ? "none" : "strict",
      secure: NODE_ENV === "production",
      maxAge: 0,
    });
    APIResponse({ response, message: "Vous êtes déconnecté" });
  },
};
