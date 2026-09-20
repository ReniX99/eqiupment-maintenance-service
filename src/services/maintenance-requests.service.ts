import * as uuid from "uuid";
import { CreateRequestDto } from "../schemas/maintenance-requests/maintenance-requests.schema";
import * as equipmentsService from "../services/equipments.service";
import * as requestsRepository from "../repositories/maintenance-requests.repository";
import NotFoundError from "../errors/not-found.error";
import { de } from "zod/locales";

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

export const getRequests = (
  equipmentId: string | undefined,
  title: string | undefined,
  description: string | undefined,
  priority: string | undefined,
  status: string | undefined,
  minPlannedAt: string | undefined,
  maxPlannedAt: string | undefined,
  minCreatedAt: string | undefined,
  maxCreatedAt: string | undefined,
  sortBy:
    | "id"
    | "equipmentId"
    | "title"
    | "description"
    | "priority"
    | "status"
    | "plannedAt"
    | "createdAt"
    | "updatedAt",
  order: "asc" | "desc",
  page: number | undefined,
  limit: number | undefined,
) => {
  const pageNumber = page || 1;
  const limitNumber = limit || 10;

  const { data, total } = requestsRepository.getRequests(
    equipmentId,
    title,
    description,
    priority,
    status,
    minPlannedAt,
    maxPlannedAt,
    minCreatedAt,
    maxCreatedAt,
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
