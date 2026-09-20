import * as uuid from "uuid";
import ConflictError from "../errors/conflict.error";
import NotFoundError from "../errors/not-found.error";
import * as equipmentsRepository from "../repositories/equipments.repository";
import * as requestsService from "../services/maintenance-requests.service";
import {
  CreateEquipmentDto,
  UpdateEquipmentDto,
} from "../schemas/equipments/equipments.schema";

export const getEquipments = (
  name: string | undefined,
  status: string | undefined,
  type: string | undefined,
  minInstalledAt: string | undefined,
  maxInstalledAt: string | undefined,
  sortBy: "type" | "name" | "serialNumber" | "status" | "installedAt" | "id",
  order: "asc" | "desc",
  page: number | undefined,
  limit: number | undefined,
) => {
  const pageNumber = page || 1;
  const limitNumber = limit || 10;

  const { data, total } = equipmentsRepository.getEquipments(
    name,
    status,
    type,
    minInstalledAt,
    maxInstalledAt,
    sortBy,
    order,
    pageNumber,
    limitNumber,
  );

  return {
    data,
    metadata: {
      total,
      page: pageNumber,
      limit: limitNumber,
    },
  };
};

export const getEquipment = (id: string) => {
  const equipment = equipmentsRepository.getEquipment(id);

  if (!equipment) {
    throw new NotFoundError("Equipment is not found");
  }

  return equipment;
};

export const createEquipment = (equipment: CreateEquipmentDto) => {
  const serialNumber = equipment.serialNumber;

  const existingEquipment =
    equipmentsRepository.getEquipmentBySerialNumber(serialNumber);
  if (existingEquipment) {
    throw new ConflictError("Equipment with same serialNumber already exists");
  }

  const id = uuid.v4();
  const equipmentModel: Equipment = {
    id: id,
    ...equipment,
  };

  equipmentsRepository.createEquipment(equipmentModel);
  return equipmentModel;
};

export const updateEquipment = (id: string, equipment: UpdateEquipmentDto) => {
  const equipmentModel = equipmentsRepository.getEquipment(id);
  if (!equipmentModel) {
    throw new NotFoundError("Equipment is not found");
  }

  const { name, type, serialNumber, location, status } = equipment;

  if (name) {
    equipmentModel.name = name;
  }

  if (type) {
    equipmentModel.type = type;
  }

  if (serialNumber) {
    const existingEquipment =
      equipmentsRepository.getEquipmentBySerialNumber(serialNumber);

    if (existingEquipment && existingEquipment.id !== equipmentModel.id) {
      throw new ConflictError(
        "Equipment with same serialNumber already exists",
      );
    }
    equipmentModel.serialNumber = serialNumber;
  }

  if (location) {
    equipmentModel.location = location;
  }

  if (status) {
    equipmentModel.status = status;
  }

  return equipmentsRepository.updateEquipment(id, equipmentModel);
};

export const deleteEquipment = (id: string): void => {
  const equipment = equipmentsRepository.getEquipment(id);

  if (!equipment) {
    throw new NotFoundError("Equipment is not found");
  }

  const unclosedRequests = requestsService.getUnclosedRequestsByEquipmentId(id);
  if (unclosedRequests.length > 0) {
    throw new ConflictError(
      "Can't remove equipment with unclosed maintenance requests",
    );
  }

  equipmentsRepository.deleteEquipment(id);
};

export const getEquipmentRequests = (id: string) => {
  const equipment = equipmentsRepository.getEquipment(id);

  if (!equipment) {
    throw new NotFoundError("Equipment is not found");
  }

  return requestsService.getRequestsByEquipmentId(id);
};
