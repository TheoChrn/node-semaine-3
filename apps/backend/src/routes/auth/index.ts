import { controllers } from "@/controllers";
import { Router } from "express";

import express from "express";

const router: Router = express.Router();

router.post("/register", controllers.auth.register);
router.post("/login", controllers.auth.login);

export default router;
