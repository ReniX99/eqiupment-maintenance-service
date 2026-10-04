import { type Request, type Response } from "express";
import {
  CreateRequestDto,
  RequestParams,
  RequestsQuery,
  UpdateRequestDto,
  UpdateRequestStatusDto,
} from "../schemas/maintenance-requests/maintenance-requests.schema";
import * as requestsService from "../services/maintenance-requests.service";
import * as requestStatusHistoryService from "../services/request-status-history.service";

export const createRequest = async (
  req: Request,
  res: Response<{}, { body: CreateRequestDto }>,
) => {
  const request = await requestsService.createRequest(res.locals.body);

  res.status(201).json(request);
};

export const getRequest = async (
  req: Request,
  res: Response<{}, { params: RequestParams }>,
) => {
  const { id } = res.locals.params;

  const request = await requestsService.getRequest(id);

  res.json(request);
};

export const getRequests = async (
  req: Request,
  res: Response<{}, { query: RequestsQuery }>,
) => {
  const {
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
  } = res.locals.query;

  const requests = await requestsService.getRequests(
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

  res.json(requests);
};

export const updateRequest = async (
  req: Request,
  res: Response<{}, { params: RequestParams; body: UpdateRequestDto }>,
) => {
  const { id } = res.locals.params;
  const schema = res.locals.body;

  const request = await requestsService.updateRequest(id, schema);

  res.status(200).json(request);
};

export const updateRequestStatus = async (
  req: Request,
  res: Response<{}, { params: RequestParams; body: UpdateRequestStatusDto }>,
) => {
  const { id } = res.locals.params;
  const schema = res.locals.body;

  const request = await requestsService.updateRequestStatus(id, schema);

  res.status(200).json(request);
};

export const deleteRequest = (
  req: Request,
  res: Response<{}, { params: RequestParams }>,
) => {
  const { id } = res.locals.params;

  requestsService.deleteRequest(id);

  res.sendStatus(200);
};

export const getRequestStatusHistory = async (
  req: Request,
  res: Response<{}, { params: RequestParams }>,
) => {
  const { id } = res.locals.params;

  const statusHistory =
    await requestStatusHistoryService.getRequestStatusHistory(id);
  res.status(200).json(statusHistory);
};
