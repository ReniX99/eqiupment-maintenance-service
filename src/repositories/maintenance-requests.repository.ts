const requests: MaintenanceRequest[] = [];

export const createRequest = (request: MaintenanceRequest) => {
  requests.push(request);
};

export const getRequest = (id: string): MaintenanceRequest | undefined => {
  return requests.find((r) => r.id === id);
};
