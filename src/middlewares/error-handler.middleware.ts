import { NextFunction, type Request, type Response } from "express";
import HttpError from "../errors/http.error";
import PayloadTooLargeError from "../errors/payload-too-large.error";
import InternalServerError from "../errors/internal-server.error";

export const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error: HttpError;

  if (err.type === "entity.too.large") {
    error = new PayloadTooLargeError();
  } else if (err instanceof HttpError) {
    error = err;
  } else if (err instanceof Error) {
    error = new InternalServerError(err.message);
  } else {
    error = new InternalServerError("Unknown error");
  }

  return res.status(error.statusCode).json({ ...error, requestId: req.id });
};
