import { NextFunction, type Request, type Response } from "express";
import HttpError from "../errors/http.error";

export const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ ...err, requestId: req.id });
  }
};
