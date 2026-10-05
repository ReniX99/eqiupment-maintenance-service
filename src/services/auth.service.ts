import bcrypt from "bcrypt";
import { LoginUserDto, RegisterUserDto } from "../schemas/users/users.schema";
import * as usersRepository from "../repositories/users.repository";
import * as techniciansRepository from "../repositories/technicians.repository";
import { connection } from "../database/connection";
import ConflictError from "../errors/conflict.error";
import UnauthorizedError from "../errors/unauthorized.error";
import * as jwt from "jsonwebtoken";
import InternalServerError from "../errors/internal-server.error";
import { Response } from "express";

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

export const login = async (user: LoginUserDto, res: Response) => {
  const { login, password } = user;

  return connection.transaction(async (t) => {
    const existingUser = await usersRepository.getUser(login, t);

    if (!existingUser) {
      throw new UnauthorizedError("Wrong login or password");
    }

    const isMatch = await bcrypt.compare(password, existingUser.hashPassword);

    if (!isMatch) {
      throw new UnauthorizedError("Wrong login or password");
    }

    const payload = { userId: existingUser.id, role: existingUser.role };

    const accessToken = generateToken(payload, "15m");
    const refreshToken = generateToken(payload, "7d");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { accessToken };
  });
};

const generateToken = (
  payload: { userId: string; role: string },
  expiresIn: string,
) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  if (!JWT_SECRET_KEY) {
    throw new InternalServerError(
      "Environment variable JWT_SECRET_KEY is not found",
    );
  }

  return jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn });
};
