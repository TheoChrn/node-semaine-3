import type { Request, Response } from "express";

import {
  furnitureFormSchema,
  CreateFurnitureInput,
  UpdateFurnitureInput,
  updateFurnitureSchema,
} from "@projet-node-semaine-3/shared/validators";

import { models } from "@/models";
import { logger } from "@/utils/logger";
import { APIResponse } from "@/utils/response";

export const furnitures = {
  create: async (request: Request, response: Response) => {
    logger.info("[POST] Créer un meuble depuis");
    try {
      const { value, type, rawMaterials } = request.body;
      const { user } = response.locals;

      const validation = furnitureFormSchema.safeParse(request.body);

      const input = {
        value,
        type,
        rawMaterials: rawMaterials,
        createdBy: user.id,
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
  update: async (request: Request, response: Response) => {
    logger.info("[PATCH] Mise à jour d'un meuble");
    try {
      const { value, type, rawMaterials } = request.body;
      const { id } = request.params;

      const { user } = response.locals;

      const input = {
        value,
        type,
        rawMaterials,
        createdBy: user.id,
        id,
      } as UpdateFurnitureInput;

      const validation = updateFurnitureSchema.safeParse(input);

      if (validation.error) {
        APIResponse({
          response,
          message: validation.error.message,
          status: 400,
        });
        logger.error(
          "Erreur lors de la mise à jour du meuble: " + validation.error.message
        );
        return;
      }

      await models.furnitures.update(input);

      APIResponse({ response, message: "Meuble mis à jour", status: 201 });
      return;
    } catch (error: any) {
      logger.error("Erreur lors de la mise à jour du meuble: " + error.message);
      APIResponse({
        response,
        message: "Erreur lors de la mise à jour du meuble",
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
  get: async (request: Request, response: Response) => {
    logger.info("[GET] Récupérer un meuble");
    const { id } = request.params;

    if (!id) {
      APIResponse({
        response,
        message: "Ce meuble n'existe pas",
        status: 404,
      });
      return;
    }
    try {
      const data = await models.furnitures.get({ id });

      APIResponse({
        response,
        message: "Meubles récupéré",
        status: 201,
        data,
      });
      return;
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération du meuble: " + error.message
      );
      APIResponse({
        response,
        message: "Erreur lors de la récupération du meuble",
        status: 500,
      });
    }
  },
  delete: async (request: Request, response: Response) => {
    logger.info("[GET] Récupérer un meuble");
    const { id } = request.params;

    if (!id) {
      APIResponse({
        response,
        message: "Ce meuble n'existe pas",
        status: 404,
      });
      return;
    }
    try {
      const data = await models.furnitures.delete({ id });

      APIResponse({
        response,
        message: "Meubles récupéré",
        status: 201,
        data,
      });
      return;
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération du meuble: " + error.message
      );
      APIResponse({
        response,
        message: "Erreur lors de la récupération du meuble",
        status: 500,
      });
    }
  },
};
