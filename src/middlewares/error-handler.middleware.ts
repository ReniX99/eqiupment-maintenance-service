import { NextFunction, type Request, type Response } from "express";
import HttpError from "../errors/http.error";
import PayloadTooLargeError from "../errors/payload-too-large.error";

export const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.type === "entity.too.large") {
    const error = new PayloadTooLargeError();
    return res.status(error.statusCode).json({ ...error, requestId: req.id });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ ...err, requestId: req.id });
  }
};
