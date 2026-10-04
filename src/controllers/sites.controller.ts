import { type Request, type Response } from "express";
import { SiteParams } from "../schemas/equipments/site.schema";
import * as sitesService from "../services/sites.service";

export const getSiteSummary = async (
  req: Request,
  res: Response<{}, { params: SiteParams }>,
) => {
  const { id } = res.locals.params;

  const summary = await sitesService.getSiteSummary(id);
  res.status(200).json(summary);
};
