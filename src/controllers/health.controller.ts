import { type Request, type Response } from "express";

export const getHealth = (req: Request, res: Response) => {
  return res.sendStatus(200);
};
