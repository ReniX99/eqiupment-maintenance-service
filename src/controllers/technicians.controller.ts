import { type Request, type Response } from "express";
import * as techniciansService from "../services/technicians.service";

export const getTechnicians = async (req: Request, res: Response) => {
  const technicians = await techniciansService.getTechnicians();

  res.status(200).json(technicians);
};
