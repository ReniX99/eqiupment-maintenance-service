import express, { type Express, type Request, type Response } from "express";
import router from "./routes";

const app: Express = express();

app.use("/api", router);

export default app;
