import * as uuid from "uuid";

const equipments: Equipment[] = [
  {
    id: "1",
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
    id: "2",
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
  name,
  status,
  type,
  minInstalledAt,
  maxInstalledAt,
  sortBy,
  order,
  page,
  limit,
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

export const createEquipment = (equipment): Equipment => {
  const id = uuid.v4();
  const equipmentModel: Equipment = {
    id,
    ...equipment,
  };
  equipments.push(equipmentModel);

  return equipmentModel;
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
