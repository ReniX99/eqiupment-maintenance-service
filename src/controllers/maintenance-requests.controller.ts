import { type Request, type Response } from "express";
import { CreateRequestDto } from "../schemas/maintenance-requests/maintenance-requests.schema";
import * as requestsService from "../services/maintenance-requests.service";

export const createRequest = (
  req: Request,
  res: Response<{}, { body: CreateRequestDto }>,
) => {
  const request = requestsService.createRequest(res.locals.body);

  res.status(201).json(request);
};
