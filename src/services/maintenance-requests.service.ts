import * as uuid from "uuid";
import { CreateRequestDto } from "../schemas/maintenance-requests/maintenance-requests.schema";
import * as equipmentsService from "../services/equipments.service";
import * as requestsRepository from "../repositories/maintenance-requests.repository";
import NotFoundError from "../errors/not-found.error";

export const createRequest = (request: CreateRequestDto) => {
  const equipmentId = request.equipmentId;
  equipmentsService.getEquipment(equipmentId);

  const id = uuid.v4();
  const now = new Date().toISOString();

  const requestModel: MaintenanceRequest = {
    id: id,
    equipmentId: equipmentId,
    title: request.title,
    description: request.description,
    priority: request.priority,
    status: "new",
    plannedAt: request.plannedAt ?? null,
    createdAt: now,
    updatedAt: now,
  };

  requestsRepository.createRequest(requestModel);

  return requestModel;
};

export const getRequest = (id: string) => {
  const request = requestsRepository.getRequest(id);

  if (!request) {
    throw new NotFoundError("Maintenance request is not found");
  }

  return request;
};
