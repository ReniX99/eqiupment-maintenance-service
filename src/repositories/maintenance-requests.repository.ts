const requests: MaintenanceRequest[] = [];

export const createRequest = (request: MaintenanceRequest) => {
  requests.push(request);
};
