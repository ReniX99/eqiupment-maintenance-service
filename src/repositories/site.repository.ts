import { connection } from "../database/connection";
import Site from "../database/models/site.model";

export const getSite = async (id: string): Promise<Site | null> => {
  return connection.transaction(async (t) => {
    return Site.findByPk(id, { transaction: t });
  });
};
