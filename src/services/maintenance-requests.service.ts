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

export const createRequest = async (request: CreateRequestDto) => {
  const { equipmentId, title, description, priority, plannedAt, author } =
    request;
  await equipmentsService.getEquipment(equipmentId);

  return requestsRepository.createRequest(
    equipmentId,
    title,
    description,
    priority,
    plannedAt,
    author,
  );
};

export const getRequest = async (id: string) => {
  const request = await requestsRepository.getRequest(id);

  if (!request) {
    throw new NotFoundError("Maintenance request is not found");
  }

  return request;
};

export const getRequests = async (
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
  page: number,
  limit: number,
) => {
  const { rows: data, count: total } = await requestsRepository.getRequests(
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
    page,
    limit,
  );

  return {
    data,
    metadata: {
      total,
      page: page,
      limit: limit,
    },
  };
};

export const updateRequest = async (id: string, request: UpdateRequestDto) => {
  const requestModel = await requestsRepository.getRequest(id);
  if (!requestModel) {
    throw new NotFoundError("Maintenance request is not found");
  }

  const { equipmentId, title, description, priority, plannedAt, author } =
    request;

  if (equipmentId) {
    await equipmentsService.getEquipment(equipmentId);
  }

  await requestsRepository.updateRequest(
    requestModel,
    equipmentId,
    title,
    description,
    priority,
    plannedAt,
    author,
  );
  return requestModel;
};

export const updateRequestStatus = async (
  id: string,
  request: UpdateRequestStatusDto,
) => {
  const status = request.status;

  const requestModel = await requestsRepository.getRequest(id);
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
    await requestsRepository.updateRequestStatus(requestModel, status);
  } else {
    throw new ConflictError(
      `Invalid status update: ${currentStatus} -> ${status}`,
    );
  }

  return requestModel;
};

export const deleteRequest = async (id: string) => {
  const request = await requestsRepository.getRequest(id);
  if (!request) {
    throw new NotFoundError("Maintenance request is not found");
  }

  await requestsRepository.deleteRequest(id);
};

export const getRequestsByEquipmentId = async (equipmentId: string) => {
  return requestsRepository.getRequestsByEquipmentId(equipmentId);
};

export const getUnclosedRequestsByEquipmentId = async (equipmentId: string) => {
  return requestsRepository.getUnclosedRequests(equipmentId);
};
