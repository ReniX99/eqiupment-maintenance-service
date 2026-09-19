import express, { type Express, type Request, type Response } from "express";
import router from "./routes";
import { handleError } from "./middlewares/error-handler.middleware";

const app: Express = express();

app.use(express.json());
app.use("/api", router);
app.use(handleError);

export default app;
