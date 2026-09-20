import { NextFunction, type Request, type Response } from "express";
import ValidationError from "../errors/validation.error";
import z from "zod";

interface ValidationSchemas {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
}

export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Record<string, any> = {};

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);

      if (!result.success) {
        errors.body = z.treeifyError(result.error);
      } else {
        res.locals.body = result.data;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);

      if (!result.success) {
        errors.query = z.treeifyError(result.error);
      } else {
        res.locals.query = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);

      if (!result.success) {
        errors.params = z.treeifyError(result.error);
      } else {
        res.locals.params = result.data;
      }
    }

    if (Object.keys(errors).length > 0) {
      return next(new ValidationError("Validation error", errors));
    }

    next();
  };
};
