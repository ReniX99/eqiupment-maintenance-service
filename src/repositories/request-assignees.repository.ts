import { Transaction } from "sequelize";
import { connection } from "../database/connection";
import RequestAssignee from "../database/models/request-assignee.model";
import { TAddRequestAssignee } from "../types/request-assignee.type";

export const addRequestAssignees = async (
  requestId: string,
  assignees: TAddRequestAssignee[],
) => {
  return connection.transaction(async (t) => {
    await RequestAssignee.destroy({
      where: {
        requestId,
      },
      transaction: t,
    });

    return RequestAssignee.bulkCreate(assignees, { transaction: t });
  });
};

export const getRequestAssignees = async (
  requestId: string,
  t: Transaction,
) => {
  return RequestAssignee.findAll({
    where: {
      requestId,
    },
    transaction: t,
  });
};
