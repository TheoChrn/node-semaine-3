import { Router } from "express";
import furnituresRouter from "@/routes/furniture";
import materialsRouter from "@/routes/materials";
import authRouter from "@/routes/auth";
import userRouter from "@/routes/users";

import express from "express";

const router: Router = express.Router();

router.use("/furnitures", furnituresRouter);
router.use("/materials", materialsRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
