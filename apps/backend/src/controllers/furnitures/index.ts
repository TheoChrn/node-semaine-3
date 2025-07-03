import type { Request, Response } from "express";

import { createFurnitureSchema } from "@projet-node-semaine-3/shared/validators";

import { models } from "@/models";
import { logger } from "@/utils/logger";
import { APIResponse } from "@/utils/response";
import type { RawMaterialsValue } from "@projet-node-semaine-3/shared/enums";
import { rawMaterialValueToId } from "@projet-node-semaine-3/shared/enums";
import { z } from "zod";

export type CreateFurnitureInput = z.infer<typeof createFurnitureSchema>;

export const furnitures = {
  create: async (request: Request, response: Response) => {
    logger.info("[POST] Créer un meuble depuis");
    try {
      const { value, type, rawMaterials } = request.body;

      const validation = createFurnitureSchema.safeParse(request.body);

      const input = {
        value,
        type,
        rawMaterials: rawMaterials.map(
          (material: RawMaterialsValue) => rawMaterialValueToId[material]
        ),
      } as CreateFurnitureInput;

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
