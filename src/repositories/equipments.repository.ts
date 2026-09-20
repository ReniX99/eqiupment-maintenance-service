const equipments: Equipment[] = [
  {
    id: "7dcd84ea-1b05-4ba5-ac58-3695d867037c",
    name: "Оборудование 1",
    type: "turbine",
    serialNumber: "E001",
    location: {
      latitude: 23.23,
      longitude: 34.34,
    },
    status: "operational",
    installedAt: "2026-09-18",
  },
  {
    id: "91a83b0c-ff30-4567-b13a-d42ffa3d81c2",
    name: "Оборудование 2",
    type: "turbine",
    serialNumber: "E002",
    location: {
      latitude: 32.23,
      longitude: 17.34,
    },
    status: "maintenance",
    installedAt: "2026-09-14",
  },
];

export const getEquipments = (
  name: string | undefined,
  status: string | undefined,
  type: string | undefined,
  minInstalledAt: string | undefined,
  maxInstalledAt: string | undefined,
  sortBy: "type" | "name" | "serialNumber" | "status" | "installedAt" | "id",
  order: "asc" | "desc",
  page: number,
  limit: number,
) => {
  const filteredEquipments = equipments.filter((eq) => {
    if (
      name &&
      !eq.name.toLocaleLowerCase().includes(String(name).toLocaleLowerCase())
    )
      return false;

    if (status && eq.status !== status) return false;

    if (type && eq.type !== type) return false;

    if (minInstalledAt && eq.installedAt < minInstalledAt) return false;
    if (maxInstalledAt && eq.installedAt > maxInstalledAt) return false;

    return true;
  });

  const sortOrder = order === "asc" ? 1 : -1;

  filteredEquipments.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return -1 * sortOrder;
    if (aValue > bValue) return 1 * sortOrder;

    return 0;
  });

  const start = (page - 1) * limit;
  const paginatedEquipments = filteredEquipments.slice(start, start + limit);

  return {
    data: paginatedEquipments,
    total: filteredEquipments.length,
  };
};

export const getEquipment = (id: string): Equipment | undefined => {
  return equipments.find((eq) => eq.id === id);
};

export const getEquipmentBySerialNumber = (
  serialNumber: string,
): Equipment | undefined => {
  return equipments.find((eq) => eq.serialNumber === serialNumber);
};

export const createEquipment = (equipment: Equipment): void => {
  equipments.push(equipment);
};

export const updateEquipment = (
  id: string,
  equipment: Equipment,
): Equipment => {
  const index = equipments.findIndex((eq) => eq.id === id);
  equipments[index] = equipment;

  return equipment;
};

export const deleteEquipment = (id: string): void => {
  const index = equipments.findIndex((eq) => eq.id === id);
  equipments.splice(index, 1);
};
