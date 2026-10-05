import bcrypt from "bcrypt";
import { RegisterUserDto } from "../schemas/users/users.schema";
import * as usersRepository from "../repositories/users.repository";
import * as techniciansRepository from "../repositories/technicians.repository";
import { connection } from "../database/connection";
import ConflictError from "../errors/conflict.error";

export const register = async (user: RegisterUserDto) => {
  const { login, password, technician } = user;

  return connection.transaction(async (t) => {
    const existingUser = await usersRepository.getUser(login, t);

    if (existingUser) {
      throw new ConflictError("User with same login already exists");
    }

    let technicianId;
    if (technician) {
      const { fullName, specialization, employeeId } = technician;
      const technicianModel = await techniciansRepository.createTechnician(
        fullName,
        specialization,
        employeeId,
        t,
      );

      technicianId = technicianModel.id;
    }

    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    const userModel = await usersRepository.addUser(
      login,
      hashPassword,
      technicianId,
      t,
    );
    return { id: userModel.id };
  });
};
