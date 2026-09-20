import z from "zod";

export const createRequestSchema = z.strictObject({
  equipmentId: z.uuid(),
  title: z.string().min(5).max(120),
  description: z.string().max(2000),
  priority: z.enum(["low", "medium", "high", "critical"]),
  plannedAt: z.iso.datetime().optional(),
});
export type CreateRequestDto = z.infer<typeof createRequestSchema>;

export const requestParamsSchema = z.strictObject({
  id: z.uuid(),
});
export type RequestParams = z.infer<typeof requestParamsSchema>;
