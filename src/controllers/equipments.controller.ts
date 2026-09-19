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

export const getEquipment = (req: Request, res: Response) => {
  const { id } = req.params;

  const equipment = equipmentsService.getEquipment(id);

  res.json(equipment);
};

export const createEquipment = (req: Request, res: Response) => {
  const equipment = equipmentsService.createEquipment(req.body);

  res.status(201).json(equipment);
};

export const deleteEquipment = (req: Request, res: Response) => {
  const { id } = req.params;

  equipmentsService.deleteEquipment(id);

  res.sendStatus(200);
};
