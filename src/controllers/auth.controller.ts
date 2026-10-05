import { type Request, type Response } from "express";
import { RegisterUserDto } from "../schemas/users/users.schema";
import * as authService from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response<{}, { body: RegisterUserDto }>,
) => {
  const schema = res.locals.body;

  const user = await authService.register(schema);

  res.status(201).json(user);
};
