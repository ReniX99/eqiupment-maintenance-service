import { Transaction } from "sequelize";
import Technician from "../database/models/technician.model";

export const getTechnicians = async (ids: string[], t: Transaction) => {
  return Technician.findAll({
    where: {
      id: ids,
    },
    transaction: t,
  });
};
