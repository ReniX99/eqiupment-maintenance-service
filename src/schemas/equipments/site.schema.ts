import z from "zod";

export const siteParamsSchema = z.strictObject({
  id: z.uuid(),
});
export type SiteParams = z.infer<typeof siteParamsSchema>;
