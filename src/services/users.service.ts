import { connection } from "../database/connection";
import NotFoundError from "../errors/not-found.error";
import * as usersRepository from "../repositories/users.repository";

export const getUser = async (id: string) => {
  const user = await connection.transaction(async (t) => {
    return usersRepository.getUserById(id, t);
  });

  if (!user) throw new NotFoundError("User not found");

  return {
    userId: id,
    role: user.role,
    technician: user.technician,
  };
};
