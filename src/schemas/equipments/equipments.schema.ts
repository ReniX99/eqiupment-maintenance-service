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
    .optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
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
});
export type UpdateEquipmentDto = z.infer<typeof updateEquipmentSchema>;
