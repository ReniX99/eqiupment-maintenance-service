import { type Request, type Response } from "express";
import * as equipmentsService from "../services/equipments.service";
import {
  CreateEquipmentDto,
  EquipmentParams,
  EquipmentsQuery,
  UpdateEquipmentDto,
} from "../schemas/equipments/equipments.schema";
import { WeatherQuery } from "../schemas/weather/weather.schema";

export const getEquipments = async (
  req: Request,
  res: Response<{}, { query: EquipmentsQuery }>,
) => {
  const {
    name,
    status,
    type,
    minInstalledAt,
    maxInstalledAt,
    sortBy,
    order,
    page,
    limit,
  } = res.locals.query;

  const equipments = await equipmentsService.getEquipments(
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

export const getEquipment = async (
  req: Request,
  res: Response<{}, { params: EquipmentParams }>,
) => {
  const { id } = res.locals.params;

  const equipment = await equipmentsService.getEquipment(id);

  res.json(equipment);
};

export const createEquipment = async (
  req: Request,
  res: Response<{}, { body: CreateEquipmentDto }>,
) => {
  const equipment = await equipmentsService.createEquipment(res.locals.body);

  res.status(201).json(equipment);
};

export const updateEquipment = async (
  req: Request,
  res: Response<{}, { params: EquipmentParams; body: UpdateEquipmentDto }>,
) => {
  const { id } = res.locals.params;
  const schema = res.locals.body;

  const equipment = await equipmentsService.updateEquipment(id, schema);
  res.status(200).json(equipment);
};

export const deleteEquipment = async (
  req: Request,
  res: Response<{}, { params: EquipmentParams }>,
) => {
  const { id } = res.locals.params;

  await equipmentsService.deleteEquipment(id);

  res.sendStatus(200);
};

export const getEquipmentRequests = async (
  req: Request,
  res: Response<{}, { params: EquipmentParams }>,
) => {
  const { id } = res.locals.params;

  const requests = await equipmentsService.getEquipmentRequests(id);

  res.json(requests);
};

export const getEquipmentWeatherForecast = async (
  req: Request,
  res: Response<{}, { params: EquipmentParams; query: WeatherQuery }>,
) => {
  const { id } = res.locals.params;
  const { date } = res.locals.query;

  const forecast = await equipmentsService.getEquipmentWeatherForecast(
    id,
    date,
  );

  res.json(forecast);
};
