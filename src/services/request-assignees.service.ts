import UnprocessableEntityError from "../errors/unprocessable-entity.error";
import { AddRequestAssignDto } from "../schemas/maintenance-requests/assignees.schema";
import * as requestsService from "./maintenance-requests.service";
import * as requestAssigneesRepository from "../repositories/request-assignees.repository";
import * as techniciansRepository from "../repositories/technicians.repository";
import { connection } from "../database/connection";
import NotFoundError from "../errors/not-found.error";
import ConflictError from "../errors/conflict.error";

export const addRequestAssignees = async (
  requestId: string,
  assignees: AddRequestAssignDto[],
) => {
  await requestsService.getRequest(requestId);

  const leads = assignees.filter((a) => a.role === "lead");
  if (leads.length !== 1) {
    throw new UnprocessableEntityError(
      "The tecnicians must have only one lead",
    );
  }

  return connection.transaction(async (t) => {
    const technicianIds = assignees.map((a) => a.technicianId);
    const existingTechnician = await techniciansRepository.getTechnicians(
      technicianIds,
      t,
    );
    const existingTechnicianIds = existingTechnician.map((tech) => tech.id);

    const missingTechnicianIds = technicianIds.filter(
      (id) => !existingTechnicianIds.find((existingId) => existingId === id),
    );

    if (missingTechnicianIds.length > 0) {
      throw new NotFoundError("One of the technicians not found");
    }

    const currentTechnicians =
      await requestAssigneesRepository.getRequestAssignees(requestId, t);
    const replyTechnicians = currentTechnicians.filter((tech) =>
      technicianIds.find((id) => id === tech.technicianId),
    );

    if (replyTechnicians.length > 0) {
      throw new ConflictError("Reassign a technician");
    }

    return await requestAssigneesRepository.addRequestAssignees(
      requestId,
      assignees.map((a) => ({ ...a, requestId })),
    );
  });
};
