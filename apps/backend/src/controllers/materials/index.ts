import type { Request, Response } from "express";

import { createFurnitureFormSchema } from "@projet-node-semaine-3/shared/validators";

import { models } from "@/models";
import { logger } from "@/utils/logger";
import { APIResponse } from "@/utils/response";
import { z } from "zod";

export const materials = {
  get: async (request: Request, response: Response) => {
    logger.info("[GET] Récupérer le matériaux");
    const { id } = request.params;

    if (!id) {
      APIResponse({
        response,
        message: "Ce matériau n'existe pas",
        status: 404,
      });
      return;
    }

    try {
      const data = await models.materials.get({ id });

      APIResponse({
        response,
        message: "Matériau récupéré",
        status: 201,
        data,
      });
      return;
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération du matériau: " + error.message
      );
      APIResponse({
        response,
        message: "Erreur lors de la récupération du matériau",
        status: 500,
      });
    }
  },
};
