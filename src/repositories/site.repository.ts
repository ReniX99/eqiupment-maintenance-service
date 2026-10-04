import { Transaction } from "sequelize";
import { connection } from "../database/connection";
import Equipment from "../database/models/equipment.model";
import MaintenanceRequest from "../database/models/maintenance-request.model";
import Site from "../database/models/site.model";
import RequestStatusHistory from "../database/models/request-status-history.model";

export const getSite = async (id: string): Promise<Site | null> => {
  return connection.transaction(async (t) => {
    return Site.findByPk(id, { transaction: t });
  });
};

export const getSiteSummary = async (id: string, t: Transaction) => {
  return MaintenanceRequest.findAll({
    attributes: [
      "status",
      "priority",
      [
        connection.fn("COUNT", connection.col("maintenance_requests.id")),
        "count",
      ],
    ],
    include: [
      {
        model: Equipment,
        attributes: [],
        where: {
          siteId: id,
        },
      },
    ],
    group: ["maintenance_requests.status", "maintenance_requests.priority"],
    raw: true,
    transaction: t,
  });
};

export const getAvgSiteRequestClosingTime = async (
  id: string,
  t: Transaction,
) => {
  return MaintenanceRequest.findAll({
    attributes: ["id", "createdAt"],
    include: [
      {
        model: Equipment,
        attributes: [],
        where: {
          siteId: id,
        },
      },
      {
        model: RequestStatusHistory,
        attributes: ["createdAt", "newStatus"],
        where: {
          newStatus: "done",
        },
      },
    ],
    transaction: t,
  });
};
