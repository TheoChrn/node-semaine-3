import { controllers } from "@/controllers";
import { middlewares } from "@/middlewares";
import { Router } from "express";

import express from "express";

const router: Router = express.Router();

router.post("/", middlewares.isAuthenticated, controllers.furnitures.create);
router.get("/", middlewares.isAuthenticated, controllers.furnitures.getAll);
router.patch(
  "/:id",
  middlewares.isAuthenticated,
  controllers.furnitures.update
);
router.get("/:id", middlewares.isAuthenticated, controllers.furnitures.get);

export default router;
