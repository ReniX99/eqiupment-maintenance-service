import { pinoHttp } from "pino-http";
import { logger } from "../libs/logger";
import { type Request, type Response } from "express";
import * as uuid from "uuid";

export const httpLogger = pinoHttp({
  logger,
  genReqId(req: Request, res: Response) {
    const existingReqId = req.id ?? req.headers["x-request-id"];
    if (existingReqId) return existingReqId;

    const id = uuid.v4();
    res.setHeader("X-Request-Id", id);
    return id;
  },
  customLogLevel(req: Request, res: Response, err?: Error) {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";

    return "info";
  },
});
