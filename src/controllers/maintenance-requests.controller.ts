import { type Request, type Response } from "express";
import {
  CreateRequestDto,
  RequestParams,
  RequestsQuery,
} from "../schemas/maintenance-requests/maintenance-requests.schema";
import * as requestsService from "../services/maintenance-requests.service";

export const createRequest = (
  req: Request,
  res: Response<{}, { body: CreateRequestDto }>,
) => {
  const request = requestsService.createRequest(res.locals.body);

  res.status(201).json(request);
};

export const getRequest = (
  req: Request,
  res: Response<{}, { params: RequestParams }>,
) => {
  const { id } = res.locals.params;

  const request = requestsService.getRequest(id);

  res.json(request);
};

export const getRequests = (
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
    sortBy = "id",
    order = "asc",
    page,
    limit,
  } = res.locals.query;

  const requests = requestsService.getRequests(
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
