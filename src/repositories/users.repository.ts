import { Transaction } from "sequelize";
import User from "../database/models/user.model";

export const getUser = async (login: string, t: Transaction) => {
  return User.findOne({
    where: {
      login,
    },
    transaction: t,
  });
};

export const addUser = async (
  login: string,
  hashPassword: string,
  technicianId: string | undefined,
  t: Transaction,
) => {
  return User.create(
    {
      login,
      hashPassword,
      technicianId,
    },
    {
      transaction: t,
    },
  );
};
