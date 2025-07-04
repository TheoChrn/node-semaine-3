import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { APIResponse } from "@/utils/response";
import { env } from "@projet-node-semaine-3/shared/config";

const { JWT_SECRET } = env;

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { accessToken } = request.cookies;

  if (!accessToken) {
    APIResponse({
      response,
      message: "Vous devez être connecté",
      status: 401,
    });
    return;
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    response.locals.user = decoded;
    next();
  } catch (err: any) {
    APIResponse({ response, data: {}, message: "Token invalide", status: 401 });
  }
};
