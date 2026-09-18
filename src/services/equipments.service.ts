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
