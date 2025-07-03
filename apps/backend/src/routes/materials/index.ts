import { controllers } from "@/controllers";
import { Router } from "express";

import express from "express";

const router: Router = express.Router();

router.get("/:id", controllers.materials.get);

export default router;
