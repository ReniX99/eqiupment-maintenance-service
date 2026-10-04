import { type Request, type Response } from "express";
import {
  AddRequestAssignDto,
  RequestAssigneeParams,
} from "../schemas/maintenance-requests/assignees.schema";
import { RequestParams } from "../schemas/maintenance-requests/maintenance-requests.schema";
import * as requestAssigneesService from "../services/request-assignees.service";

export const addRequestAssignees = async (
  req: Request,
  res: Response<{}, { params: RequestParams; body: AddRequestAssignDto[] }>,
) => {
  const { id } = res.locals.params;
  const schema = res.locals.body;

  const assignees = await requestAssigneesService.addRequestAssignees(
    id,
    schema,
  );
  res.status(201).json(assignees);
};

export const deleteRequestAssignee = async (
  req: Request,
  res: Response<{}, { params: RequestAssigneeParams }>,
) => {
  const { id, userId } = res.locals.params;

  await requestAssigneesService.deleteRequestAssignee(id, userId);
  res.sendStatus(200);
};
