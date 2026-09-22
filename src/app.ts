import express, { type Express, type Request, type Response } from "express";
import router from "./routes";
import { handleError } from "./middlewares/error-handler.middleware";
import rateLimit from "express-rate-limit";
import TooManyRequestsError from "./errors/too-many-requests.error";
import { httpLogger } from "./middlewares/logger.middleware";
import helmet from "helmet";
import cors from "cors";

process.loadEnvFile(".env");

const app: Express = express();

app.use(httpLogger);

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: Number(process.env.RATE_LIMIT) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  handler: (_, res: Response) => {
    throw new TooManyRequestsError();
  },
  skip: (req: Request, _) => {
    if (req.path === "/api/health") return true;
    return false;
  },
});

app.use(rateLimiter);

app.use(express.json({ limit: process.env.REQUEST_SIZE_LIMIT || "1mb" }));
app.use("/api", router);
app.use(handleError);

export default app;
