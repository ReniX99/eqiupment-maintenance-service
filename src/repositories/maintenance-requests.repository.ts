import { Op } from "sequelize";
import { connection } from "../database/connection";
import MaintenanceRequest from "../database/models/maintenance-request.model";

const requests: MaintenanceRequest[] = [];

export const createRequest = async (
  equipmentId: string,
  title: string,
  description: string,
  priority: string,
  plannedAt: string | undefined,
  author: string | undefined,
) => {
  return connection.transaction(async (t) => {
    return MaintenanceRequest.create(
      {
        equipmentId,
        title,
        description,
        priority,
        plannedAt,
        author,
      },
      {
        transaction: t,
      },
    );
  });
};

export const getRequest = async (
  id: string,
): Promise<MaintenanceRequest | null> => {
  return connection.transaction(async (t) => {
    return MaintenanceRequest.findByPk(id, {
      transaction: t,
    });
  });
};

export const getRequests = async (
  equipmentId: string | undefined,
  title: string | undefined,
  description: string | undefined,
  priority: string | undefined,
  status: string | undefined,
  minPlannedAt: string | undefined,
  maxPlannedAt: string | undefined,
  minCreatedAt: string | undefined,
  maxCreatedAt: string | undefined,
  sortBy:
    | "id"
    | "equipmentId"
    | "title"
    | "description"
    | "priority"
    | "status"
    | "plannedAt"
    | "createdAt"
    | "updatedAt",
  order: "asc" | "desc",
  page: number,
  limit: number,
) => {
  return connection.transaction(async (t) => {
    return MaintenanceRequest.findAndCountAll({
      where: {
        ...(equipmentId !== undefined && { equipmentId }),
        ...(title !== undefined && {
          title: {
            [Op.iLike]: `%${title}%`,
          },
        }),
        ...(description !== undefined && {
          description: {
            [Op.iLike]: `%${description}%`,
          },
        }),
        ...(priority !== undefined && { priority }),
        ...(status !== undefined && { status }),
        ...(minPlannedAt !== undefined || maxPlannedAt !== undefined
          ? {
              plannedAt: {
                ...(minPlannedAt !== undefined && {
                  [Op.gte]: minPlannedAt,
                }),
                ...(maxPlannedAt !== undefined && {
                  [Op.lte]: maxPlannedAt,
                }),
              },
            }
          : {}),
        ...(minCreatedAt !== undefined || maxCreatedAt !== undefined
          ? {
              createdAt: {
                ...(minCreatedAt !== undefined && {
                  [Op.gte]: minCreatedAt,
                }),
                ...(maxCreatedAt !== undefined && {
                  [Op.lte]: maxCreatedAt,
                }),
              },
            }
          : {}),
      },
      limit,
      offset: (page - 1) * limit,
      order: [[sortBy, order]],
      transaction: t,
    });
  });
};

export const updateRequest = async (
  request: MaintenanceRequest,
  equipmentId: string | undefined,
  title: string | undefined,
  description: string | undefined,
  priority: string | undefined,
  plannedAt: string | undefined,
  author: string | undefined,
): Promise<void> => {
  await connection.transaction(async (t) => {
    await request.update(
      {
        equipmentId,
        title,
        description,
        priority,
        plannedAt,
        author,
      },
      {
        transaction: t,
      },
    );
  });
};

export const updateRequestStatus = async (
  request: MaintenanceRequest,
  status: string,
) => {
  await connection.transaction(async (t) => {
    await request.update(
      {
        status,
      },
      { transaction: t },
    );
  });
};

export const deleteRequest = async (id: string) => {
  await connection.transaction(async (t) => {
    await MaintenanceRequest.destroy({
      where: { id },
    });
  });
};

export const getRequestsByEquipmentId = async (equipmentId: string) => {
  return connection.transaction(async (t) => {
    return MaintenanceRequest.findAll({
      where: {
        equipmentId,
      },
      transaction: t,
    });
  });
};

export const getUnclosedRequests = async (equipmentId: string) => {
  return connection.transaction(async (t) => {
    return MaintenanceRequest.findAll({
      where: {
        equipmentId,
        status: {
          [Op.notIn]: ["done", "rejected"],
        },
      },
    });
  });
};
