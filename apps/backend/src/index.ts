import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "@/routes";
import { env } from "@projet-node-semaine-3/shared";

const app = express();

const { PORT, CORS_ORIGIN } = env;

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port: http://localhost:${PORT}`);
});
