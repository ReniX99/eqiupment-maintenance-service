import { Transaction } from "sequelize";
import RequestStatusHistory from "../database/models/request-status-history.model";
import { connection } from "../database/connection";

export const addRequestStatusChange = async (
  requestId: string,
  oldStatus: string,
  newStatus: string,
  author: string | undefined,
  comment: string | undefined,
  t: Transaction,
) => {
  return RequestStatusHistory.create(
    {
      requestId,
      oldStatus,
      newStatus,
      author,
      comment,
    },
    { transaction: t },
  );
};

export const getRequestStatusHistory = async (requestId: string) => {
  return connection.transaction(async (t) => {
    return RequestStatusHistory.findAll({
      where: {
        requestId,
      },
    });
  });
};
