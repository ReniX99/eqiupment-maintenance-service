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

export const requestsQuerySchema = z.strictObject({
  equipmentId: z.coerce.string().optional(),
  title: z.coerce.string().optional(),
  description: z.coerce.string().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  status: z.enum(["new", "in_progress", "done", "rejected"]).optional(),
  minPlannedAt: z.iso.date().optional(),
  maxPlannedAt: z.iso.date().optional(),
  minCreatedAt: z.iso.date().optional(),
  maxCreatedAt: z.iso.date().optional(),
  sortBy: z
    .enum([
      "id",
      "equipmentId",
      "title",
      "description",
      "priority",
      "status",
      "plannedAt",
      "createdAt",
      "updatedAt",
    ])
    .optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
});
export type RequestsQuery = z.infer<typeof requestsQuerySchema>;

export const updateRequestSchema = z.strictObject({
  equipmentId: z.uuid().optional(),
  title: z.string().min(5).max(120).optional(),
  description: z.string().max(2000).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  plannedAt: z.iso.datetime().optional(),
});
export type UpdateRequestDto = z.infer<typeof updateRequestSchema>;
