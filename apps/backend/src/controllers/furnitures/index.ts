import type { Request, Response } from "express";

import { createFurnitureSchema } from "@projet-node-semaine-3/shared/validators";

import { models } from "@/models";
import { APIResponse } from "@/utils/response";
import { logger } from "@/utils/logger";
import { z } from "zod";
import { env } from "@projet-node-semaine-3/shared";

export type CreateFurnitureInput = z.infer<typeof createFurnitureSchema>;

const { CORS_ORIGIN } = env;

export const furniture = {
  create: async (request: Request, response: Response) => {
    logger.info(`[POST] Créer une feature depuis ${CORS_ORIGIN}`);
    try {
      const { value, keyword, typeId, rawMaterials } = request.body;

      console.log(request.body);

      const input = {
        value: "",
        keyword,
        typeId,
        rawMaterials,
        createdBy: "5bfe7dec-a83c-4348-8d5e-c157e678de8e",
      } as CreateFurnitureInput;

      const validation = createFurnitureSchema.safeParse(input);

      if (validation.error) {
        APIResponse({
          response,
          message: validation.error.message,
          status: 400,
        });
        logger.error(
          "Erreur lors de la création de la feature: " +
            validation.error.message
        );
        return;
      }

      await models.furnitures.create(input);

      APIResponse({ response, message: "Furniture crée", status: 201 });
      return;
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
