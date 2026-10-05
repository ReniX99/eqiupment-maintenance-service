import { type Request, type Response } from "express";
import { LoginUserDto, RegisterUserDto } from "../schemas/users/users.schema";
import * as authService from "../services/auth.service";
import * as usersService from "../services/users.service";

export const register = async (
  req: Request,
  res: Response<{}, { body: RegisterUserDto }>,
) => {
  const schema = res.locals.body;

  const user = await authService.register(schema);

  res.status(201).json(user);
};

export const login = async (
  req: Request,
  res: Response<{}, { body: LoginUserDto }>,
) => {
  const schema = res.locals.body;

  const token = await authService.login(schema, res);

  res.status(201).json(token);
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  const token = await authService.refresh(refreshToken);

  res.status(201).json(token);
};

export const logout = async (req: Request, res: Response) => {
  await authService.logout(res);

  res.sendStatus(204);
};

export const getMe = async (req: Request, res: Response) => {
  const user = await usersService.getUser(req.user.userId);

  res.status(200).json(user);
};
