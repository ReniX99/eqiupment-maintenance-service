import { type Request, type Response } from "express";
import * as equipmentsService from "../services/equipments.service";
import {
  CreateEquipmentDto,
  EquipmentParams,
  EquipmentsQuery,
  UpdateEquipmentDto,
} from "../schemas/equipments/equipments.schema";

export const getEquipments = (
  req: Request,
  res: Response<{}, { query: EquipmentsQuery }>,
) => {
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
  } = res.locals.query;

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

export const getEquipment = (
  req: Request,
  res: Response<{}, { params: EquipmentParams }>,
) => {
  const { id } = res.locals.params;

  const equipment = equipmentsService.getEquipment(id);

  res.json(equipment);
};

export const createEquipment = (
  req: Request,
  res: Response<{}, { body: CreateEquipmentDto }>,
) => {
  const equipment = equipmentsService.createEquipment(res.locals.body);

  res.status(201).json(equipment);
};

export const updateEquipment = (
  req: Request,
  res: Response<{}, { params: EquipmentParams; body: UpdateEquipmentDto }>,
) => {
  const { id } = res.locals.params;
  const schema = res.locals.body;

  const equipment = equipmentsService.updateEquipment(id, schema);
  res.status(200).json(equipment);
};

export const deleteEquipment = (req: Request, res: Response) => {
  const { id } = res.locals.params;

  equipmentsService.deleteEquipment(id);

  res.sendStatus(200);
};
