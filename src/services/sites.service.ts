import { connection } from "../database/connection";
import NotFoundError from "../errors/not-found.error";
import * as sitesRepository from "../repositories/site.repository";

export const getSite = async (id: string) => {
  const site = await sitesRepository.getSite(id);

  if (!site) throw new NotFoundError("Site is not found");
  return site;
};

export const getSiteSummary = async (id: string) => {
  const site = await sitesRepository.getSite(id);
  if (!site) throw new NotFoundError("Site is not found");

  return connection.transaction(async (t) => {
    const summary = await sitesRepository.getSiteSummary(id, t);
    const requests = await sitesRepository.getAvgSiteRequestClosingTime(id, t);

    const doneTimes = requests.map((r) => {
      const doneHistory = r.statusHistory[0];

      const createdAt = new Date(r.createdAt).getTime();
      const doneAt = new Date(doneHistory.createdAt).getTime();

      return doneAt - createdAt;
    });
    const avgHours =
      doneTimes.length > 0
        ? Number(
            (
              doneTimes.reduce((sum, time) => sum + time, 0) /
              doneTimes.length /
              (1000 * 60 * 60)
            ).toFixed(2),
          )
        : 0;

    return {
      ...summary.reduce(
        (acc, row) => {
          acc[row.status][row.priority] = Number(row.count);
          return acc;
        },
        {
          new: { low: 0, medium: 0, high: 0, critical: 0 },
          in_progress: { low: 0, medium: 0, high: 0, critical: 0 },
          done: { low: 0, medium: 0, high: 0, critical: 0 },
          rejected: { low: 0, medium: 0, high: 0, critical: 0 },
        },
      ),
      avgHours,
    };
  });
};
