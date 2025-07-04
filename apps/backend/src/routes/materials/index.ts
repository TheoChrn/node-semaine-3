import { controllers } from "@/controllers";
import { middlewares } from "@/middlewares";
import { Router } from "express";

import express from "express";

const router: Router = express.Router();

router.get(
  "/stats",
  middlewares.isAuthenticated,
  controllers.materials.getStats
);
router.get("/:id", controllers.materials.get);

export default router;
