import * as technicianRepository from "../repositories/technicians.repository";

export const getTechnicians = async () => {
  return technicianRepository.getAllTechnicians();
};
