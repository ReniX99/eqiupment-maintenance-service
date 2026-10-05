import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/unauthorized.error";
import ForbiddenError from "../errors/forbidden.error";

export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("Unauthorized");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError("Forbidden");
    }

    next();
  };
};
