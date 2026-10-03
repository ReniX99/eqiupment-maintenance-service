import { Transaction, where } from "sequelize";
import {
  TCreateEquipmentPassport,
  TUpdateEquipmentPassport,
} from "../types/equipment-passport.type";
import EquipmentPassport from "../database/models/equipment-passport.model";

export const createPassport = async (
  passport: TCreateEquipmentPassport,
  equipmentId: string,
  t: Transaction,
) => {
  const { producer, model, power, lastCheck } = passport;
  await EquipmentPassport.create(
    {
      equipmentId,
      producer,
      model,
      power,
      lastCheck,
    },
    {
      transaction: t,
    },
  );
};

export const updatePassport = async (
  passport: TUpdateEquipmentPassport,
  equipmentId: string,
  t: Transaction,
) => {
  const { producer, model, power, lastCheck } = passport;
  await EquipmentPassport.update(
    {
      producer,
      model,
      power,
      lastCheck,
    },
    {
      where: {
        equipmentId,
      },
      transaction: t,
    },
  );
};
