import type { Request, Response } from "express";

import { createFurnitureSchema } from "@projet-node-semaine-3/shared/validators";

import { models } from "@/models";
import { APIResponse } from "@/utils/response";
import { logger } from "@/utils/logger";
import { z } from "zod";

export type CreateFurnitureInput = z.infer<typeof createFurnitureSchema>;

export const furniture = {
  create: async (request: Request, response: Response) => {
    logger.info("[POST] Créer une feature");
    try {
      const { value, keyword, furnitureTypeId, rawMaterialIds } = request.body;

      const input = {
        value,
        keyword,
        typeId: furnitureTypeId,
        rawMaterials: rawMaterialIds,
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
