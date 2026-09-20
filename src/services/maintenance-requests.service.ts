import * as uuid from "uuid";
import {
  CreateRequestDto,
  UpdateRequestDto,
  UpdateRequestStatusDto,
} from "../schemas/maintenance-requests/maintenance-requests.schema";
import * as equipmentsService from "../services/equipments.service";
import * as requestsRepository from "../repositories/maintenance-requests.repository";
import NotFoundError from "../errors/not-found.error";
import ConflictError from "../errors/conflict.error";

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

export const updateRequest = (id: string, request: UpdateRequestDto) => {
  const requestModel = requestsRepository.getRequest(id);
  if (!requestModel) {
    throw new NotFoundError("Maintenance request is not found");
  }

  const { equipmentId, title, description, priority, plannedAt } = request;

  if (equipmentId) {
    equipmentsService.getEquipment(equipmentId);

    requestModel.equipmentId = equipmentId;
  }

  if (title) {
    requestModel.title = title;
  }

  if (description) {
    requestModel.description = description;
  }

  if (priority) {
    requestModel.priority = priority;
  }

  if (plannedAt) {
    requestModel.plannedAt = plannedAt;
  }

  return requestsRepository.updateRequest(id, requestModel);
};

export const updateRequestStatus = (
  id: string,
  request: UpdateRequestStatusDto,
) => {
  const status = request.status;

  const requestModel = requestsRepository.getRequest(id);
  if (!requestModel) {
    throw new NotFoundError("Maintenance request is not found");
  }

  const currentStatus = requestModel.status;
  if (
    (status === "in_progress" && currentStatus === "new") ||
    (status === "done" && currentStatus === "in_progress") ||
    (status === "rejected" &&
      (currentStatus === "new" || currentStatus === "in_progress"))
  ) {
    requestModel.status = status;
  } else {
    throw new ConflictError(
      `Invalid status update: ${currentStatus} -> ${status}`,
    );
  }

  return requestsRepository.updateRequest(id, requestModel);
};

export const deleteRequest = (id: string) => {
  const request = requestsRepository.getRequest(id);
  if (!request) {
    throw new NotFoundError("Maintenance request is not found");
  }

  requestsRepository.deleteRequest(id);
};

export const getRequestsByEquipmentId = (equipmentId: string) => {
  return requestsRepository.getRequestsByEquipmentId(equipmentId);
};

export const getUnclosedRequestsByEquipmentId = (equipmentId: string) => {
  return requestsRepository.getUnclosedRequests(equipmentId);
};
