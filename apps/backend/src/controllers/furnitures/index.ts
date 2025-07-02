import type { Request, Response } from "express";

import { createFurnitureSchema } from "@projet-node-semaine-3/shared/validators";

import { models } from "@/models";
import { logger } from "@/utils/logger";
import { APIResponse } from "@/utils/response";
import { z } from "zod";

export type CreateFurnitureInput = z.infer<typeof createFurnitureSchema>;

export const furniture = {
  create: async (request: Request, response: Response) => {
    logger.info("[POST] Créer un meuble depuis");
    try {
      const { value, keyword, type, rawMaterials } = request.body;

      console.log(request.body);

      const input = {
        value,
        keyword,
        type,
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
          "Erreur lors de la création du meuble: " + validation.error.message
        );
        return;
      }

      await models.furnitures.create(input);

      APIResponse({ response, message: "Meuble crée", status: 201 });
      return;
    } catch (error: any) {
      logger.error("Erreur lors de la création du meuble: " + error.message);
      APIResponse({
        response,
        message: "Erreur lors de la création du meuble",
        status: 500,
      });
    }
  },
  getAll: async (request: Request, response: Response) => {
    logger.info("[GET] Récupérer tous les meubles");
    try {
      const data = await models.furnitures.getAll();

      APIResponse({
        response,
        message: "Meubles récupérés",
        status: 201,
        data,
      });
      return;
    } catch (error: any) {
      logger.error("Erreur lors de la création de la meuble: " + error.message);
      APIResponse({
        response,
        message: "Erreur lors de la création de la meuble",
        status: 500,
      });
    }
  },
};
