import { type Request, type Response } from "express";
import * as equipmentsService from "../services/equipments.service";

export const getEquipments = (req: Request, res: Response) => {
  const {
    name,
    status,
    type,
    minInstalledAt,
    maxInstalledAt,
    sortBy = "id",
    order = "asc",
    page,
    limit,
  } = req.query;

  const equipments = equipmentsService.getEquipments(
    name,
    status,
    type,
    minInstalledAt,
    maxInstalledAt,
    sortBy,
    order,
    page,
    limit,
  );

  res.json(equipments);
};
