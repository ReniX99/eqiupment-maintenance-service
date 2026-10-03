import Site from "../database/models/site.model";
import NotFoundError from "../errors/not-found.error";
import * as siteRepository from "../repositories/site.repository";

export const getSite = async (id: string): Promise<Site> => {
  const site = await siteRepository.getSite(id);

  if (!site) throw new NotFoundError("Site is not found");
  return site;
};
