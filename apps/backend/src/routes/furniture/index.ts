import { controllers } from "@/controllers";
import { Router } from "express";

import express from "express";

const router: Router = express.Router();

router.post("/", controllers.furniture.create);

export default router;
