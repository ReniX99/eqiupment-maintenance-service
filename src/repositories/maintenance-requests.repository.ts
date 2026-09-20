const requests: MaintenanceRequest[] = [];

export const createRequest = (request: MaintenanceRequest) => {
  requests.push(request);
};

export const getRequest = (id: string): MaintenanceRequest | undefined => {
  return requests.find((r) => r.id === id);
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
  page: number,
  limit: number,
) => {
  const filteredRequests = requests.filter((r) => {
    if (equipmentId && r.equipmentId !== equipmentId) return false;

    if (
      title &&
      !r.title.toLocaleLowerCase().includes(String(title).toLocaleLowerCase())
    )
      return false;

    if (
      description &&
      !r.description
        .toLocaleLowerCase()
        .includes(String(description).toLocaleLowerCase())
    )
      return false;

    if (priority && r.priority !== priority) return false;

    if (status && r.status !== status) return false;

    if (r.plannedAt) {
      if (minPlannedAt && r.plannedAt < minPlannedAt) return false;
      if (maxPlannedAt && r.plannedAt > maxPlannedAt) return false;
    } else if (minPlannedAt || maxPlannedAt) return false;

    if (minCreatedAt && r.createdAt < minCreatedAt) return false;
    if (maxCreatedAt && r.createdAt > maxCreatedAt) return false;

    return true;
  });

  const sortOrder = order === "asc" ? 1 : -1;

  filteredRequests.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (!aValue && !bValue) return 0;
    if (!aValue) return 1;
    if (!bValue) return -1;

    if (aValue < bValue) return -1 * sortOrder;
    if (aValue > bValue) return 1 * sortOrder;

    return 0;
  });

  const start = (page - 1) * limit;
  const paginatedRequests = filteredRequests.slice(start, start + limit);

  return {
    data: paginatedRequests,
    total: filteredRequests.length,
  };
};

export const updateRequeset = (
  id: string,
  request: MaintenanceRequest,
): MaintenanceRequest => {
  const index = requests.findIndex((r) => r.id === id);

  request.updatedAt = new Date().toISOString();
  requests[index] = request;

  return request;
};
