import { Transaction } from "sequelize";
import Technician from "../database/models/technician.model";
import { connection } from "../database/connection";

export const getTechnicians = async (ids: string[], t: Transaction) => {
  return Technician.findAll({
    where: {
      id: ids,
    },
    transaction: t,
  });
};

export const getTechnician = async (id: string) => {
  return connection.transaction(async (t) => {
    return Technician.findByPk(id, { transaction: t });
  });
};
