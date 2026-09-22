import { NextFunction, type Request, type Response } from "express";
import NotFoundError from "../errors/not-found.error";

export const handleNotFoundRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new NotFoundError(`Endpoint ${req.path} is not found`));
};
