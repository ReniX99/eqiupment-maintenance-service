import NotFoundError from "../errors/not-found.error";
import * as equipmentsRepository from "../repositories/equipments.repository";

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
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;

  const { data, total } = equipmentsRepository.getEquipments(
    name,
    status,
    type,
    minInstalledAt,
    maxInstalledAt,
    sortBy,
    order,
    pageNumber,
    limitNumber,
  );

  return {
    data,
    metadata: {
      total,
      page: pageNumber,
      limit: limitNumber,
    },
  };
};

export const getEquipment = (id: string) => {
  const equipment = equipmentsRepository.getEquipment(id);

  if (!equipment) {
    throw new NotFoundError("Equipment is not found");
  }

  return equipment;
};

export const createEquipment = (equipment) => {
  return equipmentsRepository.createEquipment(equipment);
};
