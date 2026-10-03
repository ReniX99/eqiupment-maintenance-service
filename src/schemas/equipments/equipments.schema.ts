import z from "zod";

export const equipmentsQuerySchema = z.strictObject({
  name: z.coerce.string().optional(),
  type: z.enum(["turbine", "inverter", "sensor", "substation"]).optional(),
  status: z
    .enum(["operational", "maintenance", "fault", "decommissioned"])
    .optional(),
  minInstalledAt: z.iso.date().optional(),
  maxInstalledAt: z.iso.date().optional(),
  sortBy: z
    .enum(["id", "name", "type", "serialNumber", "status", "installedAt"])
    .optional()
    .default("id"),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).optional().default(10),
});
export type EquipmentsQuery = z.infer<typeof equipmentsQuerySchema>;

export const equipmentParamsSchema = z.object({
  id: z.uuid(),
});
export type EquipmentParams = z.infer<typeof equipmentParamsSchema>;

export const createEquipmentSchema = z.strictObject({
  name: z.string().min(3).max(100),
  type: z.enum(["turbine", "inverter", "sensor", "substation"]),
  serialNumber: z.string(),
  location: z.strictObject({
    latitude: z.number().min(-180).max(180),
    longitude: z.number().min(-90).max(90),
  }),
  status: z.enum(["operational", "maintenance", "fault", "decommissioned"]),
  installedAt: z.iso.date(),
  siteId: z.uuid().optional(),
  passport: z
    .strictObject({
      producer: z.string().min(3).max(100),
      model: z.string(),
      power: z.number().min(0),
      lastCheck: z.iso.date(),
    })
    .optional(),
});
export type CreateEquipmentDto = z.infer<typeof createEquipmentSchema>;

export const updateEquipmentSchema = z.strictObject({
  name: z.string().min(3).max(100).optional(),
  type: z.enum(["turbine", "inverter", "sensor", "substation"]).optional(),
  serialNumber: z.string().optional(),
  location: z
    .strictObject({
      latitude: z.number().min(-180).max(180),
      longitude: z.number().min(-90).max(90),
    })
    .optional(),
  status: z
    .enum(["operational", "maintenance", "fault", "decommissioned"])
    .optional(),
  siteId: z.uuid().optional(),
  passport: z
    .strictObject({
      producer: z.string().min(3).max(100).optional(),
      model: z.string().optional(),
      power: z.number().min(0).optional(),
      lastCheck: z.iso.date().optional(),
    })
    .optional(),
});
export type UpdateEquipmentDto = z.infer<typeof updateEquipmentSchema>;
