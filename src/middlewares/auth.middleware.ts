import { type Request, type Response } from "express";
import { NextFunction } from "express";
import * as authService from "../services/auth.service";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const payload = await authService.verifyToken(req);

  req.user = payload;
  next();
};
