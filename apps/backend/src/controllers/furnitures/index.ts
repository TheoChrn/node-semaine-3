import type { Request, Response } from "express";

import { createFurnitureSchema } from "@projet-node-semaine-3/shared/validators";

import { models } from "@/models";
import { APIResponse } from "@/utils/response";
import { logger } from "@/utils/logger";

export const furniture = {
  create: async (request: Request, response: Response) => {
    logger.info("[POST] Créer une feature");
    try {
      const { name, keyword } = request.body;

      const input = {
        name,
        keyword,
      };

      const validation = createFurnitureSchema.safeParse(input);

      if (validation.error) {
        APIResponse({
          response,
          message: validation.error.message,
          status: 400,
        });
      }

      await models.furniture.create(input);

      APIResponse({ response, message: "Furniture crée", status: 201 });
    } catch (error: any) {
      logger.error(
        "Erreur lors de la création de la feature: " + error.message
      );
      APIResponse({
        response,
        message: "Erreur lors de la création de la feature",
        status: 500,
      });
    }
  },
};
