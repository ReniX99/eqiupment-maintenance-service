import * as requestsService from "../services/maintenance-requests.service";
import * as requestStatusHistoryRepository from "../repositories/request-status-history.repository";

export const getRequestStatusHistory = async (requestId: string) => {
  await requestsService.getRequest(requestId);
  return requestStatusHistoryRepository.getRequestStatusHistory(requestId);
};
