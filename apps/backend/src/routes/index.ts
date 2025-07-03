import { Router } from "express";
import furnituresRouter from "@/routes/furniture";
import materialsRouter from "@/routes/materials";

import express from "express";

const router: Router = express.Router();

router.use("/furnitures", furnituresRouter);
router.use("/materials", materialsRouter);

export default router;
