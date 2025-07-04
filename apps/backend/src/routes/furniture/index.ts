import { controllers } from "@/controllers";
import { middlewares } from "@/middlewares";
import { Router } from "express";

import express from "express";

const router: Router = express.Router();

router.post("/", middlewares.isAuthenticated, controllers.furnitures.create);
router.get("/", controllers.furnitures.getAll);

export default router;
