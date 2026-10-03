import { Op, Transaction } from "sequelize";
import { connection } from "../database/connection";
import EquipmentPassport from "../database/models/equipment-passport.model";
import Equipment from "../database/models/equipment.model";
import Site from "../database/models/site.model";
import {
  TCreateEquipmentPassport,
  TUpdateEquipmentPassport,
} from "../types/equipment-passport.type";

const equipments: Equipment[] = [];

export const getEquipments = async (
  name: string | undefined,
  status: string | undefined,
  type: string | undefined,
  minInstalledAt: string | undefined,
  maxInstalledAt: string | undefined,
  sortBy: "type" | "name" | "serialNumber" | "status" | "installedAt" | "id",
  order: "asc" | "desc",
  page: number,
  limit: number,
) => {
  return connection.transaction(async (t) => {
    return Equipment.findAndCountAll({
      where: {
        ...(name !== undefined && {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        }),
        ...(status !== undefined && { status }),
        ...(type !== undefined && { type }),
        ...(minInstalledAt !== undefined || maxInstalledAt !== undefined
          ? {
              installedAt: {
                ...(minInstalledAt !== undefined && {
                  [Op.gte]: minInstalledAt,
                }),
                ...(maxInstalledAt !== undefined && {
                  [Op.lte]: maxInstalledAt,
                }),
              },
            }
          : {}),
      },
      limit,
      offset: (page - 1) * limit,
      include: [Site, EquipmentPassport],
      order: [[sortBy, order]],
      transaction: t,
    });
  });
};

export const getEquipment = async (id: string): Promise<Equipment | null> => {
  return connection.transaction(async (t) => {
    return Equipment.findByPk(id, {
      include: [Site, EquipmentPassport],
      transaction: t,
    });
  });
};

export const getEquipmentBySerialNumber = async (
  serialNumber: string,
): Promise<Equipment | null> => {
  return connection.transaction(async (t) => {
    return Equipment.findOne({
      where: {
        serialNumber,
      },
      transaction: t,
    });
  });
};

export const createEquipment = async (
  name: string,
  type: string,
  serialNumber: string,
  latitude: number,
  longitude: number,
  status: string,
  installedAt: string,
  siteId: string | undefined,
  passport: TCreateEquipmentPassport | undefined,
): Promise<Equipment> => {
  return connection.transaction(async (t) => {
    let equipment;

    if (siteId) {
      equipment = await Equipment.create(
        {
          name,
          type,
          serialNumber,
          status,
          installedAt,
          siteId,
        },
        {
          transaction: t,
        },
      );
    } else {
      equipment = await Equipment.create(
        {
          name,
          type,
          serialNumber,
          status,
          installedAt,
          site: {
            latitude,
            longitude,
          },
        },
        {
          include: [Site],
          transaction: t,
        },
      );
    }

    if (passport) {
      const { producer, model, power, lastCheck } = passport;
      await EquipmentPassport.create(
        {
          producer,
          model,
          power,
          lastCheck,
          equipmentId: equipment.id,
        },
        { transaction: t },
      );
    }

    return equipment;
  });
};

export const updateEquipment = async (
  equipment: Equipment,
  name: string | undefined,
  type: string | undefined,
  serialNumber: string | undefined,
  latitude: number | undefined,
  longitude: number | undefined,
  status: string | undefined,
  siteId: string | undefined,
  t: Transaction,
): Promise<void> => {
  await equipment.update(
    {
      name,
      type,
      status,
      serialNumber,
      siteId,
    },
    {
      transaction: t,
    },
  );

  if (!siteId) {
    await equipment.site.update(
      {
        latitude,
        longitude,
      },
      {
        transaction: t,
      },
    );
  }
};

export const deleteEquipment = async (id: string) => {
  await connection.transaction(async (t) => {
    await Equipment.destroy({
      where: { id },
      transaction: t,
    });
  });
};
