import { controllers } from "@/controllers";
import { Router } from "express";

import express from "express";

const router: Router = express.Router();

router.get("/stats", controllers.materials.getStats);
router.get("/:id", controllers.materials.get);

export default router;
