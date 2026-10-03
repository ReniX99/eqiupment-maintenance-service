import * as uuid from "uuid";
import ConflictError from "../errors/conflict.error";
import NotFoundError from "../errors/not-found.error";
import * as equipmentsRepository from "../repositories/equipments.repository";
import * as requestsService from "../services/maintenance-requests.service";
import * as weatherService from "../services/weather.service";
import * as siteService from "../services/site.service";
import * as equipmentPassportRepository from "../repositories/equipment-passports.repository";
import {
  CreateEquipmentDto,
  UpdateEquipmentDto,
} from "../schemas/equipments/equipments.schema";
import { connection } from "../database/connection";
import { ValidationError } from "sequelize";

export const getEquipments = async (
  name: string | undefined,
  status: string | undefined,
  type: string | undefined,
  minInstalledAt: string | undefined,
  maxInstalledAt: string | undefined,
  sortBy: "type" | "name" | "serialNumber" | "status" | "installedAt" | "id",
  order: "asc" | "desc",
  page: number,
  limit: number,
) => {
  const { rows: data, count: total } = await equipmentsRepository.getEquipments(
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

  return {
    data,
    metadata: {
      total,
      page,
      limit,
    },
  };
};

export const getEquipment = async (id: string) => {
  const equipment = await equipmentsRepository.getEquipment(id);

  if (!equipment) {
    throw new NotFoundError("Equipment is not found");
  }

  return equipment;
};

export const createEquipment = async (equipment: CreateEquipmentDto) => {
  const {
    name,
    type,
    serialNumber,
    status,
    installedAt,
    location,
    siteId,
    passport,
  } = equipment;
  const { latitude, longitude } = location;

  const existingEquipment =
    await equipmentsRepository.getEquipmentBySerialNumber(serialNumber);
  if (existingEquipment) {
    throw new ConflictError("Equipment with same serialNumber already exists");
  }

  if (siteId) {
    await siteService.getSite(siteId);
  }

  return equipmentsRepository.createEquipment(
    name,
    type,
    serialNumber,
    latitude,
    longitude,
    status,
    installedAt,
    siteId,
    passport,
  );
};

export const updateEquipment = async (
  id: string,
  equipment: UpdateEquipmentDto,
) => {
  const equipmentModel = await getEquipment(id);

  const { name, type, serialNumber, location, status, siteId, passport } =
    equipment;

  if (serialNumber) {
    const existingEquipment =
      await equipmentsRepository.getEquipmentBySerialNumber(serialNumber);

    if (existingEquipment && existingEquipment.id !== equipmentModel.id) {
      throw new ConflictError(
        "Equipment with same serialNumber already exists",
      );
    }
  }

  if (siteId) {
    await siteService.getSite(siteId);
  }

  const t = await connection.transaction();
  try {
    await equipmentsRepository.updateEquipment(
      equipmentModel,
      name,
      type,
      serialNumber,
      location?.latitude,
      location?.longitude,
      status,
      siteId,
      t,
    );

    if (passport) {
      if (!equipmentModel.equipmentPassport) {
        if (
          passport.producer === undefined ||
          passport.model === undefined ||
          passport.power === undefined ||
          passport.lastCheck === undefined
        ) {
          throw new ValidationError(
            "New equipment passport must contain all fields",
            [],
          );
        }

        await equipmentPassportRepository.createPassport(passport, id, t);
      } else {
        await equipmentPassportRepository.updatePassport(passport, id, t);
      }
    }

    await t.commit();

    return getEquipment(id);
  } catch (error) {
    t.rollback();
    throw error;
  }
};

export const deleteEquipment = async (id: string) => {
  const equipment = equipmentsRepository.getEquipment(id);

  if (!equipment) {
    throw new NotFoundError("Equipment is not found");
  }

  const unclosedRequests =
    await requestsService.getUnclosedRequestsByEquipmentId(id);
  if (unclosedRequests.length > 0) {
    throw new ConflictError(
      "Can't remove equipment with unclosed maintenance requests",
    );
  }

  await equipmentsRepository.deleteEquipment(id);
};

export const getEquipmentRequests = async (id: string) => {
  const equipment = await equipmentsRepository.getEquipment(id);

  if (!equipment) {
    throw new NotFoundError("Equipment is not found");
  }

  return requestsService.getRequestsByEquipmentId(id);
};

export const getEquipmentWeatherForecast = async (id: string, date: string) => {
  const equipment = await equipmentsRepository.getEquipment(id);

  if (!equipment) {
    throw new NotFoundError("Equipment is not found");
  }

  const { latitude, longitude } = equipment.site;

  return await weatherService.getForecast(latitude, longitude, date);
};
